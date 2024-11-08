package com.poletto.polettoskins.services.impl;

import java.io.IOException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.poletto.polettoskins.entities.SteamItemPrice;
import com.poletto.polettoskins.entities.SteamUser;
import com.poletto.polettoskins.entities.responses.SteamAPIUserResponse;
import com.poletto.polettoskins.entities.responses.SteamAPIUserResponse.Player;
import com.poletto.polettoskins.entities.responses.SteamCommunityPriceOverviewResponse;
import com.poletto.polettoskins.exceptions.response.ResourceNotFoundException;
import com.poletto.polettoskins.exceptions.response.SteamApiProcessingException;
import com.poletto.polettoskins.mappers.SteamItemPriceMapper;
import com.poletto.polettoskins.mappers.SteamUserMapper;
import com.poletto.polettoskins.services.SteamService;
import com.poletto.polettoskins.utils.HttpRequestBuilderUtil;

@Service
public class SteamServiceImpl implements SteamService {

	private static final Logger logger = LoggerFactory.getLogger(SteamServiceImpl.class);

	@Value("${steam.community.url}")
	private String steamCommunityUrl;

	@Value("${csfloat.api.url}")
	private String csfloatApiUrl;

	@Value("${steam.api.url}")
	private String steamApiUrl;

	@Value("${steam.api.key}")
	private String steamApiKey;

	@Autowired
	private HttpClient httpClient;

	@Autowired
	private ObjectMapper objectMapper;

	@Override
	public SteamUser findSteamUserBySteamId(String steamId) {

		try {

			String uri = HttpRequestBuilderUtil.buildUri(steamApiUrl, "ISteamUser", "GetPlayerSummaries", "v0002")
					.queryParam("key", steamApiKey)
					.queryParam("steamids", steamId)
					.build()
					.toString();

			HttpRequest request = HttpRequestBuilderUtil.buildRequest(uri);

			HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
			
			if (response.statusCode() != 200) {
	            logger.error("Erro na chamada à Steam API. Status: {}, Corpo: {}", response.statusCode(), response.body());
	            throw new SteamApiProcessingException("Erro na chamada à Steam API. Status: " + response.statusCode());
	        }

			String responseJson = response.body();

			SteamUser steamUser = extractPlayerFromResponse(responseJson);

			return steamUser;

		} catch (InterruptedException e) {
			Thread.currentThread().interrupt();
			logger.error("Thread interrompida durante a chamada à Steam API", e);
			throw new SteamApiProcessingException("Thread interrompida durante a chamada à Steam API", e);
			
		} catch (IOException e) {
			logger.error("Erro de I/O ao chamar a Steam API", e);
			throw new SteamApiProcessingException("Erro de I/O ao chamar a Steam API", e);
		}

	}

	private SteamUser extractPlayerFromResponse(String responseJson) {
		
	    try {
	    	
	        SteamAPIUserResponse apiResponse = objectMapper.readValue(responseJson, SteamAPIUserResponse.class);

	        if (apiResponse.getResponse() != null && apiResponse.getResponse().getPlayers() != null) {
	        	
	            List<Player> players = apiResponse.getResponse().getPlayers();
	            
	            if (!players.isEmpty()) {
	            	
	                Player player = players.get(0);
	                
	                if (player.getSteamid() == null || player.getSteamid().isEmpty()) {
	                    logger.warn("Steam ID ausente na resposta para Steam ID {}", player.getSteamid());
	                    throw new SteamApiProcessingException("Steam ID ausente na resposta da API.");
	                }
	                
	                return SteamUserMapper.INSTANCE.toSteamUser(player);
	                
	            } else {
	                logger.warn("Nenhum jogador encontrado na resposta para Steam ID fornecido");
	                throw new ResourceNotFoundException("Steam ID fornecido não encontrado");
	            }
	            
	        } else {
	            logger.warn("Resposta da Steam API inválida ou ausente para o Steam ID fornecido.");
	            throw new SteamApiProcessingException("Resposta da Steam API inválida.");
	        }
	        
	    } catch (JsonProcessingException e) {
	        logger.error("Erro ao processar a resposta JSON da Steam API", e);
	        throw new SteamApiProcessingException("Erro ao processar a resposta da API", e);
	    }
	}

	@Override
	public SteamItemPrice findSteamItemPriceByName(String fullItemName) {
	    
	    int maxRetries = 5;
	    int retryCount = 0;
	    long waitTime = 500;

	    String uri = HttpRequestBuilderUtil.buildUri(steamCommunityUrl, "market", "priceoverview")
	            .queryParam("currency", 7) // R$
	            .queryParam("appid", 730)  // CSGO
	            .queryParam("market_hash_name", fullItemName)
	            .encode()
	            .build()
	            .toString();

	    while (retryCount < maxRetries) {
	            
	            try {
	            	
	                HttpRequest request = HttpRequestBuilderUtil.buildRequest(uri);

	                HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

	                if (response.statusCode() == 200) {
	                    String responseJson = response.body();

	                    SteamCommunityPriceOverviewResponse apiResponse = objectMapper.readValue(responseJson, SteamCommunityPriceOverviewResponse.class);

	                    if (!apiResponse.getSuccess()) {
	                        logger.error("Steam Market API: retorno sem sucesso para Item '{}'", fullItemName);
	                        throw new SteamApiProcessingException("Steam Market API: retorno sem sucesso para o item fornecido: " + fullItemName);
	                    }

	                    SteamItemPrice steamItemPrice = SteamItemPriceMapper.INSTANCE.toSteamItemPrice(apiResponse);

	                    return steamItemPrice;

	                } else if (response.statusCode() == 429 || (response.statusCode() >= 500 && response.statusCode() < 600)) {

	                    retryCount++;

	                    if (retryCount >= maxRetries) {
	                        logger.error("Máximo de tentativas atingido para Item '{}'. Status: {}", fullItemName, response.statusCode());
	                        throw new SteamApiProcessingException("Máximo de tentativas atingido para Steam Market API. Status: " + response.statusCode());
	                    }

	                    logger.info("Tentativa {} de {} para Item '{}'. Status: {}. Retentando em {} ms...", 
	                                retryCount, maxRetries, fullItemName, response.statusCode(), waitTime);
	                    
	                    Thread.sleep(waitTime);
	                    waitTime *= 2;

	                    continue;

	                } else {
	                    logger.error(
	                            "Erro na chamada à Steam Market API para Item '{}'. Status: {}, Corpo: {}", 
	                            fullItemName, response.statusCode(), response.body()
	                    );
	                    throw new SteamApiProcessingException("Erro na chamada à Steam Market API. Status: " + response.statusCode());
	                }

	            } catch (InterruptedException e) {
	                Thread.currentThread().interrupt();
	                logger.error("Thread interrompida durante a chamada à Steam Market API para Item '{}'", fullItemName, e);
	                throw new SteamApiProcessingException("Thread interrompida durante a chamada à Steam Market API", e);

	            } catch (IOException e) {
	            	
	                retryCount++;

	                if (retryCount >= maxRetries) {
	                    logger.error("Erro de I/O ao chamar a Steam Market API para Item '{}'. Máximo de tentativas atingido.", fullItemName, e);
	                    throw new SteamApiProcessingException("Erro de I/O ao chamar a Steam Market API", e);
	                }

	                logger.warn("Erro de I/O na tentativa {} para Item '{}'. Retentando em {} ms...", 
	                            retryCount, fullItemName, waitTime, e);
	                
	                try {
	                    Thread.sleep(waitTime);
	                } catch (InterruptedException ie) {
	                    Thread.currentThread().interrupt();
	                    logger.error("Thread interrompida durante o backoff para Item '{}'", fullItemName, ie);
	                    throw new SteamApiProcessingException("Thread interrompida durante o backoff", ie);
	                }

	                waitTime *= 2;

	            } catch (Exception e) {
	                logger.error("Erro genérico ao chamar a Steam Market API para Item '{}'", fullItemName, e);
	                throw new SteamApiProcessingException("Erro genérico ao chamar a Steam Market API", e);
	            }

	    }

	    logger.error("Máximo de tentativas atingido. Falha ao obter preço para Item '{}'.", fullItemName);
	    throw new SteamApiProcessingException("Falha ao obter preço do item após várias tentativas.");
	}

}
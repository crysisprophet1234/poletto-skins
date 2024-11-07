package com.poletto.polettoskins.services.impl;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.poletto.polettoskins.entities.SteamItemPrice;
import com.poletto.polettoskins.entities.SteamUser;
import com.poletto.polettoskins.entities.responses.SteamAPIUserResponse;
import com.poletto.polettoskins.entities.responses.SteamAPIUserResponse.Player;
import com.poletto.polettoskins.entities.utils.HttpRequestBuilderUtil;
import com.poletto.polettoskins.exceptions.response.ResourceNotFoundException;
import com.poletto.polettoskins.exceptions.response.SteamApiProcessingException;
import com.poletto.polettoskins.mappers.SteamUserMapper;
import com.poletto.polettoskins.services.SteamService;

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
	public SteamItemPrice getItemPriceBySteamId(String fullItemName) {

		try {

			String uri = UriComponentsBuilder.fromHttpUrl(steamCommunityUrl).pathSegment("market", "priceoverview")
					.queryParam("currency", 7) // R$
					.queryParam("appid", 730) // CSGO
					.queryParam("market_hash_name", fullItemName).build().toString();

			HttpRequest request = HttpRequestBuilderUtil.buildRequest(uri);

			HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

			// String responseJson = response.body();

			JSONObject jsonResponse = new JSONObject(response);

			if (!jsonResponse.getBoolean("success")) {
				throw new RuntimeException("Failed to fetch price data from Steam Market");
			}

			String lowestPriceStr = jsonResponse.optString("lowest_price", "R$ 0,00");
			String medianPriceStr = jsonResponse.optString("median_price", "R$ 0,00");
			Integer quantitySoldLast24Hours = Integer.parseInt(jsonResponse.optString("volume", "0").replace(",", ""));

			BigDecimal lowestPrice = parsePrice(lowestPriceStr);
			BigDecimal medianPrice = parsePrice(medianPriceStr);

			SteamItemPrice steamItemPrice = new SteamItemPrice();
			steamItemPrice.setLowestPrice(lowestPrice);
			steamItemPrice.setMedianPrice(medianPrice);
			steamItemPrice.setQuantitySoldLast24Hours(quantitySoldLast24Hours);

			return steamItemPrice;

		} catch (InterruptedException | IOException e) {
			logger.error("Erro ao processar a resposta JSON da Steam API", e);
			throw new SteamApiProcessingException("Erro ao processar a resposta da API", e);
		}
	}

	private BigDecimal parsePrice(String priceStr) {

		Pattern pattern = Pattern.compile("R\\$\\s*([0-9\\.]+,[0-9]{2})");
		Matcher matcher = pattern.matcher(priceStr);
		if (matcher.find()) {
			String numericValue = matcher.group(1).replace(".", "").replace(",", ".");
			return new BigDecimal(numericValue);
		}
		return BigDecimal.ZERO;
	}

}
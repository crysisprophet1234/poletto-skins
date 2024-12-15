package com.poletto.polettoskins.services.impl;

import java.io.IOException;
import java.math.BigDecimal;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.poletto.polettoskins.entities.MarketItem;
import com.poletto.polettoskins.entities.SteamSticker;
import com.poletto.polettoskins.entities.enums.SteamWebInventorySortType;
import com.poletto.polettoskins.entities.responses.SteamWebApiInventoryItemResponse;
import com.poletto.polettoskins.exceptions.response.SteamApiProcessingException;
import com.poletto.polettoskins.services.SteamWebService;
import com.poletto.polettoskins.utils.HttpRequestBuilderUtil;

@Service
public class SteamWebServiceImpl implements SteamWebService {
	
	private static final Logger logger = LoggerFactory.getLogger(SteamWebServiceImpl.class);
	
	@Value("${steamweb.api.url}")
	private String steamWebApiUrl;

	@Value("${steamweb.api.key}")
	private String steamWebApiKey;
	
	@Autowired
	private HttpClient httpClient;

	@Autowired
	private ObjectMapper objectMapper;

	@Override
	@Cacheable(
	    cacheNames = "steamWebApiInventory", 
	    key = "#steamId"
	)
	@Retryable(
        retryFor = {
            IOException.class,
            SteamApiProcessingException.class
        },
        maxAttempts = 3,
        backoff = @Backoff(delay = 750, multiplier = 2)
    )
	public List<MarketItem> fetchInventoryBySteamId(String steamId, int offset, int limit, SteamWebInventorySortType sort) {
		
		try {
		
			String uri = HttpRequestBuilderUtil
					.buildUri(
						steamWebApiUrl,
						"steam",
						"api",
						"inventory"
					)
					.queryParam("key", steamWebApiKey)
					.queryParam("steam_id", steamId)
					.queryParam("currency", "BRL")
					.queryParam("offset", offset)
					.queryParam("limit", limit)
					.queryParam("sort", sort.toString().toLowerCase())
					.build()
					.toString();
	
			HttpRequest request = HttpRequestBuilderUtil.buildRequest(uri);
	
			HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
			
			if (response.statusCode() >= 400) {
				logger.error("Erro na chamada à SteamWeb API. Status: {}, Corpo: {}", response.statusCode(), response.body());
				throw new SteamApiProcessingException("Erro na chamada à SteamWeb API. Status: " + response.statusCode());
			}
			
			List<SteamWebApiInventoryItemResponse> responseItemsList = objectMapper.readValue(
			    response.body(),
			    new TypeReference<List<SteamWebApiInventoryItemResponse>>() {}
			);
			
			return processItems(responseItemsList);
			
		} catch (InterruptedException e) {
			Thread.currentThread().interrupt();
			logger.error("Thread interrompida durante a chamada à Steam API", e);
			throw new SteamApiProcessingException("Thread interrompida durante a chamada à Steam API", e);

		} catch (IOException e) {
			logger.error("Erro de I/O ao chamar a Steam API", e);
			throw new SteamApiProcessingException("Erro de I/O ao chamar a Steam API", e);
		}
		
	}
	
	private List<MarketItem> processItems(List<SteamWebApiInventoryItemResponse> items) {
		
		return items.parallelStream()
			.filter(x -> {
		        if (x.getInspectLink() == null) {
		            return false;
		        }
		        return true;
		    })
		    .map(x -> {
		        MarketItem marketItem = new MarketItem();
		        marketItem.setItemId(x.getId());
		        marketItem.setInspectUrl(x.getInspectLink());
		        marketItem.setLowestPrice(BigDecimal.valueOf(x.getPriceMin()));
		        marketItem.setMedianPrice(BigDecimal.valueOf(x.getPriceMedian()));
		        marketItem.setQuantitySoldLast24Hours(x.getSold24h());
		        marketItem.setImageUrl(x.getImage());

		        List<String> stickerImageUrls = x.getDescriptions().stream()
		            .filter(desc -> "sticker_info".equals(desc.getName()))  
		            .flatMap(desc -> extractStickerImageUrls(desc.getValue()).stream())
		            .collect(Collectors.toList());

		        List<SteamSticker> steamStickers = stickerImageUrls.stream()
		            .map(url -> {
		                SteamSticker sticker = new SteamSticker();
		                sticker.setImageUrl(url);
		                return sticker;
		            })
		            .collect(Collectors.toList());

		        marketItem.setStickers(steamStickers);

		        return marketItem;
		    })
		    .collect(Collectors.toList());
	}
	
	private List<String> extractStickerImageUrls(String html) {
		
		if (html == null || html.isEmpty()) {
	        return Collections.emptyList();
	    }

	    Document doc = Jsoup.parse(html);

	    Elements imgTags = doc.select("img");
	    
	    List<String> urls = new ArrayList<>();
	    
	    for (Element img : imgTags) {
	        String src = img.attr("src");
	        if (src != null && !src.isBlank()) {
	            urls.add(src);
	        }
	    }
	    
	    return urls;    
	}

}
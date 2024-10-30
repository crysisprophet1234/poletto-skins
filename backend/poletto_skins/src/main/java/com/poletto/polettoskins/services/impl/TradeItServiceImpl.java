package com.poletto.polettoskins.services.impl;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.atomic.AtomicReference;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poletto.polettoskins.entities.MarketItem;
import com.poletto.polettoskins.entities.SteamSticker;
import com.poletto.polettoskins.exceptions.response.TradeItApiException;
import com.poletto.polettoskins.services.TradeItService;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;

@Service
public class TradeItServiceImpl implements TradeItService {

    private static final Logger logger = LoggerFactory.getLogger(TradeItServiceImpl.class);

    private static final String TRADEIT_INVENTORY_BASE_URL = "https://tradeit.gg/api/v2/inventory/search?steamId=";
    private static final String TRADEIT_CURRENCY_BASE_URL = "https://tradeit.gg/api/v2/exchange-rate";
    private static final long CACHE_DURATION_SECONDS = 3600;

    private final Bucket requestBucket;
    
    private final AtomicReference<BigDecimal> cachedRate = new AtomicReference<>();
    private final Object rateLock = new Object();
    private volatile Instant lastFetched = Instant.EPOCH;
    
    @Autowired
    private HttpClient httpClient;

    public TradeItServiceImpl() {
        Bandwidth limit = Bandwidth.classic(5, Refill.greedy(5, Duration.ofSeconds(1)));
        this.requestBucket = Bucket.builder().addLimit(limit).build();
    }

    @Override
    public List<MarketItem> fetchInventoryBySteamId(String steamId) {
    	
    	int maxRetries = 5;
        int retryCount = 0;
        long waitTime = 1000;
    	
        String endpoint = TRADEIT_INVENTORY_BASE_URL + steamId;
        
        List<MarketItem> itemList = new ArrayList<>();  

        while (retryCount < maxRetries) {
        	
            if (requestBucket.tryConsume(1)) {
            	
                try {
                	
                    HttpRequest request = HttpRequest.newBuilder()
                            .uri(new URI(endpoint))
                            .GET()
                            .build();

                    HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

                    if (response.statusCode() == 200) {
                    	
                        JSONObject jsonResponse = new JSONObject(response.body());

                        JSONObject data = jsonResponse.optJSONObject("data");
                        
                        if (data == null) {
                        	
                            logger.warn("API response does not contain 'data'. Returning empty list.");
                            return itemList;
                        }

                        JSONArray items = data.optJSONArray("items");
                        
                        if (items == null) {
                        	
                            logger.warn("API response does not contain 'items'. Possible rate limit or empty inventory.");

                            retryCount++;
                            
                            if (retryCount >= maxRetries) {
                            	
                                logger.error("Maximum number of attempts reached due to absence of 'items'. Returning empty list.");
                                return itemList;
                            }
                            
                            logger.info("Attempt {} of {}: waiting {} ms before retrying...", retryCount, maxRetries, waitTime);
                            
                            Thread.sleep(waitTime);
                            
                            waitTime *= 2;
                            
                            continue;
                        }

                        for (int i = 0; i < items.length(); i++) {
                        	
                            JSONObject item = items.getJSONObject(i);
                            
                            MarketItem marketItem = parseMarketItem(item);
                            
                            if (marketItem != null) {
                            	itemList.add(parseMarketItem(item));
                            } 
                        }

                        return itemList;

                    } else {
                        logger.error("HTTP request error: {}", response.statusCode());
                        throw new TradeItApiException("HTTP request error: " + response.statusCode());
                    }

                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    logger.error("Thread interrupted during retry wait", e);
                    throw new TradeItApiException("Thread interrupted during retry wait", e);
                    
                } catch (IOException | URISyntaxException | JSONException e) {
                    logger.error("Error fetching user inventory items", e);
                    throw new TradeItApiException("Error fetching user inventory items", e);
                }
            } else {
            	
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    logger.error("Thread interrupted during rate limit wait", e);
                    throw new TradeItApiException("Thread interrupted during rate limit wait", e);
                }
            }
        }

        logger.error("Maximum number of attempts reached. Returning empty list.");
        return itemList;
    }

    @Override
    public BigDecimal convertUsdToBrl(BigDecimal usd) {
    	
        if (usd == null) {
            throw new IllegalArgumentException("USD value cannot be null.");
        }

        BigDecimal rate = cachedRate.get();

        if (Instant.now().isAfter(lastFetched.plusSeconds(CACHE_DURATION_SECONDS)) || rate == null) {
        	
            synchronized (rateLock) {
            	
                if (Instant.now().isAfter(lastFetched.plusSeconds(CACHE_DURATION_SECONDS)) || rate == null) {
                    rate = fetchUsdToBrlRate();
                    cachedRate.set(rate);
                    lastFetched = Instant.now();
                    logger.info("Exchange rate updated: 1 USD = {} BRL", rate);
                }
            }
        }

        return usd.multiply(rate).setScale(2, RoundingMode.HALF_UP);
    }

    private BigDecimal fetchUsdToBrlRate() {
    	
        try {
        	
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI(TRADEIT_CURRENCY_BASE_URL))
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                logger.error("Exchange rate request error: {}", response.statusCode());
                throw new TradeItApiException("Exchange rate request error: " + response.statusCode());
            }

            JSONObject jsonResponse = new JSONObject(response.body());

            JSONObject rates = jsonResponse.optJSONObject("rates");
            
            if (rates == null || !rates.has("BRL")) {
                logger.error("API response does not contain 'BRL' rate.");
                throw new JSONException("API response does not contain 'BRL' rate.");
            }

            return rates.getBigDecimal("BRL");

        } catch (IOException | InterruptedException | URISyntaxException | JSONException e) {
            logger.error("Unexpected error fetching exchange rate", e);
            throw new TradeItApiException("Unexpected error fetching exchange rate", e);
        }
    }

    private MarketItem parseMarketItem(JSONObject itemJson) {
    	
        JSONArray steamTags = itemJson.optJSONArray("steamTags");

        if (steamTags != null && shouldItemBeExcluded(steamTags)) {
            return null;
        }

        if (itemJson.optInt("tradable") != 1 || !itemJson.has("steamInspectLink")) {
            return null;
        }

        MarketItem marketItem = new MarketItem();
        marketItem.setInspectUrl(itemJson.getString("steamInspectLink"));
        marketItem.setImageUrl(itemJson.getString("imgURL").replace("/140fx140f", ""));

        if (itemJson.has("stickers") && !itemJson.isNull("stickers")) {
            addStickersImageUrl(marketItem, itemJson);
        }

        BigDecimal steamPriceUsd = itemJson.getBigDecimal("steamPrice").movePointLeft(2);
        BigDecimal medianPriceUsd = itemJson.getBigDecimal("price").movePointLeft(2);

        BigDecimal steamPriceBrl = convertUsdToBrl(steamPriceUsd);
        BigDecimal medianPriceBrl = convertUsdToBrl(medianPriceUsd);

        marketItem.setLowestPrice(steamPriceBrl);
        marketItem.setMedianPrice(medianPriceBrl);

        return marketItem;
    }
    
    private boolean shouldItemBeExcluded(JSONArray steamTagsJsonArray) {
    	
        Set<String> excludedTags = Set.of(
    		"Collectible",
    		"Music Kit",
    		"Graffiti",
    		"Container"
    	);
        
        return steamTagsJsonArray.toList().stream()
                .map(Object::toString)
                .anyMatch(excludedTags::contains);
    }

    private MarketItem addStickersImageUrl(MarketItem marketItem, JSONObject itemJson) {
        JSONArray stickersArr = itemJson.optJSONArray("stickers");
        if (stickersArr != null) {
            for (int i = 0; i < stickersArr.length(); i++) {
                JSONObject sticker = stickersArr.getJSONObject(i);
                String stickerImgUrl = sticker.getString("link");

                SteamSticker steamSticker = new SteamSticker();
                steamSticker.setImageUrl(stickerImgUrl);

                if (marketItem.getStickers() == null) {
                    marketItem.setStickers(new ArrayList<>());
                }
                marketItem.getStickers().add(steamSticker);
            }
        }
        return marketItem;
    }
}

package com.poletto.polettoskins.services.impl;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.poletto.polettoskins.entities.SteamItem;
import com.poletto.polettoskins.entities.SteamItemPrice;
import com.poletto.polettoskins.entities.SteamUser;
import com.poletto.polettoskins.exceptions.response.ResourceNotFoundException;
import com.poletto.polettoskins.repositories.ListingRepository;
import com.poletto.polettoskins.services.SteamService;

@Service
public class SteamServiceImpl implements SteamService {
	
	@Value("${steam.community.url}")
	private String steamCommunityUrl;
	
	@Value("${csfloat.api.url}")
	private String csfloatApiUrl;
	
	@Value("${steam.api.url}")
	private String steamApiUrl;

	@Value("${steam.api.key}")
	private String steamApiKey;

	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@Autowired
	private ListingRepository listingRepository;	

	@Override
	public SteamUser getUserInfo(String steamId) {
		
		String url = UriComponentsBuilder
				.fromHttpUrl(steamApiUrl)
				.pathSegment("ISteamUser", "GetPlayerSummaries", "v0002")
				.queryParam("key", steamApiKey)
	            .queryParam("steamids", "{steamId}")
	            .build(steamId)
	            .toString();

        String responseJson = restTemplate.getForObject(url, String.class);
        
        SteamUser steamUser = extractPlayerFromResponse(responseJson);

        if (steamUser == null) {
            throw new ResourceNotFoundException("Steam ID provided not found");
        }
        
        return steamUser;
	    
	}
	
	@Override
	public SteamItemPrice getItemPriceBySteamId(String fullItemName) {	
		
		String url = UriComponentsBuilder
				.fromHttpUrl(steamCommunityUrl)
				.pathSegment("market", "priceoverview")
				.queryParam("currency", 7) // R$
				.queryParam("appid", 730)  // CSGO
 				.queryParam("market_hash_name", fullItemName)
				.build()
				.toString();	   
		
		String response = restTemplate.getForObject(url, String.class);
		
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
	}
	
	public List<SteamItem> filterUnlistedItems(List<SteamItem> steamItems) {
        // Collect all asset IDs from the Steam items.
        List<String> assetIds = steamItems.stream()
            .map(SteamItem::getAssetId)
            .collect(Collectors.toList());

        // Get all listed asset IDs in a single query.
        List<String> listedAssetIds = listingRepository.findAllByAssetIdIn(assetIds).stream()
            .map(x -> x.getItem().getAssetId())
            .collect(Collectors.toList());

        // Filter out the items that are already listed.
        return steamItems.stream()
            .filter(item -> !listedAssetIds.contains(item.getAssetId()))
            .collect(Collectors.toList());
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
	
	private SteamUser extractPlayerFromResponse(String responseJson) {
        try {
            Map<String, Object> responseMap = objectMapper.readValue(responseJson, Map.class);
            Map<String, Object> playerInfoMap = (Map<String, Object>) responseMap.get("response");
            
            if (playerInfoMap != null && playerInfoMap.containsKey("players")) {
                List<Map<String, Object>> playerList = (List<Map<String, Object>>) playerInfoMap.get("players");
                
                if (!playerList.isEmpty()) {
                    Map<String, Object> firstPlayer = playerList.get(0);
                    
                    SteamUser steamUser = new SteamUser();
                    
                    for (Field field : SteamUser.class.getDeclaredFields()) {
                        field.setAccessible(true);
                        
                        String fieldName = field.getName();
                        
                        if (firstPlayer.containsKey(fieldName.toLowerCase())) {
                            field.set(steamUser, firstPlayer.get(fieldName.toLowerCase()));
                        }
                    }
                    
                    return steamUser;
                }
            } 
        } catch (Exception e) {
        	e.printStackTrace();
        }
        return null;
    }

}
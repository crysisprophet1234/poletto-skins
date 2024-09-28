package com.poletto.polettoskins.services.impl;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.poletto.polettoskins.entities.SteamItem;
import com.poletto.polettoskins.entities.SteamItemPrice;
import com.poletto.polettoskins.entities.SteamSticker;
import com.poletto.polettoskins.entities.SteamUser;
import com.poletto.polettoskins.exceptions.response.ResourceNotFoundException;
import com.poletto.polettoskins.repositories.SteamItemRepository;
import com.poletto.polettoskins.services.SteamService;

@Service
public class SteamServiceImpl implements SteamService {

	@Value("${steam.api.key}")
	private String steamApiKey;

	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@Autowired
	private SteamItemRepository steamItemRepository;

	@Override
	public SteamUser getUserInfo(String steamId) {
		   
        String url = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/" 
                   + "?key=" + steamApiKey
                   + "&steamids=" + steamId;

        String responseJson = restTemplate.getForObject(url, String.class);
        
        SteamUser steamUser = extractPlayerFromResponse(responseJson);

        if (steamUser == null) {
            throw new ResourceNotFoundException("Steam ID provided not found");
        }
        
        return steamUser;
	    
	}
	
	@Override
	public void syncItems(String steamUserId) {
		
		List<SteamItem> itemsFromSteamUser = getUserInventory(steamUserId);
		
		for (SteamItem item : itemsFromSteamUser) {
			
			String itemIdPrefix = item.getOwnerSteamId() != null
					? "S" + item.getOwnerSteamId()
					: "M" + item.getMarketId();
			
			String fullItemId = itemIdPrefix + "A" + item.getAssetId() + "D" + item.getD();
			
			item.setItemId(fullItemId);
			
		}
		
		steamItemRepository.saveAll(itemsFromSteamUser);
		
	}
	
	@Override
	public Page<SteamItem> getItemsPaged(Pageable pageable, String query) {
		//var page = steamItemRepository.findAll(pageable);
		var page = steamItemRepository.findByFullItemName(query, pageable);
		return page;
	}
	
	@Override
    public List<SteamItem> getUserInventory(String steamId) {
		
        String steamUrl = "https://steamcommunity.com/inventory/" + steamId + "/730/2";
        
        String steamResponseJson = restTemplate.getForObject(steamUrl, String.class);
        
        var itemsSteamData = extractSteamDataFromResponse(steamResponseJson, steamId);

        if (itemsSteamData == null) {
        	throw new ResourceNotFoundException("Steam ID provided not found");
        }
        	
        String csfloatApiResponseJson = fetchBulkItemsFromCsfloatApi(itemsSteamData);
        
        if (csfloatApiResponseJson == null) {
        	throw new RuntimeException("Problem fetching items information");
        }
        
        List<SteamItem> steamItems = extractsItemFromResponse(csfloatApiResponseJson, itemsSteamData.get("links"));
        
        if (steamItems == null) {
        	throw new RuntimeException("Problem parsing items information");
        }
        
        //steamItemRepository.saveAll(steamItemsList);
        
        return steamItems;
    }
	
	@Override
	public SteamItem getItemBySteamId(String itemSteamId) {

	    String csfloatApiUrl = "http://localhost:81"
	        + "?url=steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20"
	        + itemSteamId;

	    String responseJson = restTemplate.getForObject(csfloatApiUrl, String.class);

	    Map<String, Object> itemMap = null;

	    try {
	        Map<String, Object> responseMap = objectMapper.readValue(responseJson, new TypeReference<Map<String, Object>>() {});
	        itemMap = (Map<String, Object>) responseMap.get("iteminfo");
	    } catch (JsonProcessingException e) {
	        e.printStackTrace();
	    }

	    return extractSteamItem(itemMap);
	}
	
	@Override
	public SteamItemPrice getItemPriceBySteamId(String itemSteamId) {
		
		SteamItem steamItem = getItemBySteamId(itemSteamId);
		
		if (steamItem == null || steamItem.getFullItemName() == null) {
            throw new IllegalArgumentException("Invalid item or item name not found.");
        }
		
		String itemHashName = steamItem.getFullItemName();
		
		String url = "https://steamcommunity.com/market/priceoverview/"
				   + "?currency=7"
				   + "&appid=730"
				   + "&market_hash_name=" + itemHashName;
		
		String response = restTemplate.getForObject(url, String.class);
		
		JSONObject jsonResponse = new JSONObject(response);

        if (!jsonResponse.getBoolean("success")) {
            throw new RuntimeException("Failed to fetch price data from Steam Market");
        }

        String lowestPriceStr = jsonResponse.optString("lowest_price", "R$ 0,00");
        String medianPriceStr = jsonResponse.optString("median_price", "R$ 0,00");
        Integer quantitySoldLast24Hours = Integer.parseInt(jsonResponse.optString("volume", "0"));

        BigDecimal lowestPrice = parsePrice(lowestPriceStr);
        BigDecimal medianPrice = parsePrice(medianPriceStr);

        SteamItemPrice steamItemPrice = new SteamItemPrice();
        steamItemPrice.setLowestPrice(lowestPrice);
        steamItemPrice.setMedianPrice(medianPrice);
        steamItemPrice.setQuantitySoldLast24Hours(quantitySoldLast24Hours);

        return steamItemPrice;
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
	
	private String fetchBulkItemsFromCsfloatApi(Map<String, List<Map<String, Object>>> inspectUrlListBody) {
		
		String csfloatApiUrl = "http://localhost:81/bulk";
        
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        
        HttpEntity<Map<String, List<Map<String, Object>>>> requestEntity = new HttpEntity<>(inspectUrlListBody, headers);
        
        ResponseEntity<String> csfloatApiResponse = restTemplate.exchange(csfloatApiUrl, HttpMethod.POST, requestEntity, String.class);
        
        return csfloatApiResponse.getBody();
		
	}
	
	private Map<String, List<Map<String, Object>>> extractSteamDataFromResponse(String responseJson, String steamId) {
        try {
            Map<String, Object> responseMap = objectMapper.readValue(responseJson, Map.class);
            List<Map<String, Object>> assetsList = (List<Map<String, Object>>) responseMap.get("assets");
            List<Map<String, Object>> descriptionsList = (List<Map<String, Object>>) responseMap.get("descriptions");

            List<Map<String, Object>> steamData = new ArrayList<>();
            
            for (Map<String, Object> asset : assetsList) {
                String classid = (String) asset.get("classid");
                String instanceid = (String) asset.get("instanceid");

                Map<String, Object> description = descriptionsList.stream()
                        .filter(desc -> desc.get("classid").equals(classid) && desc.get("instanceid").equals(instanceid))
                        .findFirst()
                        .orElse(null);

                if (description != null) {
                	
                	boolean isValid = categorizeItem(description);
                  
            		List<Map<String, String>> action = (List<Map<String, String>>) description.get("actions");
                
                    if (action != null && isValid) {
                    	Map<String, Object> steamDataMap = new HashMap<>();
                    	String link = action.get(0).get("link");
                    	link = link.replace("%owner_steamid%", steamId);
                    	link = link.replace("%assetid%", (String) asset.get("assetid"));
                    	steamDataMap.put("link", link);
                    	steamDataMap.put("marketName", (String) description.get("market_name"));
                    	steamDataMap.put("imageUrl", (String) description.get("icon_url"));
                    	steamDataMap.put("stickersImageUrl", extractStickersImageUrl(description));
                    	steamData.add(steamDataMap);
                    }         	

                }
            }

            Map<String, List<Map<String, Object>>> result = new HashMap<>();
            //result.put("links", steamData); 
            
            
            //TODO: workaround while there is no pagination
            if (steamData.size() > 50) {
            	result.put("links", steamData.subList(0, 100));
            } else {
            	result.put("links", steamData);
            }
            
            
            return result;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
	
	private List<String> extractStickersImageUrl(Map<String, Object> descriptionJson) {
		
		List<String> stickerUrls = new ArrayList<>();
		
        List<Map<String, String>> descriptionValues = (List<Map<String, String>>) descriptionJson.get("descriptions");
        
        for (Map<String, String> desc : descriptionValues) {
            if (desc.get("value").contains("sticker_info")) {
                String stickersHtml = desc.get("value");
                Pattern pattern = Pattern.compile("src=\"([^\"]+)\"");
                Matcher matcher = pattern.matcher(stickersHtml);
                while (matcher.find()) {
                	stickerUrls.add(matcher.group(1));
                }
                break;
            }
        }
        
        return stickerUrls;
		
	}

	private List<SteamItem> extractsItemFromResponse(String responseJson, List<Map<String, Object>> linkList) {
	    try {
	        Map<String, Object> responseMap = objectMapper.readValue(responseJson, Map.class);

	        List<SteamItem> steamItems = new ArrayList<>();
	        for (Map.Entry<String, Object> entry : responseMap.entrySet()) {
	            Map<String, Object> itemMap = (Map<String, Object>) entry.getValue();
	            
	            SteamItem steamItem = extractSteamItem(itemMap);
	            
	            steamItems.add(steamItem);
	        }
	        
	        for (int i = 0; i < linkList.size(); i++) {
	        	Map<String, Object> link = linkList.get(i);
	        	String steamImageUrl = "https://community.akamai.steamstatic.com/economy/image/" + (String) link.get("imageUrl");
	        	steamItems.stream()
                	.filter(item -> item.getFullItemName().equals(link.get("marketName")))
                	.forEach(item -> item.setImageUrl(steamImageUrl));
	        	
	        	steamItems.stream()
            	.filter(item -> item.getFullItemName().equals(link.get("marketName")))
            	.forEach(item -> {
            		item.setImageUrl(steamImageUrl);
            		item.setStickers(addImageUrlToStickers(item.getStickers(), (List<String>) link.get("stickersImageUrl")));
            	});      	
	        	
	        }       
	        
	        return steamItems;
	    } catch (Exception e) {
	        e.printStackTrace();
	        return null;
	    }
	}
	
	private List<SteamSticker> addImageUrlToStickers(List<SteamSticker> stickers, List<String> images) {
		
		if(stickers.size() == 0 || images.size() == 0) {
			return stickers;
		}
		
		try {
		
			Integer firstStickerId = stickers.get(0).getStickerId();
	        boolean allSameStickerId = stickers.stream()
	                .allMatch(sticker -> sticker.getStickerId().equals(firstStickerId));

	        if (allSameStickerId) {
	            String imageUrl = images.get(0);
	            stickers.forEach(sticker -> sticker.setImageUrl(imageUrl));
	        } else {
	            for (int i = 0; i < stickers.size(); i++) {
	                stickers.get(i).setImageUrl(images.get(i));
	            }
	        }
		
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		
		return stickers;
		
	}
	
	private List<SteamSticker> parseStickers(List<Map<String, Object>> stickersList) {
	    List<SteamSticker> stickers = new ArrayList<>();
	    for (Map<String, Object> stickerMap : stickersList) {
	    	
	    	SteamSticker sticker = new SteamSticker();

	    	if (stickerMap.containsKey("stickerId")) {
	            sticker.setStickerId((Integer) stickerMap.get("stickerId"));
	        }
	        if (stickerMap.containsKey("name")) {
	            sticker.setName((String) stickerMap.get("name"));
	        }
	        if (stickerMap.containsKey("codename")) {
	            sticker.setCodename((String) stickerMap.get("codename"));
	        }
	        if (stickerMap.containsKey("slot")) {
	            sticker.setSlot((Integer) stickerMap.get("slot"));
	        }
	        if (stickerMap.containsKey("material")) {
	            sticker.setMaterial((String) stickerMap.get("material"));
	        }
	        if (stickerMap.containsKey("wear")) {
	            //sticker.setWear((Double) stickerMap.get("wear"));
	        	sticker.setWear(((Number) stickerMap.get("wear")).doubleValue());
	        }
	        if (stickerMap.containsKey("scale")) {
	           //sticker.setScale((Double) stickerMap.get("scale"));
	        	sticker.setScale(((Number) stickerMap.get("scale")).doubleValue());
	        }
	        if (stickerMap.containsKey("rotation")) {
	            sticker.setRotation((Integer) stickerMap.get("rotation"));
	        }
	        
	        stickers.add(sticker);
	    }
	    
	 return stickers;   
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

	private boolean categorizeItem(Map<String, Object> itemMap) {
		
		String type = itemMap
				.get("type")
				.toString()
				.toLowerCase();
		
		if (type.contains("graffiti")) {
			return false;
		}
		
		if (type.contains("agent")) {
			return false;
		}
		
		if (type.contains("collectible")) {
			return false;
		}
		
		return true;		
		
    }

	private SteamItem extractSteamItem(Map<String, Object> itemMap) {
        SteamItem steamItem = new SteamItem();

        steamItem.setAssetId((String) itemMap.getOrDefault("a", null));
        steamItem.setOwnerSteamId((String) itemMap.getOrDefault("s", null));
        steamItem.setD((String) itemMap.getOrDefault("d", null));
        steamItem.setMarketId((String) itemMap.getOrDefault("m", null));
        steamItem.setOrigin((Integer) itemMap.getOrDefault("origin", null));
        steamItem.setQuality((Integer) itemMap.getOrDefault("quality", null));
        steamItem.setRarity((Integer) itemMap.getOrDefault("rarity", null));
        steamItem.setPaintSeed((Integer) itemMap.getOrDefault("paintseed", null));
        steamItem.setDefIndex((Integer) itemMap.getOrDefault("defindex", null));
        steamItem.setPaintIndex((Integer) itemMap.getOrDefault("paintindex", null));
        
        if (itemMap.containsKey("min")) {
            steamItem.setMin(((Number) itemMap.get("min")).doubleValue());
        }
        if (itemMap.containsKey("max")) {
            steamItem.setMax(((Number) itemMap.get("max")).doubleValue());
        }

        steamItem.setWeaponType((String) itemMap.getOrDefault("weapon_type", null));
        steamItem.setItemName((String) itemMap.getOrDefault("item_name", null));
        steamItem.setRarityName((String) itemMap.getOrDefault("rarity_name", null));
        steamItem.setQualityName((String) itemMap.getOrDefault("quality_name", null));
        steamItem.setOriginName((String) itemMap.getOrDefault("origin_name", null));
        steamItem.setFullItemName((String) itemMap.getOrDefault("full_item_name", null));
        steamItem.setLowRank((Integer) itemMap.getOrDefault("low_rank", null));
        steamItem.setHighRank((Integer) itemMap.getOrDefault("high_rank", null));
        
        if (itemMap.containsKey("floatvalue")) {
            steamItem.setFloatValue(((Number) itemMap.get("floatvalue")).doubleValue());
        }

        steamItem.setFloatId((String) itemMap.getOrDefault("floatid", null));
        steamItem.setWearName((String) itemMap.getOrDefault("wear_name", null));
        steamItem.setImageUrl((String) itemMap.getOrDefault("imageurl", null));

        if (itemMap.containsKey("stickers")) {
            steamItem.setStickers(parseStickers((List<Map<String, Object>>) itemMap.get("stickers")));
        }

        steamItem.setInspectUrl(
            "steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20" 
            + "S" + steamItem.getOwnerSteamId()
            + "A" + steamItem.getAssetId() 
            + "D" + steamItem.getD()
        );

        return steamItem;
    }

	
}
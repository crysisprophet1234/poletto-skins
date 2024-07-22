package com.poletto.polettoskins.services.impl;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.poletto.polettoskins.entities.SteamItem;
import com.poletto.polettoskins.entities.SteamSticker;
import com.poletto.polettoskins.entities.SteamUser;
import com.poletto.polettoskins.exceptions.handler.response.ResourceNotFound;
import com.poletto.polettoskins.repositories.SteamUserRepository;
import com.poletto.polettoskins.services.SteamService;

@Service
public class SteamServiceImpl implements SteamService {

	@Value("${steam.api.key}")
	private String steamApiKey;
	
	@Autowired
	private SteamUserRepository steamUserRepository;

	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private ObjectMapper objectMapper;

	@Override
	public SteamUser getUserInfo(String steamId) {
		
	    Optional<SteamUser> existingUser = steamUserRepository.findById(steamId);
	    
	    if (existingUser.isPresent()) {
	        return existingUser.get();
	    }
	   
        String url = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/" 
                   + "?key=" + steamApiKey
                   + "&steamids=" + steamId;

        String responseJson = restTemplate.getForObject(url, String.class);
        
        SteamUser steamUser = extractPlayerFromResponse(responseJson);

        if (steamUser == null) {
            throw new ResourceNotFound("Steam ID provided not found");
        }
        
        return steamUserRepository.save(steamUser);
	    
	}
	
	@Override
    public List<SteamItem> getUserInventory(String steamId) {
		
        String steamUrl = "https://steamcommunity.com/inventory/" + steamId + "/730/2";
        
        String steamResponseJson = restTemplate.getForObject(steamUrl, String.class);
        
        var itemsSteamData = extractSteamDataFromResponse(steamResponseJson, steamId);

        if (itemsSteamData == null) {
        	throw new ResourceNotFound("Steam ID provided not found");
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
            //result.put("links", links); TODO: workaround while there is no pagination
            if (steamData.size() > 50) {
            	result.put("links", steamData.subList(100, 150));
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
	            
	            SteamItem steamItem = new SteamItem();

	            if (itemMap.containsKey("a")) {
	                steamItem.setAssetId((String) itemMap.get("a"));
	            }
	            if (itemMap.containsKey("s")) {
	                steamItem.setOwnerSteamId((String) itemMap.get("s"));
	            }
	            if (itemMap.containsKey("d")) {
	                steamItem.setD((String) itemMap.get("d"));
	            }
	            if (itemMap.containsKey("m")) {
	                steamItem.setMarketId((String) itemMap.get("m"));
	            }
	            if (itemMap.containsKey("origin")) {
	                steamItem.setOrigin((Integer) itemMap.get("origin"));
	            }
	            if (itemMap.containsKey("quality")) {
	                steamItem.setQuality((Integer) itemMap.get("quality"));
	            }
	            if (itemMap.containsKey("rarity")) {
	                steamItem.setRarity((Integer) itemMap.get("rarity"));
	            }
	            if (itemMap.containsKey("paintseed")) {
	                steamItem.setPaintSeed((Integer) itemMap.get("paintseed"));
	            }
	            if (itemMap.containsKey("defindex")) {
	                steamItem.setDefIndex((Integer) itemMap.get("defindex"));
	            }
	            if (itemMap.containsKey("paintindex")) {
	                steamItem.setPaintIndex((Integer) itemMap.get("paintindex"));
	            }
	            if (itemMap.containsKey("min")) {
	                steamItem.setMin(((Number) itemMap.get("min")).doubleValue());
	            }
	            if (itemMap.containsKey("max")) {
	                steamItem.setMax(((Number) itemMap.get("max")).doubleValue());
	            }
	            if (itemMap.containsKey("weapon_type")) {
	                steamItem.setWeaponType((String) itemMap.get("weapon_type"));
	            }
	            if (itemMap.containsKey("item_name")) {
	                steamItem.setItemName((String) itemMap.get("item_name"));
	            }
	            if (itemMap.containsKey("rarity_name")) {
	                steamItem.setRarityName((String) itemMap.get("rarity_name"));
	            }
	            if (itemMap.containsKey("quality_name")) {
	                steamItem.setQualityName((String) itemMap.get("quality_name"));
	            }
	            if (itemMap.containsKey("origin_name")) {
	                steamItem.setOriginName((String) itemMap.get("origin_name"));
	            }
	            if (itemMap.containsKey("full_item_name")) {
	                steamItem.setFullItemName((String) itemMap.get("full_item_name"));
	            }	            
	            if (itemMap.containsKey("low_rank")) {
	            	steamItem.setLowRank((Integer) itemMap.get("low_rank"));
	            }	 
	            if (itemMap.containsKey("high_rank")) {
	            	steamItem.setHighRank((Integer) itemMap.get("high_rank"));
	            }	
	            if (itemMap.containsKey("floatvalue")) {
	                steamItem.setFloatValue(((Number) itemMap.get("floatvalue")).doubleValue());
	            }	            
	            if (itemMap.containsKey("floatid")) {
	            	steamItem.setFloatId((String) itemMap.get("floatid"));
	            }	            
	            if (itemMap.containsKey("wear_name")) {
	                steamItem.setWearName((String) itemMap.get("wear_name"));
	            }	            
	            if (itemMap.containsKey("imageurl")) {
	            	steamItem.setImageUrl((String) itemMap.get("imageurl"));
	            }	            
	            if (itemMap.containsKey("stickers")) {
	            	steamItem.setStickers(parseStickers((List<Map<String, Object>>) itemMap.getOrDefault("stickers", new ArrayList<>())));
	            }                  
	            
	            steamItem.setInspectUrl(
	            		"steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20" 
	            	  + "S" + steamItem.getOwnerSteamId()
	            	  + "A" + steamItem.getAssetId() 
	            	  + "D" + steamItem.getD()
	            );
	            
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
}
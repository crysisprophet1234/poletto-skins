package com.poletto.polettoskins.services.impl;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.poletto.polettoskins.entities.SteamUser;
import com.poletto.polettoskins.exceptions.handler.response.ResourceNotFound;
import com.poletto.polettoskins.services.SteamService;

@Service
public class SteamServiceImpl implements SteamService {

	@Value("${steam.api.key}")
	private String steamApiKey;

	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private ObjectMapper objectMapper;

	@Override
	public SteamUser getPlayerInfo(String steamId) {

		String url = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/" 
				   + "?key=" + steamApiKey
				   + "&steamids=" + steamId;

		String responseJson = restTemplate.getForObject(url, String.class);

		SteamUser steamUser = extractPlayerFromResponse(responseJson);
		
		if (steamUser == null) {
			throw new ResourceNotFound("steam id provided not found");
		}
		
		return steamUser;

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

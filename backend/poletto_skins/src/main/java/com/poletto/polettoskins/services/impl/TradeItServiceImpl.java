package com.poletto.polettoskins.services.impl;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpException;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.poletto.polettoskins.entities.SteamItem;
import com.poletto.polettoskins.services.TradeItService;

@Service
public class TradeItServiceImpl implements TradeItService {
	
	private HttpClient client = HttpClient.newHttpClient();
	
	private static final String TRADEIT_BASE_URL = "https://tradeit.gg/api/v2/inventory/search?steamId=";

	@Override
	public List<SteamItem> fetchInventoryBySteamId(String steamId) {
		
		 String endpoint = TRADEIT_BASE_URL + steamId;

		 List<SteamItem> itemList = new ArrayList<>();
		 
		 try {
	            
	            HttpRequest request = HttpRequest.newBuilder()
	                    .uri(new URI(endpoint))
	                    .GET()
	                    .build();

	            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

	            if (response.statusCode() == 200) {
	            	
	                JSONObject jsonResponse = new JSONObject(response.body());
	                	
                	try {
                	
	                    JSONArray items = jsonResponse.getJSONObject("data").getJSONArray("items");
	
	                    for (int i = 0; i < items.length(); i++) {
	                    	
	                    	JSONObject item = items.getJSONObject(i);
	                        
	                    	if (item.getInt("tradable") != 1 || !item.has("steamInspectLink")) {
	                    		continue;
	                    	}
	
	                        SteamItem steamItem = new SteamItem();
	                        steamItem.setInspectUrl(item.getString("steamInspectLink"));
	                        steamItem.setImageUrl(
	                    		item.getString("imgURL").replace("/140fx140f", "")
	                    	);
	                        itemList.add(steamItem);
	
	                    }
                    
                	} catch (JSONException jsonEx) {
						throw new JSONException("Falha ao obter itens no inventário do usuário: " + jsonEx.getMessage());
					}
	                    
	            } else {
	            	throw new HttpException("Erro na requisição HTTP: " + response.statusCode());
	            }
	        } catch (Exception e) {
	        	throw new RuntimeException("Erro ao buscar itens no inventário do usuário:" + e.getMessage());
	        }
		 
		return itemList;
	}

}
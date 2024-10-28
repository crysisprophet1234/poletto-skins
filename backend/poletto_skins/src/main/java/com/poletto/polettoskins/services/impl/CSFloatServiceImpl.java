package com.poletto.polettoskins.services.impl;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.poletto.polettoskins.entities.SteamItem;
import com.poletto.polettoskins.services.CSFloatService;

@Service
public class CSFloatServiceImpl implements CSFloatService {
	
	private HttpClient httpClient = HttpClient.newHttpClient();
	
	@Value("${csfloat.api.url}")
    private String apiUrl;

    @Value("${csfloat.api.referer}")
    private String referer;

    @Value("${csfloat.api.origin}")
    private String origin;

	@Override
	public Optional<SteamItem> findItemByInspectUrl(String inspectUrl) {
		
		try {			
			
			URI uri = UriComponentsBuilder.fromHttpUrl(apiUrl)
                    .queryParam("url", inspectUrl)
                    .build()
                    .toUri();

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(uri)
                    .header("Content-Type", "application/json")
                    .header("Referer", referer)
                    .header("Origin", origin)
                    .GET()
                    .build();
			
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            
            JsonNode rootNode = objectMapper.readTree(response.body());

            JsonNode itemInfoNode = rootNode.get("iteminfo");
            
            var steamItem = objectMapper.treeToValue(itemInfoNode, SteamItem.class);
            
            steamItem.setInspectUrl(inspectUrl);
            
            return Optional.of(steamItem);
			
		} catch (Exception e) {
			e.printStackTrace();
            return Optional.empty();
		}
		
	}

}
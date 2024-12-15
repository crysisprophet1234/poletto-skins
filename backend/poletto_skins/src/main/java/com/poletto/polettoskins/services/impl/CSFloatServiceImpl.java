package com.poletto.polettoskins.services.impl;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.poletto.polettoskins.entities.SteamItem;
import com.poletto.polettoskins.exceptions.response.CSFloatServiceException;
import com.poletto.polettoskins.services.CSFloatService;

@Service
public class CSFloatServiceImpl implements CSFloatService {

    private static final Logger logger = LoggerFactory.getLogger(CSFloatServiceImpl.class);

    private static final ObjectMapper objectMapper = new ObjectMapper()
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

    private static final String CONTENT_TYPE_HEADER = "Content-Type";
    private static final String REFERER_HEADER = "Referer";
    private static final String ORIGIN_HEADER = "Origin";
    private static final String APPLICATION_JSON = "application/json";

    @Autowired
    private HttpClient httpClient;

    @Value("${csfloat.api.url}")
    private String apiUrl;

    @Value("${csfloat.api.referer}")
    private String referer;

    @Value("${csfloat.api.origin}")
    private String origin;

    @Override
    @Cacheable(
	    cacheNames = "csfloatApiResponse", 
	    key = "#inspectUrl"
	)
    @Retryable(
        retryFor = {
            IOException.class,
            CSFloatServiceException.class
        },
        maxAttempts = 5,
        backoff = @Backoff(delay = 500, multiplier = 1.5)
    )
    public Optional<SteamItem> findItemByInspectUrl(String inspectUrl) {
    	
        if (inspectUrl == null || inspectUrl.isEmpty()) {
            logger.warn("Inspect URL is null or empty.");
            return Optional.empty();
        }
        	
        try {
        	
            URI uri = buildUri(inspectUrl);
            HttpRequest request = buildHttpRequest(uri);

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                return parseResponse(response.body(), inspectUrl);
            } else {
                logger.error("Failed to retrieve item info from CSFloat API. HTTP status code: {}", response.statusCode());
                throw new CSFloatServiceException("Failed to retrieve item info from CSFloat API");
            }

        } catch (IOException e) {
            logger.error("IO exception occurred while communicating with CSFloat API.", e);
            
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            logger.error("Thread was interrupted while communicating with CSFloat API.", e);
            
        } catch (URISyntaxException e) {
            logger.error("Invalid URI syntax for CSFloat API URL.", e);
            
        } catch (Exception e) {
            logger.error("Unexpected exception occurred while retrieving item from CSFloat API.", e);
        }
        
        return Optional.empty();

    }

    private URI buildUri(String inspectUrl) throws URISyntaxException {
        return UriComponentsBuilder.fromHttpUrl(apiUrl)
                .queryParam("url", inspectUrl)
                .build()
                .toUri();
    }

    private HttpRequest buildHttpRequest(URI uri) {
        return HttpRequest.newBuilder()
                .uri(uri)
                .header(CONTENT_TYPE_HEADER, APPLICATION_JSON)
                .header(REFERER_HEADER, referer)
                .header(ORIGIN_HEADER, origin)
                .GET()
                .build();
    }

    private Optional<SteamItem> parseResponse(String responseBody, String inspectUrl) {
    	
        try {
        	
            JsonNode rootNode = objectMapper.readTree(responseBody);

            JsonNode itemInfoNode = rootNode.get("iteminfo");

            if (itemInfoNode == null || itemInfoNode.isNull()) {
                logger.warn("Item info not found in CSFloat API response for inspect URL: {}", inspectUrl);
                return Optional.empty();
            }

            SteamItem steamItem = objectMapper.treeToValue(itemInfoNode, SteamItem.class);

            if (steamItem == null) {
                logger.warn("Failed to deserialize SteamItem from CSFloat API response.");
                return Optional.empty();
            }

            steamItem.setInspectUrl(inspectUrl);

            return Optional.of(steamItem);

        } catch (JsonProcessingException e) {
            logger.error("Error parsing JSON response from CSFloat API.", e);
            return Optional.empty();
        }
    }
}
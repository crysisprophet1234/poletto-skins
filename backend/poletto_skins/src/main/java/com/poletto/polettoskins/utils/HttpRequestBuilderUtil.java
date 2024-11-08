package com.poletto.polettoskins.utils;

import java.net.URI;
import java.net.http.HttpRequest;

import org.springframework.web.util.UriComponentsBuilder;

public class HttpRequestBuilderUtil {

	public static UriComponentsBuilder buildUri(String baseUrl, String... pathSegments) {
        return UriComponentsBuilder.fromHttpUrl(baseUrl).pathSegment(pathSegments);
    }
	
	public static HttpRequest buildRequest(String uri) {
		return HttpRequest.newBuilder()
                .uri(URI.create(uri))
                .GET()
                .build();
	}
	
}
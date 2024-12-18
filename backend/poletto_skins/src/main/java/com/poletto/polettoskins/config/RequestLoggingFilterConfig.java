package com.poletto.polettoskins.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.CommonsRequestLoggingFilter;

@Configuration
public class RequestLoggingFilterConfig {

    @Bean
    CommonsRequestLoggingFilter logFilter() {
    	
        CommonsRequestLoggingFilter filter = new CommonsRequestLoggingFilter();
        
        filter.setIncludeQueryString(true);
        filter.setIncludePayload(true);
        filter.setIncludeHeaders(false);
        filter.setIncludeClientInfo(true);
        filter.setMaxPayloadLength(10000);
        
        return filter;
    }
}
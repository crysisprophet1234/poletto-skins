package com.poletto.polettoskins.config;

import org.openid4java.consumer.ConsumerManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenIDConfig {

	@Bean
    ConsumerManager consumerManager() {
        return new ConsumerManager();
    }
}

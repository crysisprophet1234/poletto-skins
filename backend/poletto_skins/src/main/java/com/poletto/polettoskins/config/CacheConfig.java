package com.poletto.polettoskins.config;

import java.util.concurrent.TimeUnit;

import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.github.benmanes.caffeine.cache.Caffeine;

@Configuration
public class CacheConfig {
    
    @Bean
    Caffeine<Object, Object> caffeineConfig() {
      return Caffeine.newBuilder()
    	  .recordStats()
          .expireAfterWrite(1, TimeUnit.DAYS)
          .maximumSize(1000)
          .initialCapacity(10);
    }

    @Bean
    CacheManager cacheManager(Caffeine<Object, Object> caffeine) {
      CaffeineCacheManager caffeineCacheManager = new CaffeineCacheManager();
      caffeineCacheManager.setCaffeine(caffeine);
      return caffeineCacheManager;
    }
}
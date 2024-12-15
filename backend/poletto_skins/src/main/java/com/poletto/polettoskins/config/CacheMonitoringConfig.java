package com.poletto.polettoskins.config;

import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.binder.MeterBinder;
import io.micrometer.core.instrument.binder.cache.CaffeineCacheMetrics;

@Configuration
public class CacheMonitoringConfig {
	
	@Bean
    MeterBinder cacheMeterBinder(CacheManager cacheManager) {
		
        return new MeterBinder() {
        	
            @Override
            public void bindTo(MeterRegistry registry) {
            	
                if (cacheManager instanceof CaffeineCacheManager) {
                	
                    CaffeineCacheManager caffeineCacheManager = (CaffeineCacheManager) cacheManager;

                    caffeineCacheManager.getCacheNames().forEach(cacheName -> {
                        var cache = caffeineCacheManager.getCache(cacheName);
                        if (cache instanceof org.springframework.cache.caffeine.CaffeineCache) {
                            var nativeCache = ((org.springframework.cache.caffeine.CaffeineCache) cache).getNativeCache();
                            CaffeineCacheMetrics.monitor(registry, nativeCache, cacheName);
                        }
                    });
                }
            }
        };
    }

}
package com.resumeanalyzer.resume_analyzer.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();

        // Allow specific origins (frontend URL)
        corsConfig.setAllowedOrigins(List.of("http://localhost:5173", "http://13.60.92.220:5173/","http://13.60.92.220","http://ec2-13-60-92-220.eu-north-1.compute.amazonaws.com/"));

        // Allow common HTTP methods
        corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Allow common headers
        corsConfig.setAllowedHeaders(List.of("Authorization", "Content-Type"));

        // Allow credentials (for cookies, authentication, etc.)
        corsConfig.setAllowCredentials(true);

        // Apply this CORS configuration to all endpoints
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);

        return new CorsFilter(source);
    }
}


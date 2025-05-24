package com.wipro.usermangement.util;

import java.util.List;

import org.springframework.web.filter.CorsFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
@Component
public class CorsConfig {
	 @Bean
	    public CorsFilter corsFilter() {
	        CorsConfiguration config = new CorsConfiguration();
	        config.setAllowCredentials(true);
	        config.setAllowedOrigins(List.of("http://localhost:5173"));  // React app origin
	        config.setAllowedHeaders(List.of("*"));
	        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

	        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	        source.registerCorsConfiguration("/**", config);

	        return new CorsFilter(source);  // This creates Spring's CorsFilter instance
	    }
}

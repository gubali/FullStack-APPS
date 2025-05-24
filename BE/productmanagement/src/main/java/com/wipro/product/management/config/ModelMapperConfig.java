package com.wipro.product.management.config;


import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        
        // Optional: Explicitly define mappings if needed
        TypeMap<com.wipro.product.management.dto.ProductDto, com.wipro.product.management.entity.Product> productDtoToEntity = 
            modelMapper.createTypeMap(com.wipro.product.management.dto.ProductDto.class, com.wipro.product.management.entity.Product.class);
        
        productDtoToEntity.addMappings(mapper -> mapper.map(com.wipro.product.management.dto.ProductDto::getDescriptions, com.wipro.product.management.entity.Product::setDescriptions));
        
        TypeMap<com.wipro.product.management.entity.Product, com.wipro.product.management.dto.ProductDto> entityToProductDto = 
            modelMapper.createTypeMap(com.wipro.product.management.entity.Product.class, com.wipro.product.management.dto.ProductDto.class);
        
        entityToProductDto.addMappings(mapper -> mapper.map(com.wipro.product.management.entity.Product::getDescriptions, com.wipro.product.management.dto.ProductDto::setDescriptions));
        
        return modelMapper;
    }
}

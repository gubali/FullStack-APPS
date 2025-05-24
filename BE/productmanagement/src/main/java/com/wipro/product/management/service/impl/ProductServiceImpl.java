package com.wipro.product.management.service.impl;

import com.wipro.product.management.dto.ProductDto;
import com.wipro.product.management.dto.ProductDescriptionDTO;
import com.wipro.product.management.entity.Product;
import com.wipro.product.management.entity.ProductDescription;
import com.wipro.product.management.repository.ProductRepositity;
import com.wipro.product.management.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements IProductService {

    @Autowired
    private ProductRepositity productRepository;

    // ADD Product
    @Override
    public String addProduct(ProductDto productDto) {
        Product product = convertToEntity(productDto);
        productRepository.save(product);
        return "Product added successfully with ID: " + product.getId();
    }

    // GET ALL Products
    @Override
    public List<ProductDto> getAll() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // GET Product By ID
    @Override
    public ProductDto getProductById(Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
        return convertToDto(product);
    }

    // EDIT Product
    @Override
    public ProductDto editProduct(ProductDto productDto, Integer id) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));

        existing.setName(productDto.getName());
        existing.setDescription(productDto.getDescription());
        existing.setPrice(productDto.getPrice());
        existing.setStock(productDto.getStock());
        existing.setImage(productDto.getImage());
        existing.setCategory(productDto.getCategory());

        if (productDto.getDescriptions() != null) {
            List<ProductDescription> descList = productDto.getDescriptions().stream()
                    .map(descDto -> {
                        ProductDescription desc = new ProductDescription();
                        desc.setFeature(descDto.getFeature());
                        return desc;
                    }).collect(Collectors.toList());
            existing.setDescriptions(descList);
        }

        Product updated = productRepository.save(existing);
        return convertToDto(updated);
    }

    // DELETE Product
    @Override
    public void deleteProduct(Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
        productRepository.delete(product);
    }

    // ========== PRIVATE CONVERTERS ==========

    private Product convertToEntity(ProductDto dto) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setStock(dto.getStock());
        product.setImage(dto.getImage());
        product.setCategory(dto.getCategory());

        if (dto.getDescriptions() != null) {
            List<ProductDescription> descriptions = dto.getDescriptions().stream()
                    .map(descDto -> {
                        ProductDescription desc = new ProductDescription();
                        desc.setFeature(descDto.getFeature());
                        return desc;
                    }).collect(Collectors.toList());
            product.setDescriptions(descriptions);
        } else {
            product.setDescriptions(new ArrayList<>());
        }

        return product;
    }

    private ProductDto convertToDto(Product product) {
        ProductDto dto = new ProductDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setStock(product.getStock());
        dto.setImage(product.getImage());
        dto.setCategory(product.getCategory());

        List<ProductDescriptionDTO> descDTOs = product.getDescriptions().stream()
                .map(desc -> new ProductDescriptionDTO(desc.getId(), desc.getFeature()))
                .collect(Collectors.toList());
        dto.setDescriptions(descDTOs);

        return dto;
    }
}

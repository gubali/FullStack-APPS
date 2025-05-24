package com.wipro.product.management.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.util.List;

public class ProductDto {

    private Integer id;

    @NotBlank(message = "Product name is required")
    private String name;

    @NotBlank(message = "Product description is required")
    private String description;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private Double price;

    @NotNull(message = "Stock is required")
    @Min(value = 0, message = "Stock cannot be negative")
    private Integer stock;

    private String image;

    @NotBlank(message = "Category is required")
    private String category;

    @NotNull(message = "Descriptions list cannot be null")
    @Size(min = 1, message = "At least one description is required")
    private List<@Valid ProductDescriptionDTO> descriptions;

    // getters and setters.
    // Constructors
    public ProductDto() {}

    // Getters and setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<ProductDescriptionDTO> getDescriptions() {
        return descriptions;
    }

    public void setDescriptions(List<ProductDescriptionDTO> descriptions) {
        this.descriptions = descriptions;
    }
}

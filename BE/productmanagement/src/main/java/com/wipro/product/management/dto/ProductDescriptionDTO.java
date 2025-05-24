package com.wipro.product.management.dto;

import jakarta.validation.constraints.NotBlank;

public class ProductDescriptionDTO {

    private Long id;

    @NotBlank(message = "Feature must not be blank")
    private String feature;

    // getters and setters...


    // Constructors
    public ProductDescriptionDTO() {}

    public ProductDescriptionDTO(Long id, String feature) {
        this.id = id;
        this.feature = feature;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFeature() {
        return feature;
    }

    public void setFeature(String feature) {
        this.feature = feature;
    }
}

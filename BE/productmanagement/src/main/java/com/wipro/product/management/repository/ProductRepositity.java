package com.wipro.product.management.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wipro.product.management.entity.Product;

public interface ProductRepositity extends JpaRepository<Product, Integer> {

}

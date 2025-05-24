package com.wipro.product.management.controller;

import com.wipro.product.management.dto.ProductDto;
import com.wipro.product.management.service.IProductService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProductController {

    @Autowired
    private IProductService productService;

    // Create Product
    @PostMapping("addProduct")
    public ResponseEntity<String> addProduct(@Valid @RequestBody ProductDto productDto) {
        String message = productService.addProduct(productDto);
        return ResponseEntity.ok(message);
    }

    // Get All Products
    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        List<ProductDto> products = productService.getAll();
        return ResponseEntity.ok(products);
    }

    // Get Product by ID
    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Integer id) {
        ProductDto product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    // Update Product
    @PutMapping("/{id}")
    public ResponseEntity<String> updateProduct(@Valid @RequestBody ProductDto productDto, @PathVariable Integer id) {
        productService.editProduct(productDto, id);
        return ResponseEntity.ok("Product updated successfully!");
    }

    // Delete Product
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Integer id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok("Product deleted successfully!");
    }
}

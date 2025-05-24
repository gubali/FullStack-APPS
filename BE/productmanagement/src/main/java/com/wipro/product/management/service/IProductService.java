package com.wipro.product.management.service;

import java.util.List;

import com.wipro.product.management.dto.ProductDto;

public interface IProductService {

	public String addProduct(ProductDto productDto);
	public List<ProductDto> getAll();
	public ProductDto getProductById(Integer id);
	public ProductDto editProduct(ProductDto productDto, Integer id);
	public void deleteProduct(Integer id);
	
}

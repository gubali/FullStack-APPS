package com.wipro.product.management.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;

@Entity
public class Product {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    Integer id;
	    String name;
	    String description;
	    Double price;
	    Integer stock;
	    String image;
	    String category;
	    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
	    @JoinColumn(name = "product_id")  // creates foreign key in ProductDescription table
	    private List<ProductDescription> descriptions;
	    
	    public List<ProductDescription> getDescriptions() {
			return descriptions;
		}
		public void setDescriptions(List<ProductDescription> descriptions) {
			this.descriptions = descriptions;
		}
		public Product() {}
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
}

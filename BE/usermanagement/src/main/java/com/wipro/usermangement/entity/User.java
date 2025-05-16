package com.wipro.usermangement.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="user")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;
  String firstName;
  String lastName;
  String emailId;
  @Column(unique = true)
  String userName;
  String password;
  String role;
  public User() {}
  public int getId() {
	return id;
  }
  public void setId(int id) {
	this.id = id;
  }
  public String getFirstName() {
	return firstName;
  }
  public void setFirstName(String firstName) {
	this.firstName = firstName;
  }
  public String getLastName() {
	return lastName;
  }
  public void setLastName(String lastName) {
	this.lastName = lastName;
  }
  public String getEmailId() {
	return emailId;
  }
  public void setEmailId(String emailId) {
	this.emailId = emailId;
  }
  public String getUserName() {
	return userName;
  }
  public void setUserName(String userName) {
	this.userName = userName;
  }
  public String getPassword() {
	return password;
  }
  public void setPassword(String password) {
	this.password = password;
  }
  public String getRole() {
	return role;
  }
  public void setRole(String role) {
	this.role = role;
  }
  
}

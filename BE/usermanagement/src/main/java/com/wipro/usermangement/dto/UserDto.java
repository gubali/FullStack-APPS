package com.wipro.usermangement.dto;

import com.wipro.usermangement.entity.User;

public class UserDto {
	 String firstName;
	  String lastName;
	  String emailId;
	  String userName;
	  String password;
	  String role;
	  public UserDto() {}
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

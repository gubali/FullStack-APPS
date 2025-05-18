package com.wipro.usermangement.dto;

public class AuthRequest {
	 String userName;
	  String password;
	  public AuthRequest() {}
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
}

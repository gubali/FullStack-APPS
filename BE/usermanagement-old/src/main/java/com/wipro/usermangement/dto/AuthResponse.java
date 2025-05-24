package com.wipro.usermangement.dto;

public class AuthResponse {
private String token;
private String userName;
private String role;
public AuthResponse(String token, String username, String role) {
	this.token = token;
	this.userName= username;
	this.role = role;
}
public String getToken() {
	return token;
}
public void setToken(String token) {
	this.token = token;
}
public String getUserName() {
	return userName;
}
public void setUserName(String userName) {
	this.userName = userName;
}
public String getRole() {
	return role;
}
public void setRole(String role) {
	this.role = role;
}


}

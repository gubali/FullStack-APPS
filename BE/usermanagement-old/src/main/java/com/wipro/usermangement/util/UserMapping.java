package com.wipro.usermangement.util;

import org.springframework.stereotype.Component;

import com.wipro.usermangement.dto.UserDto;
import com.wipro.usermangement.entity.User;

@Component
public class UserMapping {

	public User makeEntityFromDto(User user, UserDto userDto) {
		user.setFirstName(userDto.getFirstName());
		user.setLastName(userDto.getLastName());
		user.setEmailId(userDto.getEmailId());
		user.setPassword(userDto.getPassword());
		user.setRole(userDto.getRole());
		user.setUserName(userDto.getUserName());
		return user;
	}
	public UserDto makeDtoFromEntity(User user) {
		UserDto userDto = new UserDto();
		userDto.setFirstName(user.getFirstName());
		userDto.setLastName(user.getLastName());
		userDto.setEmailId(user.getEmailId());
		userDto.setPassword(user.getPassword());
		userDto.setRole(user.getRole());
		userDto.setUserName(user.getUserName());
		return userDto;
	}
}

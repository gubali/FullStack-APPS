package com.wipro.usermangement.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.wipro.usermangement.dto.UserDto;
import com.wipro.usermangement.entity.User;
import com.wipro.usermangement.respository.UserRepository;
import com.wipro.usermangement.util.UserMapping;

@Service
public class UserServiceImp implements IUserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private UserMapping userMapping;
	public String addUser(UserDto userDto) {
		User user = new User();
		user = userMapping.makeEntityFromDto(user, userDto);
		user.setPassword(passwordEncoder.encode(userDto.getPassword()));
		userRepository.save(user);
		return "User added successfully";
	}
	@Override
	public Optional<User> getUserRecordsByName(String userName) {
		Optional<User> byUserName = userRepository.findByUserName(userName);
		return byUserName;
	}
}

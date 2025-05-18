package com.wipro.usermangement.service;

import java.lang.StackWalker.Option;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.wipro.usermangement.dto.UserDto;
import com.wipro.usermangement.entity.User;
import com.wipro.usermangement.exception.DuplicateUserNameException;
import com.wipro.usermangement.exception.UserNotFoundExeption;
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
		System.out.println("My password" + user.getPassword());
		userRepository.save(user);
		return "User added successfully";
	}

	@Override
	public Optional<User> getUserRecordsByName(String userName) {
		Optional<User> byUserName = userRepository.findByUserName(userName);
		return byUserName;
	}

	@Override
	public Boolean deleteUserById(int id) {
		Optional<User> userOptional = userRepository.findById(id);
		if (userOptional.isPresent()) {
			userRepository.delete(userOptional.get());
			return true;
		} else {
			throw new UserNotFoundExeption("User with ID " + id + " not found");
		}
	}

	@Override
	public List<User> getAllUser() {
		List<User> users = userRepository.findAll();
		if (users.isEmpty()) {
			throw new UserNotFoundExeption("No users found");
		}
		return users;
	}

	public UserDto updateUser(int id, UserDto userDto) {
		Optional<User> optionalUser = userRepository.findById(id);

		if(optionalUser.isPresent()) {
			User existingUser = optionalUser.get();
			existingUser.setFirstName(userDto.getFirstName());
			existingUser.setLastName(userDto.getLastName());
			existingUser.setEmailId(userDto.getEmailId());
			existingUser.setPassword(userDto.getPassword());
			existingUser.setRole(userDto.getRole());
			existingUser.setUserName(userDto.getUserName());
			userRepository.save(existingUser);
			return userDto;
		}else{
			throw new UserNotFoundExeption("No users found");
		}
	}
}

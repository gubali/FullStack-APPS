package com.wipro.usermangement.controller;

import java.lang.StackWalker.Option;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wipro.usermangement.dto.UserDto;
import com.wipro.usermangement.entity.User;
import com.wipro.usermangement.service.IUserService;

@RestController
@RequestMapping("/api")
public class UserController {
@Autowired
private IUserService iUserService;
@PostMapping("/addUser")
public String createUser(@RequestBody UserDto userDto) {
	return iUserService.addUser(userDto);
}
//@GetMapping("/getUserByName")
//public Optional<User> getUserByName(){
//	Authentication  authentication = SecurityContextHolder.getContext().getAuthentication();
//	String name = authentication.getName();
//System.out.println(name);
//Optional<User> oneRecordFromDb = iUserService.getUserRecordsByName(name);
//return oneRecordFromDb;
//}
}

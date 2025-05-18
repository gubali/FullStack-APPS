package com.wipro.usermangement.controller;

import java.lang.StackWalker.Option;
import java.util.List;
import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wipro.usermangement.config.JwtUtil;
import com.wipro.usermangement.dto.AuthRequest;
import com.wipro.usermangement.dto.AuthResponse;
import com.wipro.usermangement.dto.UserDto;
import com.wipro.usermangement.entity.User;
import com.wipro.usermangement.exception.UserNotFoundExeption;
import com.wipro.usermangement.service.IUserService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {
@Autowired
private IUserService iUserService;


@Autowired
private AuthenticationManager authenticationManager;

@Autowired
private JwtUtil jwtUtil;

@Autowired
private UserDetailsService userDetailsService;
@PostMapping("/addUser")
public String createUser(@RequestBody UserDto userDto) {
	return iUserService.addUser(userDto);
}
@GetMapping("/getUserByName")
public Optional<User> getUserByName(){
	Authentication  authentication = SecurityContextHolder.getContext().getAuthentication();
	String name = authentication.getName();
System.out.println(name);
Optional<User> oneRecordFromDb = iUserService.getUserRecordsByName(name);
return oneRecordFromDb;
}

@DeleteMapping("/deleteUser/{id}")
public ResponseEntity<Boolean> deleteUserById(@PathVariable int id){
	 try {
         boolean deletedUser = iUserService.deleteUserById(id);
         if (deletedUser) {
             return ResponseEntity.ok(deletedUser);  // Return true if user is deleted successfully
         } else {
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);  // Return false if user not found
         }
     } catch (UserNotFoundExeption e) {
         // Handle exception and return a meaningful response
         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);  
     }
}
@GetMapping("/getAllUser")
public List<User> getAllUser(){
	return iUserService.getAllUser();
}

@PutMapping("/update/{id}")
public UserDto updateUser(@RequestBody UserDto userDto, @PathVariable  int id) {
	return iUserService.updateUser(id,userDto);
}
@PostMapping("/login")
public ResponseEntity<?> createAuthToken(@RequestBody AuthRequest authRequest) throws Exception {
    try {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(authRequest.getUserName(), authRequest.getPassword())
        );
    } catch (BadCredentialsException e) {
        throw new Exception("Incorrect username or password", e);
    }

    final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUserName());
    final String token = jwtUtil.generateToken(userDetails.getUsername(),
            userDetails.getAuthorities().stream().findFirst().get().getAuthority());
    final String role = userDetails.getAuthorities().stream().findFirst().get().getAuthority();
    AuthResponse authResponse = new AuthResponse(token, userDetails.getUsername(), role);
    return ResponseEntity.ok(authResponse);
}
}

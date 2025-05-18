package com.wipro.usermangement.service;

import java.util.List;
import java.util.Optional;

import com.wipro.usermangement.dto.UserDto;
import com.wipro.usermangement.entity.User;

public interface IUserService {
   public String addUser(UserDto userDto);
   public Optional<User> getUserRecordsByName(String userName);
   public Boolean deleteUserById(int id);
   public List<User> getAllUser();
   public UserDto updateUser(int id, UserDto userDto);
  // public UserDto login(String name, String password);
}

package com.wipro.usermangement.service;

import java.util.Optional;

import com.wipro.usermangement.dto.UserDto;
import com.wipro.usermangement.entity.User;

public interface IUserService {
   public String addUser(UserDto userDto);
   public Optional<User> getUserRecordsByName(String userName);
}

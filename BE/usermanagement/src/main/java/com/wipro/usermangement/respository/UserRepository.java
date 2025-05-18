package com.wipro.usermangement.respository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wipro.usermangement.entity.User;

public interface UserRepository extends JpaRepository<User, Integer>{
     Optional<User> findByUserName(String name);
     
}

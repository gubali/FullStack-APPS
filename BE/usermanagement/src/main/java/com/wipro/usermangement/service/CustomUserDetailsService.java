package com.wipro.usermangement.service;

import java.util.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.wipro.usermangement.entity.User;
import com.wipro.usermangement.respository.UserRepository;
@Service
public class CustomUserDetailsService implements UserDetailsService {
   @Autowired
   private  UserRepository userRepository;
   @Override
   public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       User user = userRepository.findByUserName(username)
               .orElseThrow(() -> new UsernameNotFoundException("User not found"));

       return new org.springframework.security.core.userdetails.User(
               user.getUserName(),
               user.getPassword(),
               Collections.singleton(new SimpleGrantedAuthority("ROLE_" + user.getRole()))
//               List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole()))
       );
   }
}

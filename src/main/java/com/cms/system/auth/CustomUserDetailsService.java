package com.cms.system.auth;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.cms.system.UserRepo;
import com.cms.system.model.Users;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	private final UserRepo userRepo;

	public CustomUserDetailsService(UserRepo userRepo) {
		this.userRepo = userRepo;
	}

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Users user = userRepo.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
		return new CustomeUserDetails(user);
	}
}
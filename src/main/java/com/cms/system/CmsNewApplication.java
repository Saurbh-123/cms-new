package com.cms.system;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.cms.system.model.Role;
import com.cms.system.model.Users;

@SpringBootApplication
public class CmsNewApplication {

	public static void main(String[] args) {
		SpringApplication.run(CmsNewApplication.class, args);
	}

//	@Bean
//	CommandLineRunner initAdmin(UserRepo repo, PasswordEncoder encoder) {
//		return args -> {
//			if (!repo.existsByEmail("admin@cms.com")) {
//				Users admin = new Users();
//				admin.setUsername("Admin");
//				admin.setEmail("admin@cms.com");
//				admin.setPassword(encoder.encode("Admin@123"));
//				admin.setRole(Role.ADMIN);
//				repo.save(admin);
//			}
//		};
//	}
}
package com.cms.system;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cms.system.model.Users;

public interface UserRepo extends JpaRepository<Users, Long>{

	Optional<Users> findByEmail(String email);

	boolean existsByEmail(String email);
}

package com.Chat.Chat.repository;

import com.Chat.Chat.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepo extends JpaRepository<User, UUID> {
	Optional<User> findByAndPhoneNumber(String phoneNumber);
}

package com.Chat.Chat.repository;

import com.Chat.Chat.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MessageRepo extends JpaRepository<Message, UUID> {
}

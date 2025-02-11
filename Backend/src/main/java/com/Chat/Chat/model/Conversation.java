package com.Chat.Chat.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "conversations")
@Data
public class Conversation {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;
	private String name;
	private Boolean isGroup;
	private LocalDateTime createdAt = LocalDateTime.now();
	private LocalDateTime lastMessageAt = LocalDateTime.now();
	@OneToMany(mappedBy = "conversation", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Message> messages;
	@ManyToMany(mappedBy = "conversations")
	private List<User> users;
}

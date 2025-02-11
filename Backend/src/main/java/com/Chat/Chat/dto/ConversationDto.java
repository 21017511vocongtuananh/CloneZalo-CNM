package com.Chat.Chat.dto;

import com.Chat.Chat.model.Message;
import com.Chat.Chat.model.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@AllArgsConstructor
@NoArgsConstructor
public class ConversationDto {
	private UUID id;
	private String name;
	private Boolean isGroup;
	private LocalDateTime createdAt;
	private LocalDateTime lastMessageAt;
	private List<Message> messages;
	private List<User> users;
}

package com.Chat.Chat.dto;

import com.Chat.Chat.model.Conversation;
import com.Chat.Chat.model.Message;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
	private UUID id;
	private String name;
	private String phoneNumber;
	private String password;
	private String avatar;
	private LocalDate dateOfBirth;
	private LocalDateTime createdAt;
	private List<Conversation> conversations;
	private List<Message> seenMessages;
	private List<Message> messages;
}

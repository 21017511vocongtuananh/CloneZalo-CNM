package com.Chat.Chat.mapper;

import com.Chat.Chat.dto.ConversationDto;
import com.Chat.Chat.dto.MessageDto;
import com.Chat.Chat.dto.UserDto;
import com.Chat.Chat.model.Conversation;
import com.Chat.Chat.model.Message;
import com.Chat.Chat.model.User;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class EntityMapper {

	public UserDto mapUerToDtoBasic(User user)
	{
		UserDto userDto = new UserDto();
		userDto.setId(user.getId());
		userDto.setName(user.getName());
		userDto.setPhoneNumber(user.getPhoneNumber());
		userDto.setPassword(user.getPassword());
		userDto.setImage(user.getImage());
		userDto.setDateOfBirth(user.getDateOfBirth());
		return userDto;
	}

	public ConversationDto mapConversationDtoBasic(Conversation conversation)
	{
		ConversationDto conversationDto = new ConversationDto();
		conversationDto.setId(conversation.getId());
		conversationDto.setName(conversation.getName());
		conversationDto.setIsGroup(conversation.getIsGroup());
		conversationDto.setCreatedAt(LocalDateTime.now());
		conversationDto.setLastMessageAt(conversation.getLastMessageAt());
		if (conversation.getMessages() != null) {
			List<MessageDto> messageDtos = conversation.getMessages().stream()
					.map(this::mapMessageDtoBasic)
					.toList();
			conversationDto.setMessages(messageDtos);
		}
		if (conversation.getUsers() != null) {
			List<UserDto> userDtos = conversation.getUsers().stream()
					.map(this::mapUerToDtoBasic)
					.toList();
			conversationDto.setUsers(userDtos);
		}
		return conversationDto;
	}


	public MessageDto mapMessageDtoBasic(Message message)
	{
		MessageDto message1 = new MessageDto();
		message1.setBody(message.getBody());
		message1.setImage(message.getImage());
		message1.setSender(mapUerToDtoBasic((message.getSender())));
		List<UserDto> seenUsersDto = message.getSeenUsers().stream()
				.map(this::mapUerToDtoBasic)
				.toList();
		message1.setSeenUsers(seenUsersDto);
		return message1;
	}

}

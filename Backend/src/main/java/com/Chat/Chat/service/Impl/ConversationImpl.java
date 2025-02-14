package com.Chat.Chat.service.Impl;

import com.Chat.Chat.dto.ConversationDto;
import com.Chat.Chat.dto.Response;
import com.Chat.Chat.mapper.EntityMapper;
import com.Chat.Chat.model.Conversation;
import com.Chat.Chat.model.User;
import com.Chat.Chat.repository.ConversationRepo;
import com.Chat.Chat.service.ConversationService;
import com.Chat.Chat.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ConversationImpl implements ConversationService {
	private final ConversationRepo conversationRepo;
	private final UserService userService;
	private final EntityMapper entityMapper;


	@Override
	public Response getConversations() {
		User currentUser = userService.getLoginUser();
		if(currentUser == null)
		{
			return Response.builder()
					.status(401)
					.message("Unauthorized: User not logged in")
					.build();
		}
		List<ConversationDto> conversationsDto  = conversationRepo.findByUsers_IdOrderByLastMessageAtDesc(currentUser.getId())
				.stream()
				.map(entityMapper::mapConversationDtoBasic)
				.collect(Collectors.toList());

		return Response.builder()
				.status(200)
				.message("Conversations retrieved successfully")
				.conversationList(conversationsDto)
				.build();
	}
}

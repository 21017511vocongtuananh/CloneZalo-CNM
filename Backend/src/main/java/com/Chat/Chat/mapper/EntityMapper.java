package com.Chat.Chat.mapper;

import com.Chat.Chat.dto.UserDto;
import com.Chat.Chat.model.User;
import org.springframework.stereotype.Component;

@Component
public class EntityMapper {

	public UserDto mapUerToDtoBasic(User user)
	{
		UserDto userDto = new UserDto();
		userDto.setId(user.getId());
		userDto.setName(user.getName());
		userDto.setPhoneNumber(user.getPhoneNumber());
		userDto.setPassword(user.getPassword());
		userDto.setAvatar(user.getAvatar());
		userDto.setDateOfBirth(user.getDateOfBirth());
		return userDto;
	}
}

package com.Chat.Chat.service;

import com.Chat.Chat.dto.AuthRequest;
import com.Chat.Chat.dto.Response;
import com.Chat.Chat.dto.UserDto;
import com.Chat.Chat.model.User;

public interface UserService {
	Response registerUser(UserDto registrationRequest);
	Response loginUser(AuthRequest authRequest);

	User getLoginUser();
	Response getAllUser();
	Response getByPhoneNumBer();
	Response resetPassword(AuthRequest authRequest);
}

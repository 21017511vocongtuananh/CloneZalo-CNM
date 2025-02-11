package com.Chat.Chat.service;

import com.Chat.Chat.dto.LoginRequest;
import com.Chat.Chat.dto.Response;
import com.Chat.Chat.dto.UserDto;

public interface UserService {
	Response registerUser(UserDto registrationRequest);
	Response loginUser(LoginRequest LoginRequest);
}

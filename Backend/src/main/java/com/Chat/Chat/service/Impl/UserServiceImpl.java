package com.Chat.Chat.service.Impl;

import com.Chat.Chat.dto.LoginRequest;
import com.Chat.Chat.dto.Response;
import com.Chat.Chat.dto.UserDto;
import com.Chat.Chat.exception.InvalidCredentialsException;
import com.Chat.Chat.exception.NotFoundException;
import com.Chat.Chat.mapper.EntityMapper;
import com.Chat.Chat.model.User;
import com.Chat.Chat.repository.UserRepo;
import com.Chat.Chat.security.JwtUtils;
import com.Chat.Chat.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepo userRepo;
	private final PasswordEncoder passwordEncoder;
	private final JwtUtils jwtUtils;
	private final EntityMapper entityMapper;

	@Override
	public Response registerUser(UserDto registrationRequest) {
		User user = User.builder()
				.name(registrationRequest.getName())
				.phoneNumber(registrationRequest.getPhoneNumber())
				.password(passwordEncoder.encode(registrationRequest.getPassword()))
				.avatar(registrationRequest.getAvatar())
				.build();
		User savedUser = userRepo.save(user);
		UserDto userDto = entityMapper.mapUerToDtoBasic(savedUser);
		return Response.builder()
				.status(200)
				.message("User successfully add")
				.user(userDto)
				.build();
	}

	@Override
	public Response loginUser(LoginRequest LoginRequest) {
		User user = userRepo.findByAndPhoneNumber(LoginRequest.getPhoneNumber()).orElseThrow(() -> new NotFoundException("PhoneNumber not found"));
		if(!passwordEncoder.matches(LoginRequest.getPassword(),user.getPassword())){
			throw new InvalidCredentialsException("Password does not match");
		}
		String token = jwtUtils.generateToken(user);
		return Response.builder()
				.status(200)
				.message("User successfully Logged In")
				.token(token)
				.expirationTime("6 month")
				.build();
	}

}

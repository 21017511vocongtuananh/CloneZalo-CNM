package com.Chat.Chat.service.Impl;

import com.Chat.Chat.dto.AuthRequest;
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
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

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
				.image(registrationRequest.getImage())
				.createdAt(LocalDateTime.now())
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
	public Response loginUser(AuthRequest authRequest) {
		User user = userRepo.findByAndPhoneNumber(authRequest.getPhoneNumber()).orElseThrow(() -> new NotFoundException("PhoneNumber not found"));
		if(!passwordEncoder.matches(authRequest.getPassword(),user.getPassword())){
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

	@Override
	public User getLoginUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String  phoneNumber = authentication.getName();
		log.info("User phoneNumber is: " + phoneNumber);
		return userRepo.findByAndPhoneNumber(phoneNumber)
				.orElseThrow(()-> new UsernameNotFoundException("User Not found"));
	}

	@Override
	public Response getAllUser() {
		User loggedInUser = getLoginUser();
		log.info("Logged-in user: " + loggedInUser.getPhoneNumber());

		List<UserDto> userDtos = userRepo.findAll(Sort.by(Sort.Direction.DESC, "createdAt"))
				.stream()
				.filter(user -> !user.getPhoneNumber().equals(loggedInUser.getPhoneNumber())) // Loại bỏ user login
				.map(entityMapper::mapUerToDtoBasic)
				.collect(Collectors.toList());

		return Response.builder()
				.status(200)
				.userList(userDtos)
				.build();
	}

	@Override
	public Response getByPhoneNumBer() {
		User loggedInUser = getLoginUser();
		User user = userRepo.findByAndPhoneNumber(loggedInUser.getPhoneNumber())
				.orElseThrow(() -> new NotFoundException("Phone number not found"));
		UserDto userDto = entityMapper.mapUerToDtoBasic(user);
		return Response.builder()
				.status(200)
				.user(userDto)
				.build();
	}

	@Override
	public Response resetPassword(AuthRequest authRequest) {
		User user = userRepo.findByAndPhoneNumber(authRequest.getPhoneNumber()).orElseThrow(() -> new NotFoundException("Not found phone number"));
		user.setPassword(authRequest.getPassword());
		UserDto userDto = entityMapper.mapUerToDtoBasic(user);
		return Response.builder()
				.status(200)
				.user(userDto)
				.build();
	}


}

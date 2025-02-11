package com.Chat.Chat.controller;

import com.Chat.Chat.dto.LoginRequest;
import com.Chat.Chat.dto.Response;
import com.Chat.Chat.dto.UserDto;
import com.Chat.Chat.service.UserService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {
	private final UserService userService;

	@PostMapping("/register")
	public ResponseEntity<Response> registerUser(@RequestBody UserDto registrationRequest){
		System.out.println(registrationRequest);
		return ResponseEntity.ok(userService.registerUser(registrationRequest));
	}

	@PostMapping("/login")
	public ResponseEntity<Response> loginUser(@RequestBody LoginRequest loginRequest)
	{
		return ResponseEntity.ok(userService.loginUser(loginRequest));
	}
}

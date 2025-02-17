package com.Chat.Chat.controller;

import com.Chat.Chat.dto.AuthRequest;
import com.Chat.Chat.dto.Response;
import com.Chat.Chat.model.User;
import com.Chat.Chat.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/users")
@RequiredArgsConstructor
public class UserController {
	private final UserService userService;


	@GetMapping("/get-all")
	public ResponseEntity<Response> getAllUser()
	{
		return ResponseEntity.ok(userService.getAllUser());
	}

	@GetMapping("/get-phone")
	public  ResponseEntity<Response> getPhone(){
		return ResponseEntity.ok(userService.getByPhoneNumBer());
	}

	@PostMapping("/resetPassword")
	public ResponseEntity<Response> resetPassword(@RequestBody AuthRequest authRequest) {
		Response response = userService.resetPassword(authRequest);
		return ResponseEntity.status(200).body(response);
	}

}

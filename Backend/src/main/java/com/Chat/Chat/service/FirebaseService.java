package com.Chat.Chat.service;

import com.google.firebase.auth.FirebaseAuthException;

public interface FirebaseService {
	String verifyToken(String token) throws FirebaseAuthException;
}

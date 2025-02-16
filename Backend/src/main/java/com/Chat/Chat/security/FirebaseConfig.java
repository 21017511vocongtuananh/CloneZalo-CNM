package com.Chat.Chat.security;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.io.InputStream;

@Configuration
public class FirebaseConfig {

	@Value("${firebase.googleCredentials}")
	private String googleCredentialsPath;

	@Bean
	public FirebaseApp firebaseApp() throws IOException {
		InputStream serviceAccount = new ClassPathResource(googleCredentialsPath).getInputStream();

		FirebaseOptions options = FirebaseOptions.builder()
				.setCredentials(GoogleCredentials.fromStream(serviceAccount))
				.build();

		return FirebaseApp.initializeApp(options);
	}
}
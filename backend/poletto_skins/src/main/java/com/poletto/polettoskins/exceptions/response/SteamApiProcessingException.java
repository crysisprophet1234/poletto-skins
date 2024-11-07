package com.poletto.polettoskins.exceptions.response;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class SteamApiProcessingException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public SteamApiProcessingException(String message) {
		super(message);
	}

	public SteamApiProcessingException(String message, Throwable cause) {
		super(message, cause);
	}
}
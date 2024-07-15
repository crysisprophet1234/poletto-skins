package com.poletto.polettoskins.exceptions.handler.response.model;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

public class ExceptionResponse {

	private HttpStatus status;
    private LocalDateTime timestamp;
    private String message;
    private String path;

    public ExceptionResponse(HttpStatus status, String message, String path) {
		this.timestamp = LocalDateTime.now();
		this.status = status;
		this.message = message;
		this.path = path;
	}

	public HttpStatus getStatus() {
		return status;
	}

	public void setStatus(HttpStatus status) {
		this.status = status;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	@Override
	public String toString() {
		return "ExceptionResponse [status=" + status + ", timestamp=" + timestamp + ", message=" + message + ", path=" + path + "]";
	}
	
}

package com.poletto.polettoskins.exceptions.response.model;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonInclude;

public class ExceptionResponse {

	private HttpStatus status;
    private LocalDateTime timestamp;
    private String message;
    private String path;
    
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Map<String, String> errors;
    

    public ExceptionResponse(HttpStatus status, String message, String path) {
		this.timestamp = LocalDateTime.now();
		this.status = status;
		this.message = message;
		this.path = path;
	}
    
    public ExceptionResponse(HttpStatus status, String message, String path, Map<String, String> errors) {
    	this.timestamp = LocalDateTime.now();
        this.status = status;
        this.message = message;
        this.path = path;
        this.errors = errors;
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

	public Map<String, String> getErrors() {
		return errors;
	}

	public void setErrors(Map<String, String> errors) {
		this.errors = errors;
	}

	@Override
	public String toString() {
		return "ExceptionResponse [status=" + status + ", timestamp=" + timestamp + ", message=" + message + ", path=" + path + "]";
	}
	
}

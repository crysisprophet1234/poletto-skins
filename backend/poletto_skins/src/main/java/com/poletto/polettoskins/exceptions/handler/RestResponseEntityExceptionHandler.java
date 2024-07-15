package com.poletto.polettoskins.exceptions.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.poletto.polettoskins.exceptions.handler.response.ResourceNotFound;
import com.poletto.polettoskins.exceptions.handler.response.model.ExceptionResponse;

@RestControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public final ResponseEntity<Object> handleConflict(RuntimeException ex, WebRequest request) {
    	
    	ExceptionResponse exResponse = new ExceptionResponse(
			HttpStatus.INTERNAL_SERVER_ERROR,
			ex.getMessage(),
			request.getDescription(false).replace("uri=", "")
		);
    	
    	return new ResponseEntity<>(exResponse, exResponse.getStatus());
    }
    
    @ExceptionHandler(ResourceNotFound.class)
    protected ResponseEntity<ExceptionResponse> handleResourceNotFound(RuntimeException ex, WebRequest request) {
    	
    	ExceptionResponse exResponse = new ExceptionResponse(
			HttpStatus.NOT_FOUND,
			ex.getMessage(),
			request.getDescription(false).replace("uri=", "")
		);
    	
    	return new ResponseEntity<>(exResponse, exResponse.getStatus());
    }
}
package com.poletto.polettoskins.exceptions.handler;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import com.poletto.polettoskins.exceptions.response.EmailAlreadyInUseException;
import com.poletto.polettoskins.exceptions.response.InsufficientCreditException;
import com.poletto.polettoskins.exceptions.response.ResourceNotFoundException;
import com.poletto.polettoskins.exceptions.response.model.ExceptionResponse;

@RestControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public final ResponseEntity<Object> handleException(RuntimeException ex, WebRequest request) {
    	
    	ExceptionResponse exResponse = new ExceptionResponse(
			HttpStatus.INTERNAL_SERVER_ERROR,
			ex.getMessage(),
			request.getDescription(false).replace("uri=", "")
		);
    	
    	return new ResponseEntity<>(exResponse, exResponse.getStatus());
    }
    
    @ExceptionHandler(ResourceNotFoundException.class)
    protected ResponseEntity<ExceptionResponse> handleResourceNotFoundException(RuntimeException ex, WebRequest request) {
    	
    	ExceptionResponse exResponse = new ExceptionResponse(
			HttpStatus.NOT_FOUND,
			ex.getMessage(),
			request.getDescription(false).replace("uri=", "")
		);
    	
    	return new ResponseEntity<>(exResponse, exResponse.getStatus());
    }
    
    @ExceptionHandler(EmailAlreadyInUseException.class)
    protected ResponseEntity<ExceptionResponse> handleEmailAlreadyInUseException(RuntimeException ex, WebRequest request) {
    	
    	ExceptionResponse exResponse = new ExceptionResponse(
			HttpStatus.CONFLICT,
			ex.getMessage(),
			request.getDescription(false).replace("uri=", "")
		);
    	
    	return new ResponseEntity<>(exResponse, exResponse.getStatus());
    }
    
    @ExceptionHandler(InsufficientCreditException.class)
    protected ResponseEntity<ExceptionResponse> handleInsufficientCreditException(RuntimeException ex, WebRequest request) {
    	
    	ExceptionResponse exResponse = new ExceptionResponse(
			HttpStatus.BAD_REQUEST,
			ex.getMessage(),
			request.getDescription(false).replace("uri=", "")
		);
    	
    	return new ResponseEntity<>(exResponse, exResponse.getStatus());
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));

        ExceptionResponse exResponse = new ExceptionResponse(
            HttpStatus.UNPROCESSABLE_ENTITY,
            "Validation failed",
            request.getDescription(false).replace("uri=", ""),
            errors
        );

        return new ResponseEntity<>(exResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    
    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    	
    	String errorMessage = "Failed to parse request body";
    	
    	if (ex.getCause() instanceof InvalidFormatException) {
            InvalidFormatException invalidFormatException = (InvalidFormatException) ex.getCause();
            if (invalidFormatException.getTargetType().isEnum()) {
                Class<?> enumType = invalidFormatException.getTargetType();
                Object[] enumConstants = enumType.getEnumConstants();

                errorMessage = String.format("Invalid value '%s' for enum type %s. Accepted values are: %s",
	                invalidFormatException.getValue(),
	                enumType.getSimpleName(),
	                Arrays.toString(enumConstants)
                );

            }
        }
    	
    	ExceptionResponse exResponse = new ExceptionResponse(
			HttpStatus.BAD_REQUEST,
			errorMessage,
			request.getDescription(false).replace("uri=", "")
		);
        	
        return new ResponseEntity<>(exResponse, exResponse.getStatus());
        	
    }

}
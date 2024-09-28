package com.poletto.polettoskins.exceptions.response;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InsufficientCreditException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public InsufficientCreditException(String msg) {
        super(msg);
    }
}

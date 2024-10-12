package com.poletto.polettoskins.exceptions.response;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
public class ListingNoLongerActiveException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
	public ListingNoLongerActiveException(String msg) {
		super(msg);
	}

}
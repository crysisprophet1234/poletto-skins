package com.poletto.polettoskins.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.poletto.polettoskins.dto.TransactionDto;
import com.poletto.polettoskins.services.TransactionService;

@RestController
@RequestMapping("/transactions")
public class TransactionController {
	
	@Autowired
	private TransactionService transactionService;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public TransactionDto createTransaction(@RequestBody TransactionDto transactionDto) {
		return transactionService.createTransaction(transactionDto);
	}
	
}

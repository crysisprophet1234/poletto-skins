package com.poletto.polettoskins.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.poletto.polettoskins.dto.TransactionDto;

@Service
public interface TransactionService {
	
	@Transactional(readOnly = true)
	List<TransactionDto> getUserTransactions(String userId);
	
	@Transactional(readOnly = true)
	TransactionDto createTransaction(TransactionDto transactionDto);

}
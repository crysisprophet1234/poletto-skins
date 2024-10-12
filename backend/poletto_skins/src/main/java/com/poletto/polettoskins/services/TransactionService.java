package com.poletto.polettoskins.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.poletto.polettoskins.dto.TransactionDTO;

@Service
public interface TransactionService {
	
	@Transactional(readOnly = true)
	List<TransactionDTO> getUserTransactions(String userId);
	
	@Transactional(readOnly = true)
	TransactionDTO checkoutCart(TransactionDTO transactionDto);

}
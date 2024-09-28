package com.poletto.polettoskins.services.impl;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poletto.polettoskins.dto.TransactionDto;
import com.poletto.polettoskins.dto.TransactionItemDto;
import com.poletto.polettoskins.entities.DomainUser;
import com.poletto.polettoskins.entities.Transaction;
import com.poletto.polettoskins.entities.enums.TransactionType;
import com.poletto.polettoskins.exceptions.response.InsufficientCreditException;
import com.poletto.polettoskins.exceptions.response.ResourceNotFoundException;
import com.poletto.polettoskins.mappers.TransactionMapper;
import com.poletto.polettoskins.repositories.DomainUserRepository;
import com.poletto.polettoskins.repositories.TransactionRepository;
import com.poletto.polettoskins.services.TransactionService;

@Service
public class TransactionServiceImpl implements TransactionService {
	
	@Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private DomainUserRepository domainUserRepository;
    
    @Override
	public List<TransactionDto> getUserTransactions(String userId) {
    	
    	 List<Transaction> transactions = transactionRepository.findByUserId(userId);
    	 
         return transactions.stream()
                 .map(TransactionMapper.INSTANCE::toTransactionDto)
                 .collect(Collectors.toList());
	}

    @Override
    public TransactionDto createTransaction(TransactionDto transactionDto) {

        transactionDto.setDate(LocalDateTime.now());

        DomainUser user = domainUserRepository.findById(transactionDto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User id provided doesn't exist: " + transactionDto.getUserId()));

        BigDecimal transactionTotal = calculateTransactionTotal(transactionDto);

        transactionDto.setTotalValue(transactionTotal);

        validateUserBalance(transactionDto, user);

        Transaction createdTransaction = transactionRepository.save(TransactionMapper.INSTANCE.toTransaction(transactionDto));

        updateUserBalance(user, transactionTotal, transactionDto.getTransactionType());

        return TransactionMapper.INSTANCE.toTransactionDto(createdTransaction);
    }

    private BigDecimal calculateTransactionTotal(TransactionDto transactionDto) {
    	
        return transactionDto.getItems().stream()
                .map(TransactionItemDto::getValue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private void validateUserBalance(TransactionDto transactionDto, DomainUser user) {
    	
        if (transactionDto.getTransactionType() == TransactionType.PURCHASE 
         && user.getBalance().compareTo(transactionDto.getTotalValue()) < 0
         ) {
            throw new InsufficientCreditException("User does not have sufficient credit for this transaction.");
        }
    }

    private void updateUserBalance(DomainUser user, BigDecimal transactionTotal, TransactionType transactionType) {
    	
        BigDecimal balanceChange = transactionType == TransactionType.PURCHASE ? transactionTotal.negate() : transactionTotal;
        user.setBalance(user.getBalance().add(balanceChange));
        domainUserRepository.save(user);
    }
    
}
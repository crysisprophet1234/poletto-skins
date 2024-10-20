package com.poletto.polettoskins.services;

import java.math.BigDecimal;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.poletto.polettoskins.dto.BalanceChangeDTO;
import com.poletto.polettoskins.entities.DomainUser;
import com.poletto.polettoskins.entities.enums.BalanceChangeType;

@Service
public interface BalanceService {
	
	@Transactional
	BalanceChangeDTO addFunds(BalanceChangeDTO balanceChange);
	
	@Transactional
	void updateUserBalance(DomainUser user, BigDecimal amount, BalanceChangeType balanceChangeType);

}
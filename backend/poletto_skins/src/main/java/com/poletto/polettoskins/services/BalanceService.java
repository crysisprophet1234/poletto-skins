package com.poletto.polettoskins.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.poletto.polettoskins.dto.BalanceChangeDTO;

@Service
public interface BalanceService {
	
	@Transactional
	BalanceChangeDTO deposit(BalanceChangeDTO balanceChange);

}

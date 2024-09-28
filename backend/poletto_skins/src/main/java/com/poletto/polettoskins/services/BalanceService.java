package com.poletto.polettoskins.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.poletto.polettoskins.dto.BalanceChangeDto;

@Service
public interface BalanceService {
	
	@Transactional
	BalanceChangeDto deposit(BalanceChangeDto balanceChange);

}

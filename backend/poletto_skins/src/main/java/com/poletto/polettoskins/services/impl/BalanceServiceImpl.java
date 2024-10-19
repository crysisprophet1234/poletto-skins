package com.poletto.polettoskins.services.impl;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poletto.polettoskins.dto.BalanceChangeDTO;
import com.poletto.polettoskins.entities.BalanceChange;
import com.poletto.polettoskins.entities.DomainUser;
import com.poletto.polettoskins.entities.enums.BalanceChangeType;
import com.poletto.polettoskins.exceptions.response.ResourceNotFoundException;
import com.poletto.polettoskins.mappers.BalanceChangeMapper;
import com.poletto.polettoskins.repositories.BalanceRepository;
import com.poletto.polettoskins.repositories.DomainUserRepository;
import com.poletto.polettoskins.services.BalanceService;

@Service
public class BalanceServiceImpl implements BalanceService {
	
	@Autowired
	private BalanceRepository balanceRepository;
	
	@Autowired
    private DomainUserRepository domainUserRepository;

	@Override
	public BalanceChangeDTO addFunds(BalanceChangeDTO balanceChangeDto) {
		
		DomainUser user = domainUserRepository.findById(balanceChangeDto.getUser().getId())
	            .orElseThrow(() -> new ResourceNotFoundException("User id provided not found"));
		
		updateUserBalance(user, balanceChangeDto.getAmount(), balanceChangeDto.getType());
		
		BalanceChange balanceChange = createBalanceChange(balanceChangeDto, user);
	    balanceRepository.save(balanceChange);
	    
        return BalanceChangeMapper.INSTANCE.toBalanceChangeDto(balanceChange);
	}
	
	@Override
	public void updateUserBalance(DomainUser user, BigDecimal amount, BalanceChangeType balanceChangeType) {
		
		BigDecimal newBalance = null;
		
		if (balanceChangeType.equals(BalanceChangeType.DEPOSIT) || balanceChangeType.equals(BalanceChangeType.SELLING)) {
			newBalance = user.getBalance().add(amount);
		}
		
		if (balanceChangeType.equals(BalanceChangeType.WITHDRAWAL) || balanceChangeType.equals(BalanceChangeType.PURCHASE)) {
			newBalance = user.getBalance().subtract(amount);
		}
		
		user.setBalance(newBalance);
		
		user = domainUserRepository.save(user);

	}
	
	private BalanceChange createBalanceChange(BalanceChangeDTO balanceChangeDto, DomainUser user) {
	    BalanceChange balanceChange = BalanceChangeMapper.INSTANCE.toBalanceChange(balanceChangeDto);
	    balanceChange.setTimestamp(LocalDateTime.now());
	    balanceChange.setUser(user);
	    return balanceChange;
	}
	
}
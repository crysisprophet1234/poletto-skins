package com.poletto.polettoskins.services.impl;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poletto.polettoskins.dto.BalanceChangeDTO;
import com.poletto.polettoskins.entities.BalanceChange;
import com.poletto.polettoskins.entities.DomainUser;
import com.poletto.polettoskins.entities.enums.BalanceChangeType;
import com.poletto.polettoskins.exceptions.response.ResourceNotFoundException;
import com.poletto.polettoskins.mappers.BalanceMapper;
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
	public BalanceChangeDTO deposit(BalanceChangeDTO balanceChangeDto) {
		
		DomainUser user = domainUserRepository.findById(balanceChangeDto.getUserId())
	            .orElseThrow(() -> new ResourceNotFoundException("User id provided not found"));
		
		BalanceChange balanceChange = BalanceMapper.INSTANCE.toBalanceChange(balanceChangeDto);
		
		balanceChange.setTimestamp(LocalDateTime.now());
		
		balanceChange.setType(BalanceChangeType.DEPOSIT);
		
		balanceChange = balanceRepository.save(balanceChange);
		
		user.setBalance(user.getBalance().add(balanceChange.getAmount()));
		
        domainUserRepository.save(user);
        
        return BalanceMapper.INSTANCE.toBalanceChangeDto(balanceChange);

	}

}

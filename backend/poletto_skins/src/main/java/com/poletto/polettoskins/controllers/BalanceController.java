package com.poletto.polettoskins.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poletto.polettoskins.dto.BalanceChangeDTO;
import com.poletto.polettoskins.services.BalanceService;

@RestController
@RequestMapping("/balance")
public class BalanceController {

	@Autowired
	private BalanceService balanceService;

	@PostMapping("/deposit")
	public BalanceChangeDTO deposit(@RequestBody BalanceChangeDTO balanceChange) {
		return balanceService.deposit(balanceChange);
	}
	
}
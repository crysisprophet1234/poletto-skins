package com.poletto.polettoskins.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poletto.polettoskins.dto.DomainUserDTO;
import com.poletto.polettoskins.dto.TransactionDTO;
import com.poletto.polettoskins.services.DomainUserService;
import com.poletto.polettoskins.services.TransactionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
public class DomainUserController {

	@Autowired
	private DomainUserService domainUserService;
	
	@Autowired
	private TransactionService transactionService;

	@GetMapping("/{userId}")
	public DomainUserDTO getUserById(@PathVariable String userId) {
		return domainUserService.findUserById(userId);
	}

	@GetMapping("/steam/{steamId}")
	public DomainUserDTO getUserBySteamId(@PathVariable String steamId) {
		return domainUserService.findOrRegisterUserBySteamId(steamId);
	}
	
	@GetMapping("/{userId}/transactions")
	public List<TransactionDTO> getUserTransactions(@PathVariable String userId) {
		return transactionService.getUserTransactions(userId);
	}
	
	//TODO: obviously in the future this should send an actual email for validation
	@PutMapping("/{userId}/email")
	public ResponseEntity<DomainUserDTO> updateEmail(@PathVariable String userId, @RequestBody @Valid DomainUserDTO domainUserDto) {
		domainUserDto = domainUserService.updateEmail(userId, domainUserDto);
		return ResponseEntity.ok(domainUserDto);
	}

}
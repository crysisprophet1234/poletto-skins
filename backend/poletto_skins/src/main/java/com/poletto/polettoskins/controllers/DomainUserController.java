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

import com.poletto.polettoskins.dto.DomainUserDto;
import com.poletto.polettoskins.dto.TransactionDto;
import com.poletto.polettoskins.entities.SteamItem;
import com.poletto.polettoskins.services.DomainUserService;
import com.poletto.polettoskins.services.SteamService;
import com.poletto.polettoskins.services.TransactionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
public class DomainUserController {

	@Autowired
	private DomainUserService domainUserService;

	@Autowired
	private SteamService steamService;
	
	@Autowired
	private TransactionService transactionService;

	@GetMapping("/{userId}")
	public DomainUserDto getUserById(@PathVariable String userId) {
		return domainUserService.findUserById(userId);
	}

	@GetMapping("/steam/{steamId}")
	public DomainUserDto getUserBySteamId(@PathVariable String steamId) {
		return domainUserService.findOrRegisterUserBySteamId(steamId);
	}

	@GetMapping("/steam/{steamId}/inventory")
	public List<SteamItem> getPlayerInventory(@PathVariable String steamId) {
		return steamService.getUserInventory(steamId);
	}
	
	@GetMapping("/{userId}/transactions")
	public List<TransactionDto> getUserTransactions(@PathVariable String userId) {
		return transactionService.getUserTransactions(userId);
	}
	
	//TODO: obviously in the future this should send an actual email for validation
	@PutMapping("/{userId}/email")
	public ResponseEntity<DomainUserDto> updateEmail(@PathVariable String userId, @RequestBody @Valid DomainUserDto domainUserDto) {
		domainUserDto = domainUserService.updateEmail(userId, domainUserDto);
		return ResponseEntity.ok(domainUserDto);
	}

}
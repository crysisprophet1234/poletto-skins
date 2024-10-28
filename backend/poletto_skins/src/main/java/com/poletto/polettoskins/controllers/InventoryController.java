package com.poletto.polettoskins.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.poletto.polettoskins.entities.Inventory;
import com.poletto.polettoskins.services.InventoryService;

@RestController
@RequestMapping("/inventory")
public class InventoryController {
	
	@Autowired
	private InventoryService inventoryService;
	
	@GetMapping
	public ResponseEntity<Inventory> getInventoryBySteamId(@RequestParam("steamId") String steamId) {
		
		Inventory inventory = inventoryService.getUserInventory(steamId);
		
		return ResponseEntity.ok(inventory);
		
	}

}
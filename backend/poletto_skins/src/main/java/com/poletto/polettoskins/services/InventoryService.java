package com.poletto.polettoskins.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.poletto.polettoskins.entities.Inventory;

@Service
public interface InventoryService {
	
	@Transactional(readOnly = true)
	Inventory getUserInventory(String steamId);

}
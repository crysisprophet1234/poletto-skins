package com.poletto.polettoskins.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.poletto.polettoskins.dto.InventoryDTO;
import com.poletto.polettoskins.entities.enums.SteamWebInventorySortType;

@Service
public interface InventoryService {
	
	@Transactional(readOnly = true)
	InventoryDTO getUserInventory(
		String steamId,
		int size,
		int page,
		SteamWebInventorySortType sort,
		boolean filterListed
	);

}
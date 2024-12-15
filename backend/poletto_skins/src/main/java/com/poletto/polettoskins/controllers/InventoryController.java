package com.poletto.polettoskins.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.poletto.polettoskins.dto.InventoryDTO;
import com.poletto.polettoskins.entities.enums.SteamWebInventorySortType;
import com.poletto.polettoskins.services.InventoryService;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

@RestController
@Validated
@RequestMapping("/inventory")
public class InventoryController {
	
	@Autowired
	private InventoryService inventoryService;
	
	@GetMapping
	public ResponseEntity<InventoryDTO> getInventoryBySteamId(
			
		@RequestParam(required = true) 
        @NotBlank(message = "Steam ID cannot be blank")
		String steamId,
		
		@RequestParam(defaultValue = "12")
        @Min(value = 6, message = "Page size must be greater than 0")
		@Max(value = 24, message = "Page size maximum value is 24")
		Integer size,
		
		@RequestParam(defaultValue = "1")
        @Min(value = 1, message = "Page number must be greater than 0") 
		Integer page,
		
		@RequestParam(defaultValue = "PRICE_MAX")
		SteamWebInventorySortType sort,
		
		@RequestParam(defaultValue = "false") 
		Boolean filterListed
	) {
		
		return ResponseEntity.ok(
            inventoryService.getUserInventory(steamId, size, page, sort, filterListed)
        );
		
	}

}
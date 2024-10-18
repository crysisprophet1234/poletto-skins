package com.poletto.polettoskins.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poletto.polettoskins.entities.SteamItem;
import com.poletto.polettoskins.entities.SteamItemPrice;
import com.poletto.polettoskins.exceptions.response.ResourceNotFoundException;
import com.poletto.polettoskins.services.impl.SteamServiceImpl;

@RestController
@RequestMapping("/items")
public class ItemController {
	
	@Autowired
	private SteamServiceImpl steamService;
	
	@GetMapping("/{itemSteamId}")
	public SteamItem getItemBySteamId(@PathVariable String itemSteamId) {
		return steamService.getItemBySteamId(itemSteamId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid item or item name not found."));
	}
	
	@Deprecated
	@GetMapping("/{itemSteamId}/market-price")
	public SteamItemPrice getSteamItemPrice(@PathVariable String itemSteamId) {
		return steamService.getItemPriceBySteamId(itemSteamId);
	}

}

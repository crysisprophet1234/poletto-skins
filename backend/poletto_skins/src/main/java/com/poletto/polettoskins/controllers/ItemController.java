package com.poletto.polettoskins.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.poletto.polettoskins.entities.SteamItemPrice;
import com.poletto.polettoskins.services.impl.SteamServiceImpl;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@RestController
@Validated
@RequestMapping("/items")
public class ItemController {
	
	@Autowired
	private SteamServiceImpl steamService;
	
	@Deprecated
	@GetMapping("/market-price")
	public SteamItemPrice findSteamItemPriceByName(
        @RequestParam 
        @NotBlank 
        @Size(min = 3, max = 100) 
        String itemName
    ) {
	    return steamService.findSteamItemPriceByName(itemName);
	}

}
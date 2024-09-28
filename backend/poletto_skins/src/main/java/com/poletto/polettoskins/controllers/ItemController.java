package com.poletto.polettoskins.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.poletto.polettoskins.entities.SteamItem;
import com.poletto.polettoskins.entities.SteamItemPrice;
import com.poletto.polettoskins.services.impl.SteamServiceImpl;

@RestController
@RequestMapping("/items")
public class ItemController {
	
	@Autowired
	private SteamServiceImpl steamService;
	
	@GetMapping("/search")
    public Page<SteamItem> getPagedItems(
    		@RequestParam(required = false, defaultValue = "") String query,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return steamService.getItemsPaged(pageable, query);
    }
	
	@GetMapping("/{itemSteamId}")
	public SteamItem getItemBySteamId(@PathVariable String itemSteamId) {
		return steamService.getItemBySteamId(itemSteamId);
	}
	
	@GetMapping("/{itemSteamId}/market-price")
	public SteamItemPrice getSteamItemPrice(@PathVariable String itemSteamId) {
		return steamService.getItemPriceBySteamId(itemSteamId);
	}
	
	@PostMapping("/sync/{steamUserId}")
	public ResponseEntity<Void> syncItems(@PathVariable String steamUserId) {
		steamService.syncItems(steamUserId);
		return ResponseEntity.ok().build();
	}

}

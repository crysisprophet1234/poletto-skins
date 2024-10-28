package com.poletto.polettoskins.services.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poletto.polettoskins.entities.Inventory;
import com.poletto.polettoskins.entities.MarketItem;
import com.poletto.polettoskins.entities.SteamItem;
import com.poletto.polettoskins.entities.SteamItemPrice;
import com.poletto.polettoskins.repositories.ListingRepository;
import com.poletto.polettoskins.services.CSFloatService;
import com.poletto.polettoskins.services.InventoryService;
import com.poletto.polettoskins.services.SteamService;
import com.poletto.polettoskins.services.TradeItService;

@Service
public class InventoryServiceImpl implements InventoryService {
	
	@Autowired
	private TradeItService tradeItService;
	
	@Autowired
	private CSFloatService csFloatService;
	
	@Autowired
	private SteamService steamService;
	
	@Autowired
	private ListingRepository listingRepository;

	@Override
	public Inventory getUserInventory(String steamId) {
		
		List<SteamItem> userItems = tradeItService.fetchInventoryBySteamId(steamId);
		
		List<SteamItem> updatedItems = new ArrayList<>();
		
		for (SteamItem item : userItems) {
			
			//TODO: specific ex
			SteamItem updatedItem = csFloatService.findItemByInspectUrl(item.getInspectUrl())
					.orElseThrow(() -> new RuntimeException());
			
			updatedItem.setInspectUrl(item.getInspectUrl());
			updatedItem.setImageUrl(item.getImageUrl());
			
			updatedItems.add(updatedItem);
			
		}
		
		updatedItems = filterUnlistedItems(updatedItems);
		
		List<MarketItem> marketItems = new ArrayList<>();
		
		for (SteamItem item: updatedItems) {
			
			SteamItemPrice price = steamService.getItemPriceBySteamId(item.getFullItemName());
			
			var marketItem = new MarketItem(item, price);
			
			marketItems.add(marketItem);
			
		}
		
		BigDecimal totalPrice = marketItems.stream()
		    .map(MarketItem::getMedianPrice)
		    .reduce(BigDecimal.ZERO, BigDecimal::add);
		
		Inventory inventory = new Inventory();
		inventory.setSteamId(steamId);
		inventory.setItemCount(marketItems.size());
		inventory.setTotalSteamPrice(totalPrice);
		inventory.setItems(marketItems);
		
		return inventory;
	}
	
	private List<SteamItem> filterUnlistedItems(List<SteamItem> steamItems) {

        List<String> assetIds = steamItems.stream()
            .map(SteamItem::getAssetId)
            .collect(Collectors.toList());

        List<String> listedAssetIds = listingRepository.findAllByAssetIdIn(assetIds).stream()
            .map(x -> x.getItem().getAssetId())
            .collect(Collectors.toList());

        return steamItems.stream()
            .filter(item -> !listedAssetIds.contains(item.getAssetId()))
            .collect(Collectors.toList());
    }

}
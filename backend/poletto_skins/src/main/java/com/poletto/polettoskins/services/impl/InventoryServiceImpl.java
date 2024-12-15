package com.poletto.polettoskins.services.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poletto.polettoskins.dto.InventoryDTO;
import com.poletto.polettoskins.entities.MarketItem;
import com.poletto.polettoskins.entities.SteamItem;
import com.poletto.polettoskins.entities.SteamItemPrice;
import com.poletto.polettoskins.entities.SteamSticker;
import com.poletto.polettoskins.entities.enums.SteamWebInventorySortType;
import com.poletto.polettoskins.repositories.ListingRepository;
import com.poletto.polettoskins.services.CSFloatService;
import com.poletto.polettoskins.services.InventoryService;
import com.poletto.polettoskins.services.SteamWebService;

@Service
public class InventoryServiceImpl implements InventoryService {

    private static final Logger logger = LoggerFactory.getLogger(InventoryServiceImpl.class);
    
    @Autowired
    private SteamWebService steamWebService;
	
	@Autowired
	private CSFloatService csFloatService;
	
	@Autowired
	private ListingRepository listingRepository;

    @Override
    public InventoryDTO getUserInventory(
		String steamId,
		int size,
		int page,
		SteamWebInventorySortType sort,
		boolean filterListed
	) {
    	
        List<MarketItem> userItems = steamWebService.fetchInventoryBySteamId(steamId, page, size, sort);
        
        BigDecimal totalPrice = userItems.stream()
                .map(MarketItem::getMedianPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        InventoryDTO inventory = new InventoryDTO();
        inventory.setSteamId(steamId);
        inventory.setItemCount(userItems.size());
        inventory.setTotalSteamPrice(totalPrice);

        if (filterListed) {
        	userItems = filterUnlistedItems(userItems);
        }

        List<MarketItem> marketItems = userItems.parallelStream()
                .map(this::processMarketItem)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());

        inventory.setItems(marketItems);

        return inventory;
    }

    private Optional<MarketItem> processMarketItem(MarketItem item) {
    	
        try {
        	
            Optional<SteamItem> optionalUpdatedItem = csFloatService.findItemByInspectUrl(item.getInspectUrl());
            
            if (optionalUpdatedItem.isEmpty()) {
                logger.warn("Item not found for inspect URL: {}", item.getInspectUrl());
                return Optional.empty();
            }

            SteamItem updatedItem = optionalUpdatedItem.get();
            updatedItem.setInspectUrl(item.getInspectUrl());
            updatedItem.setImageUrl(item.getImageUrl());

            updateItemStickers(item, updatedItem);

            SteamItemPrice steamItemPrice = new SteamItemPrice(
                    item.getLowestPrice(),
                    item.getMedianPrice(),
                    null
            );

            return Optional.of(new MarketItem(updatedItem, steamItemPrice));

        } catch (Exception e) {
            logger.error("Error processing market item with inspect URL: {}", item.getInspectUrl(), e);
            return Optional.empty();
        }
    }

    private void updateItemStickers(MarketItem item, SteamItem updatedItem) {
    	
    	if (item.getStickers() != null && updatedItem.getStickers() != null) {
    		
    	    List<SteamSticker> updatedStickers = new ArrayList<>();
    	    
    	    Iterator<SteamSticker> updatedItemStickers = updatedItem.getStickers().iterator();
    	    
    	    Iterator<SteamSticker> itemStickers = item.getStickers().iterator();

    	    while (updatedItemStickers.hasNext() && itemStickers.hasNext()) {
    	        SteamSticker sticker = updatedItemStickers.next();
    	        sticker.setImageUrl(itemStickers.next().getImageUrl());
    	        updatedStickers.add(sticker);
    	    }

    	    updatedItem.setStickers(updatedStickers);
    	}
    }

    private List<MarketItem> filterUnlistedItems(List<MarketItem> steamItems) {
    	
        List<String> assetIds = steamItems.stream()
                .map(SteamItem::getAssetId)
                .collect(Collectors.toList());

        Set<String> listedAssetIds = listingRepository.findAllByAssetIdIn(assetIds).stream()
                .map(x -> x.getItem().getAssetId())
                .collect(Collectors.toSet());

        return steamItems.stream()
                .filter(item -> !listedAssetIds.contains(item.getAssetId()))
                .collect(Collectors.toList());
    }
}
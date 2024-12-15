package com.poletto.polettoskins.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.poletto.polettoskins.entities.MarketItem;
import com.poletto.polettoskins.entities.enums.SteamWebInventorySortType;

@Service
public interface SteamWebService {
	
	List<MarketItem> fetchInventoryBySteamId(String steamId, int offset, int limit, SteamWebInventorySortType sort);

}
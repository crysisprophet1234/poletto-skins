package com.poletto.polettoskins.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.poletto.polettoskins.entities.MarketItem;
import com.poletto.polettoskins.entities.SteamItemPrice;
import com.poletto.polettoskins.entities.SteamUser;

@Service
public interface SteamService {

	@Transactional(readOnly = true)
	SteamUser findSteamUserBySteamId(String steamId);
	
	@Transactional(readOnly = true)
	List<MarketItem> findUserInventoryBySteamId(String steamId);
	
	@Transactional(readOnly = true)
	SteamItemPrice findSteamItemPriceByName(String fullItemName);
	
}
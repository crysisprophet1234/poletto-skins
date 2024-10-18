package com.poletto.polettoskins.services;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.poletto.polettoskins.entities.MarketItem;
import com.poletto.polettoskins.entities.SteamItem;
import com.poletto.polettoskins.entities.SteamItemPrice;
import com.poletto.polettoskins.entities.SteamUser;

@Service
public interface SteamService {

	@Transactional(readOnly = true)
	SteamUser getUserInfo(String steamId);
	
	@Transactional(readOnly = true)
	Optional<SteamItem> getItemBySteamId(String itemSteamId);
	
	@Transactional(readOnly = true)
	Page<MarketItem> getUserInventory(String steamId, String startAssetId, Pageable pageable);
	
	@Transactional(readOnly = true)
	SteamItemPrice getItemPriceBySteamId(String fullItemName);
	
}
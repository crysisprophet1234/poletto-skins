package com.poletto.polettoskins.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.poletto.polettoskins.entities.SteamItem;
import com.poletto.polettoskins.entities.SteamItemPrice;
import com.poletto.polettoskins.entities.SteamUser;

@Service
public interface SteamService {

	@Transactional(readOnly = true)
	SteamUser getUserInfo(String steamId);
	
	@Transactional(readOnly = true)
	SteamItem getItemBySteamId(String itemSteamId);
	
	@Transactional(readOnly = true)
	List<SteamItem> getUserInventory(String steamId);
	
	@Transactional(readOnly = true)
	SteamItemPrice getItemPriceBySteamId(String itemSteamId);
}
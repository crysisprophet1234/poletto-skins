package com.poletto.polettoskins.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.poletto.polettoskins.entities.SteamItemPrice;
import com.poletto.polettoskins.entities.SteamUser;

@Service
public interface SteamService {

	@Transactional(readOnly = true)
	SteamUser findSteamUserBySteamId(String steamId);
	
	@Transactional(readOnly = true)
	SteamItemPrice findSteamItemPriceByName(String fullItemName);
	
}
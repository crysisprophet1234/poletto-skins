package com.poletto.polettoskins.services;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.poletto.polettoskins.entities.SteamItem;
import com.poletto.polettoskins.entities.SteamUser;

public interface SteamService {

	@Transactional(readOnly = true)
	SteamUser getUserInfo(String steamId);
	
	@Transactional(readOnly = true)
	List<SteamItem> getUserInventory(String steamId);
}

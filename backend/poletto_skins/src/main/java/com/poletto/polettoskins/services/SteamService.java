package com.poletto.polettoskins.services;

import org.springframework.transaction.annotation.Transactional;

import com.poletto.polettoskins.entities.SteamUser;

public interface SteamService {

	@Transactional(readOnly = true)
	SteamUser getPlayerInfo(String steamId);
}

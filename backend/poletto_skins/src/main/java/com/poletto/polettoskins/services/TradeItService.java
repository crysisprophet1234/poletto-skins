package com.poletto.polettoskins.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.poletto.polettoskins.entities.SteamItem;

@Service
public interface TradeItService {
	
	@Transactional(readOnly = true)
	List<SteamItem> fetchInventoryBySteamId(String steamId);

}
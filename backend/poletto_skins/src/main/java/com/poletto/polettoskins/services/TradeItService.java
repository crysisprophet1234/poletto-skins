package com.poletto.polettoskins.services;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.poletto.polettoskins.entities.MarketItem;

@Service
public interface TradeItService {
	
	@Transactional(readOnly = true)
	List<MarketItem> fetchInventoryBySteamId(String steamId);
	
	@Transactional(readOnly = true)
	BigDecimal convertUsdToBrl(BigDecimal usd);

}
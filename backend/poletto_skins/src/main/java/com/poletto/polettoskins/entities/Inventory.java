package com.poletto.polettoskins.entities;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

public class Inventory {
	
	private String steamId;
    private int itemCount;
    private BigDecimal totalSteamPrice;
    private List<MarketItem> items; 
    
    public Inventory() {}

	public Inventory(
			String steamId,
			int itemCount,
			BigDecimal totalSteamPrice
		) {
		this.steamId = steamId;
		this.itemCount = itemCount;
		this.totalSteamPrice = totalSteamPrice;
	}

	public String getSteamId() {
		return steamId;
	}

	public void setSteamId(String steamId) {
		this.steamId = steamId;
	}

	public int getItemCount() {
		return itemCount;
	}

	public void setItemCount(int itemCount) {
		this.itemCount = itemCount;
	}

	public BigDecimal getTotalSteamPrice() {
		return totalSteamPrice;
	}

	public void setTotalSteamPrice(BigDecimal totalSteamPrice) {
		this.totalSteamPrice = totalSteamPrice;
	}

	public List<MarketItem> getItems() {
		return items;
	}

	public void setItems(List<MarketItem> items) {
		this.items = items;
	}

	@Override
	public int hashCode() {
		return Objects.hash(steamId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Inventory other = (Inventory) obj;
		return Objects.equals(steamId, other.steamId);
	}

	@Override
	public String toString() {
		return "Inventory [steamId=" + steamId + ", itemCount=" + itemCount
				+ ", totalSteamPrice=" + totalSteamPrice + ", items=" + items + "]";
	}
    
}
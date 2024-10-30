package com.poletto.polettoskins.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

import com.poletto.polettoskins.entities.MarketItem;

public class InventoryDTO implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private String steamId;
    private int itemCount;
    private BigDecimal totalSteamPrice;
    private List<MarketItem> items; 
    
    public InventoryDTO() {}

	public InventoryDTO(
		String steamId,
		int itemCount,
		BigDecimal totalSteamPrice,
		List<MarketItem> items
	) {
		this.steamId = steamId;
		this.itemCount = itemCount;
		this.totalSteamPrice = totalSteamPrice;
		this.items = items;
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
		return Objects.hash(itemCount, items, steamId, totalSteamPrice);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		InventoryDTO other = (InventoryDTO) obj;
		return itemCount == other.itemCount && Objects.equals(items, other.items)
				&& Objects.equals(steamId, other.steamId) && Objects.equals(totalSteamPrice, other.totalSteamPrice);
	}

	@Override
	public String toString() {
		return "InventoryDTO [steamId=" + steamId + ", itemCount=" + itemCount + ", totalSteamPrice=" + totalSteamPrice
				+ ", items=" + items + "]";
	}  

}
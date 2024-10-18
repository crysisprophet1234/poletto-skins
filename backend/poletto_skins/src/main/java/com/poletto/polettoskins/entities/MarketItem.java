package com.poletto.polettoskins.entities;

import java.io.Serializable;
import java.util.Objects;

public class MarketItem implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private SteamItem item;
	private SteamItemPrice price;
	
	public MarketItem() {}

	public MarketItem(
		SteamItem item,
		SteamItemPrice price
	) {
		this.item = item;
		this.price = price;
	}

	public SteamItem getItem() {
		return item;
	}

	public void setItem(SteamItem item) {
		this.item = item;
	}

	public SteamItemPrice getPrice() {
		return price;
	}

	public void setPrice(SteamItemPrice price) {
		this.price = price;
	}

	@Override
	public int hashCode() {
		return Objects.hash(item, price);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		MarketItem other = (MarketItem) obj;
		return Objects.equals(item, other.item) && Objects.equals(price, other.price);
	}

	@Override
	public String toString() {
		return "MarketItem [item=" + item + ", price=" + price + "]";
	}

}
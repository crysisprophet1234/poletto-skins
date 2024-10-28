package com.poletto.polettoskins.entities;

import java.io.Serializable;
import java.math.BigDecimal;

public class MarketItem extends SteamItem implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private BigDecimal lowestPrice;
    private BigDecimal medianPrice;
    private Integer quantitySoldLast24Hours;
    
    public MarketItem() {}
    
	public MarketItem(BigDecimal lowestPrice, BigDecimal medianPrice, Integer quantitySoldLast24Hours) {
		this.lowestPrice = lowestPrice;
		this.medianPrice = medianPrice;
		this.quantitySoldLast24Hours = quantitySoldLast24Hours;
	}
	
	public MarketItem(SteamItem item, SteamItemPrice price) {
		super();
        if (item == null) {
            throw new IllegalArgumentException("SteamItem não pode ser nulo");
        }
        this.setItemId(item.getItemId());
        this.setAssetId(item.getAssetId());
        this.setOwnerSteamId(item.getOwnerSteamId());
        this.setD(item.getD());
        this.setMarketId(item.getMarketId());
        this.setOrigin(item.getOrigin());
        this.setQuality(item.getQuality());
        this.setRarity(item.getRarity());
        this.setPaintSeed(item.getPaintSeed());
        this.setDefIndex(item.getDefIndex());
        this.setPaintIndex(item.getPaintIndex());
        this.setFloatId(item.getFloatId());
        this.setFloatValue(item.getFloatValue());
        this.setImageUrl(item.getImageUrl());
        this.setInspectUrl(item.getInspectUrl());
        this.setMin(item.getMin());
        this.setMax(item.getMax());
        this.setWeaponType(item.getWeaponType());
        this.setItemName(item.getItemName());
        this.setRarityName(item.getRarityName());
        this.setQualityName(item.getQualityName());
        this.setOriginName(item.getOriginName());
        this.setWearName(item.getWearName());
        this.setFullItemName(item.getFullItemName());
        this.setStickers(item.getStickers());
        
        if (price == null) {
            throw new IllegalArgumentException("SteamItemPrice não pode ser nulo");
        }
        this.lowestPrice = price.getLowestPrice();
        this.medianPrice = price.getMedianPrice();
        this.quantitySoldLast24Hours = price.getQuantitySoldLast24Hours();
    }

	public BigDecimal getLowestPrice() {
		return lowestPrice;
	}

	public void setLowestPrice(BigDecimal lowestPrice) {
		this.lowestPrice = lowestPrice;
	}

	public BigDecimal getMedianPrice() {
		return medianPrice;
	}

	public void setMedianPrice(BigDecimal medianPrice) {
		this.medianPrice = medianPrice;
	}

	public Integer getQuantitySoldLast24Hours() {
		return quantitySoldLast24Hours;
	}

	public void setQuantitySoldLast24Hours(Integer quantitySoldLast24Hours) {
		this.quantitySoldLast24Hours = quantitySoldLast24Hours;
	}
	
	@Override
	public String toString() {
		return "MarketItem [lowestPrice=" + lowestPrice + ", medianPrice=" + medianPrice + ", quantitySoldLast24Hours="
				+ quantitySoldLast24Hours + "]";
	} 

}
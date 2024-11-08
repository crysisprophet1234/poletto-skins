package com.poletto.polettoskins.entities;

import java.math.BigDecimal;
import java.util.Objects;

public class SteamItemPrice {

    private BigDecimal lowestPrice;
    private BigDecimal medianPrice;
    private Integer volume;

    public SteamItemPrice() {}

    public SteamItemPrice(BigDecimal lowestPrice, BigDecimal medianPrice, Integer volume) {
        this.lowestPrice = lowestPrice;
        this.medianPrice = medianPrice;
        this.volume = volume;
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

    public Integer getVolume() {
        return volume;
    }

    public void setVolume(Integer volume) {
        this.volume = volume;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SteamItemPrice that = (SteamItemPrice) o;
        return Objects.equals(lowestPrice, that.lowestPrice) &&
                Objects.equals(medianPrice, that.medianPrice) &&
                Objects.equals(volume, that.volume);
    }

    @Override
    public int hashCode() {
        return Objects.hash(lowestPrice, medianPrice, volume);
    }

	@Override
	public String toString() {
		return "SteamItemPrice [lowestPrice=" + lowestPrice + ", medianPrice=" + medianPrice
				+ ", volume=" + volume + "]";
	}
    
}
package com.poletto.polettoskins.entities;

import java.math.BigDecimal;
import java.util.Objects;

public class SteamItemPrice {

    private BigDecimal lowestPrice;
    private BigDecimal medianPrice;
    private Integer quantitySoldLast24Hours;

    public SteamItemPrice() {}

    public SteamItemPrice(BigDecimal lowestPrice, BigDecimal medianPrice, Integer quantitySoldLast24Hours) {
        this.lowestPrice = lowestPrice;
        this.medianPrice = medianPrice;
        this.quantitySoldLast24Hours = quantitySoldLast24Hours;
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
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SteamItemPrice that = (SteamItemPrice) o;
        return Objects.equals(lowestPrice, that.lowestPrice) &&
                Objects.equals(medianPrice, that.medianPrice) &&
                Objects.equals(quantitySoldLast24Hours, that.quantitySoldLast24Hours);
    }

    @Override
    public int hashCode() {
        return Objects.hash(lowestPrice, medianPrice, quantitySoldLast24Hours);
    }

	@Override
	public String toString() {
		return "SteamItemPrice [lowestPrice=" + lowestPrice + ", medianPrice=" + medianPrice
				+ ", quantitySoldLast24Hours=" + quantitySoldLast24Hours + "]";
	}
    
}
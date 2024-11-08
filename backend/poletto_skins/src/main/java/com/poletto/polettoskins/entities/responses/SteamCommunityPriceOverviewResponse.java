package com.poletto.polettoskins.entities.responses;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SteamCommunityPriceOverviewResponse {

	private boolean success;

	@JsonProperty("lowest_price")
	private String lowestPrice;

	@JsonProperty("median_price")
	private String medianPrice;

	private String volume;
	
	public SteamCommunityPriceOverviewResponse() {}
	
	public SteamCommunityPriceOverviewResponse(
		boolean success,
		String lowestPrice,
		String medianPrice,
		String volume
	) {
		this.success = success;
		this.lowestPrice = lowestPrice;
		this.medianPrice = medianPrice;
		this.volume = volume;
	}

	public boolean getSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getLowestPrice() {
		return lowestPrice;
	}

	public void setLowestPrice(String lowestPrice) {
		this.lowestPrice = lowestPrice;
	}

	public String getMedianPrice() {
		return medianPrice;
	}

	public void setMedianPrice(String medianPrice) {
		this.medianPrice = medianPrice;
	}

	public String getVolume() {
		return volume;
	}

	public void setVolume(String volume) {
		this.volume = volume;
	}

	@Override
	public String toString() {
		return "SteamCommunityPriceOverviewResponse [" 
				+ "success=" + success 
				+ ", lowestPrice=" + lowestPrice
				+ ", medianPrice=" + medianPrice 
				+ ", volume=" + volume 
				+ "]";
	}

}
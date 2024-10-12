package com.poletto.polettoskins.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Objects;

import com.poletto.polettoskins.entities.SteamItem;
import com.poletto.polettoskins.entities.enums.ListingStatus;

public class ListingDTO implements Serializable {

    private static final long serialVersionUID = 1L;
    
    private String id;
    private LocalDateTime createdOn;
    private String userId;
    private BigDecimal listingPrice;
    private BigDecimal steamPrice;
    private Integer discount;
    private ListingStatus status;
    private Integer viewsCount;
    private Integer favoritesCount;
    private SteamItem item;
    
    public ListingDTO() {}

	public ListingDTO(
			String id,
			LocalDateTime createdOn,
			String userId,
			BigDecimal listingPrice,
			BigDecimal steamPrice,
		    Integer discount,
			ListingStatus status,
			Integer viewsCount,
			Integer favoritesCount,
			SteamItem item
	) {
		this.id = id;
		this.createdOn = createdOn;
		this.userId = userId;
		this.listingPrice = listingPrice;
		this.steamPrice = steamPrice;
		this.discount = discount;
		this.status = status;
		this.viewsCount = viewsCount;
		this.favoritesCount = favoritesCount;
		this.item = item;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public LocalDateTime getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(LocalDateTime createdOn) {
		this.createdOn = createdOn;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public BigDecimal getListingPrice() {
		return listingPrice;
	}

	public void setListingPrice(BigDecimal listingPrice) {
		this.listingPrice = listingPrice;
	}
	
	public BigDecimal getSteamPrice() {
		return steamPrice;
	}

	public void setSteamPrice(BigDecimal steamPrice) {
		this.steamPrice = steamPrice;
	}

	public Integer getDiscount() {
		return discount;
	}

	public void setDiscount(Integer discount) {
		this.discount = discount;
	}

	public ListingStatus getStatus() {
		return status;
	}

	public void setStatus(ListingStatus status) {
		this.status = status;
	}

	public Integer getViewsCount() {
		return viewsCount;
	}

	public void setViewsCount(Integer viewsCount) {
		this.viewsCount = viewsCount;
	}

	public Integer getFavoritesCount() {
		return favoritesCount;
	}

	public void setFavoritesCount(Integer favoritesCount) {
		this.favoritesCount = favoritesCount;
	}

	public SteamItem getItem() {
		return item;
	}

	public void setItem(SteamItem item) {
		this.item = item;
	}

	@Override
	public int hashCode() {
		return Objects.hash(createdOn, id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ListingDTO other = (ListingDTO) obj;
		return Objects.equals(createdOn, other.createdOn) && Objects.equals(id, other.id);
	}

	@Override
	public String toString() {
		return "ListingDTO [id=" + id + ", createdOn=" + createdOn + ", userId=" + userId + ", listingPrice="
				+ listingPrice + ", steamPrice=" + steamPrice + ", discount=" + discount + ", status=" + status
				+ ", viewsCount=" + viewsCount + ", favoritesCount=" + favoritesCount + ", item=" + item + "]";
	}
    
}
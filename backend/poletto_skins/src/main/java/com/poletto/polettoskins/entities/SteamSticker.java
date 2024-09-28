package com.poletto.polettoskins.entities;

import java.io.Serializable;
import java.util.Objects;

public class SteamSticker implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private Integer stickerId;
	private Integer slot;
	private String imageUrl;
    private Double wear;
    private Double scale;
    private Integer rotation;
    private String codename;
    private String material;
    private String name;
    
    public SteamSticker() {}
    
	public SteamSticker(
		Integer stickerId,
		Integer slot,
		String imageUrl,
		Double wear,
		Double scale,
		Integer rotation,
		String codename,
		String material,
		String name
	) {
		this.stickerId = stickerId;
		this.slot = slot;
		this.imageUrl = imageUrl;
		this.wear = wear;	
		this.scale = scale;
		this.rotation = rotation;
		this.codename = codename;
		this.material = material;
		this.name = name;
	}

	public Integer getStickerId() {
		return stickerId;
	}

	public void setStickerId(Integer stickerId) {
		this.stickerId = stickerId;
	}

	public Integer getSlot() {
		return slot;
	}

	public void setSlot(Integer slot) {
		this.slot = slot;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public Double getWear() {
		return wear;
	}

	public void setWear(Double wear) {
		this.wear = wear;
	}

	public Double getScale() {
		return scale;
	}

	public void setScale(Double scale) {
		this.scale = scale;
	}

	public Integer getRotation() {
		return rotation;
	}

	public void setRotation(Integer rotation) {
		this.rotation = rotation;
	}

	public String getCodename() {
		return codename;
	}

	public void setCodename(String codename) {
		this.codename = codename;
	}

	public String getMaterial() {
		return material;
	}

	public void setMaterial(String material) {
		this.material = material;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public int hashCode() {
		return Objects.hash(stickerId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		SteamSticker other = (SteamSticker) obj;
		return stickerId == other.stickerId;
	}

	@Override
	public String toString() {
		return "SteamSticker [stickerId=" + stickerId + ", slot=" + slot + ", imageUrl=" + imageUrl + ", wear=" + wear
				+ ", scale=" + scale + ", rotation=" + rotation + ", codename=" + codename + ", material=" + material
				+ ", name=" + name + "]";
	}

}

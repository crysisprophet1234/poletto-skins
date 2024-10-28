package com.poletto.polettoskins.entities;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonAlias;

@Document(collection = "steam_item")
public class SteamItem implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String itemId;
	
	@JsonAlias("a")
	private String assetId;
	
	@JsonAlias("s")
	private String ownerSteamId;
	
	@JsonAlias("d")
	private String d;
	
	@JsonAlias("m")
	private String marketId;
	
	private Integer origin;
    private Integer quality;
    private Integer rarity;
    
    @JsonAlias("paintseed")
    private Integer paintSeed;
    
    @JsonAlias("defindex")
    private Integer defIndex;
    
    @JsonAlias("paintindex")
    private Integer paintIndex;
    
    @JsonAlias("floatid")
    private String floatId;
    
    @JsonAlias("floatvalue")
    private Double floatValue;
    
    @JsonAlias("imageurl")
    private String imageUrl;
     
    private String inspectUrl;
    private Double min;
    private Double max;
    
    @JsonAlias("weapon_type")
    private String weaponType;
    
    @JsonAlias("item_name")
    private String itemName;
    
    @JsonAlias("rarity_name")
    private String rarityName;
    
    @JsonAlias("quality_name")
    private String qualityName;
    
    @JsonAlias("origin_name")
    private String originName;
    
    @JsonAlias("wear_name")
    private String wearName;
    
    @JsonAlias("full_item_name")
    private String fullItemName;
    
    
    private List<SteamSticker> stickers;
    
    public SteamItem() {}
    
	public SteamItem(
	    String itemId,
		String assetId,
		String ownerSteamId,
		String marketId,
		String d,		
		Integer origin,
		Integer quality,
		Integer rarity,	
		Integer paintSeed,
		Integer defIndex,
		Integer paintIndex,
		String floatId,
		Double floatValue,	
		String imageUrl,
		String inspectUrl,
		Double min,
		Double max,
		String weaponType,
		String itemName,
		String rarityName,
		String qualityName,
		String originName,
		String wearName,
		String fullItemName,
		List<SteamSticker> stickers
	) {
		this.itemId = itemId;
		this.assetId = assetId;
		this.ownerSteamId = ownerSteamId;
		this.marketId = marketId;
		this.d = d;
		this.origin = origin;
		this.quality = quality;
		this.rarity = rarity;
		this.paintSeed = paintSeed;
		this.defIndex = defIndex;
		this.paintIndex = paintIndex;
		this.floatId = floatId;
		this.floatValue = floatValue;
		this.imageUrl = imageUrl;
		this.inspectUrl = inspectUrl;
		this.min = min;
		this.max = max;
		this.weaponType = weaponType;
		this.itemName = itemName;
		this.rarityName = rarityName;
		this.qualityName = qualityName;
		this.originName = originName;
		this.wearName = wearName;
		this.fullItemName = fullItemName;
		this.stickers = stickers;
	}
	
	public String getItemId() {
		return itemId;
	}

	public void setItemId(String itemId) {
		this.itemId = itemId;
	}

	public String getAssetId() {
		return assetId;
	}

	public void setAssetId(String assetId) {
		this.assetId = assetId;
	}
	
	public String getOwnerSteamId() {
		return ownerSteamId;
	}

	public void setOwnerSteamId(String ownerSteamId) {
		this.ownerSteamId = ownerSteamId;
	}

	public String getMarketId() {
		return marketId;
	}

	public void setMarketId(String marketId) {
		this.marketId = marketId;
	}
	

	public String getD() {
		return d;
	}

	public void setD(String d) {
		this.d = d;
	}

	public Integer getOrigin() {
		return origin;
	}

	public void setOrigin(Integer origin) {
		this.origin = origin;
	}

	public Integer getQuality() {
		return quality;
	}

	public void setQuality(Integer quality) {
		this.quality = quality;
	}

	public Integer getRarity() {
		return rarity;
	}

	public void setRarity(Integer rarity) {
		this.rarity = rarity;
	}

	public Integer getPaintSeed() {
		return paintSeed;
	}

	public void setPaintSeed(Integer paintSeed) {
		this.paintSeed = paintSeed;
	}

	public Integer getDefIndex() {
		return defIndex;
	}

	public void setDefIndex(Integer defIndex) {
		this.defIndex = defIndex;
	}

	public Integer getPaintIndex() {
		return paintIndex;
	}

	public void setPaintIndex(Integer paintIndex) {
		this.paintIndex = paintIndex;
	}

	public String getFloatId() {
		return floatId;
	}

	public void setFloatId(String floatId) {
		this.floatId = floatId;
	}

	public Double getFloatValue() {
		return floatValue;
	}

	public void setFloatValue(Double floatValue) {
		this.floatValue = floatValue;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getInspectUrl() {
		return inspectUrl;
	}

	public void setInspectUrl(String inspectUrl) {
		this.inspectUrl = inspectUrl;
	}

	public Double getMin() {
		return min;
	}

	public void setMin(Double min) {
		this.min = min;
	}

	public Double getMax() {
		return max;
	}

	public void setMax(Double max) {
		this.max = max;
	}

	public String getWeaponType() {
		return weaponType;
	}

	public void setWeaponType(String weaponType) {
		this.weaponType = weaponType;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getRarityName() {
		return rarityName;
	}

	public void setRarityName(String rarityName) {
		this.rarityName = rarityName;
	}

	public String getQualityName() {
		return qualityName;
	}

	public void setQualityName(String qualityName) {
		this.qualityName = qualityName;
	}

	public String getOriginName() {
		return originName;
	}

	public void setOriginName(String originName) {
		this.originName = originName;
	}

	public String getWearName() {
		return wearName;
	}

	public void setWearName(String wearName) {
		this.wearName = wearName;
	}

	public String getFullItemName() {
		return fullItemName;
	}

	public void setFullItemName(String fullItemName) {
		this.fullItemName = fullItemName;
	}

	public List<SteamSticker> getStickers() {
		return stickers;
	}

	public void setStickers(List<SteamSticker> stickers) {
		this.stickers = stickers;
	}
	
	public String constructItemId() {
		
		StringBuilder itemId = new StringBuilder();
		
		if (!marketId.equals("0")) {
	        itemId.append("M").append(marketId);
	    }

	    if (!ownerSteamId.equals("0")) {
	        itemId.append("S").append(ownerSteamId);
	    }
		
		itemId.append("A" + assetId);
		
		itemId.append("D" + d);
		
		return itemId.toString();
	}

	@Override
	public int hashCode() {
		return Objects.hash(assetId, d, itemId, marketId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		SteamItem other = (SteamItem) obj;
		return Objects.equals(assetId, other.assetId) && Objects.equals(d, other.d)
				&& Objects.equals(itemId, other.itemId) && Objects.equals(marketId, other.marketId);
	}

	@Override
	public String toString() {
		return "SteamItem [itemId=" + itemId + ", assetId=" + assetId + ", ownerSteamId=" + ownerSteamId + ", d=" + d
				+ ", marketId=" + marketId + ", origin=" + origin + ", quality=" + quality + ", rarity=" + rarity
				+ ", paintSeed=" + paintSeed + ", defIndex=" + defIndex + ", paintIndex=" + paintIndex + ", floatId="
				+ floatId + ", floatValue=" + floatValue
				+ ", imageUrl=" + imageUrl + ", inspectUrl=" + inspectUrl + ", min=" + min + ", max=" + max
				+ ", weaponType=" + weaponType + ", itemName=" + itemName + ", rarityName=" + rarityName
				+ ", qualityName=" + qualityName + ", originName=" + originName + ", wearName=" + wearName
				+ ", fullItemName=" + fullItemName + ", stickers=" + stickers + "]";
	}
    
}
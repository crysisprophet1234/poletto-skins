package com.poletto.polettoskins.entities.responses;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;

public class SteamWebApiInventoryItemResponse {

    @JsonProperty("id")
    private String id;

    @JsonProperty("markethashname")
    private String marketHashName;

    @JsonProperty("marketname")
    private String marketName;

    @JsonProperty("slug")
    private String slug;

    @JsonProperty("count")
    private Integer count;

    @JsonProperty("assetid")
    private String assetId;

    @JsonProperty("classid")
    private String classId;

    @JsonProperty("groupid")
    private String groupId;

    @JsonProperty("instanceid")
    private String instanceId;

    @JsonProperty("nameid")
    private Integer nameId;

    @JsonProperty("pricelatest")
    private Double priceLatest;

    @JsonProperty("pricelatestsell")
    private Double priceLatestSell;

    @JsonProperty("pricemix")
    private Double priceMix;

    @JsonProperty("pricemedian")
    private Double priceMedian;

    @JsonProperty("pricesafe")
    private Double priceSafe;

    @JsonProperty("priceavg")
    private Double priceAvg;

    @JsonProperty("pricemin")
    private Double priceMin;

    @JsonProperty("pricemax")
    private Double priceMax;

    @JsonProperty("priceupdatedat")
    private PriceUpdatedAt priceUpdatedAt;

    @JsonProperty("pricereal")
    private Double priceReal;

    @JsonProperty("pricereal24h")
    private Double priceReal24h;

    @JsonProperty("pricereal7d")
    private Double priceReal7d;

    @JsonProperty("pricereal30d")
    private Double priceReal30d;

    @JsonProperty("pricereal90d")
    private Double priceReal90d;

    @JsonProperty("pricerealchangepercent")
    private Double priceRealChangePercent;

    @JsonProperty("pricerealchangepercent7d")
    private Double priceRealChangePercent7d;

    @JsonProperty("pricerealchangepercent30d")
    private Double priceRealChangePercent30d;

    @JsonProperty("pricerealchangepercent90d")
    private Double priceRealChangePercent90d;

    @JsonProperty("winloss")
    private Double winLoss;

    @JsonProperty("offervolume")
    private Integer offerVolume;

    @JsonProperty("hourstosold")
    private Integer hoursToSold;

    @JsonProperty("sold24h")
    private Integer sold24h;

    @JsonProperty("sold7d")
    private Integer sold7d;

    @JsonProperty("sold30d")
    private Integer sold30d;

    @JsonProperty("sold90d")
    private Integer sold90d;

    @JsonProperty("points")
    private Integer points;

    @JsonProperty("buyorderprice")
    private Double buyOrderPrice;

    @JsonProperty("buyordermedian")
    private Double buyOrderMedian;

    @JsonProperty("buyorderavg")
    private Double buyOrderAvg;

    @JsonProperty("buyordervolume")
    private Integer buyOrderVolume;

    @JsonProperty("nametag")
    private String nameTag;

    @JsonProperty("bordercolor")
    private String borderColor;

    @JsonProperty("color")
    private String color;

    @JsonProperty("quality")
    private String quality;

    @JsonProperty("rarity")
    private String rarity;

    @JsonProperty("image")
    private String image;

    @JsonProperty("marketable")
    private Boolean marketable;

    @JsonProperty("tradable")
    private Boolean tradable;

    @JsonProperty("unstable")
    private Boolean unstable;

    @JsonProperty("unstablereason")
    private String unstableReason;

    @JsonProperty("tags")
    private List<Tag> tags;

    @JsonProperty("descriptions")
    private List<Description> descriptions;

    @JsonProperty("actions")
    private List<Action> actions;

    @JsonProperty("createdat")
    private CreatedAt createdAt;

    @JsonProperty("firstseentime")
    private String firstSeenTime;

    @JsonProperty("inspectlink")
    private String inspectLink;

    @JsonProperty("inspectlinkparsed")
    private InspectLinkParsed inspectLinkParsed;

    @JsonProperty("markettradablerestriction")
    private Integer marketTradableRestriction;

    @JsonProperty("tag1")
    private String tag1;

    @JsonProperty("tag2")
    private String tag2;

    @JsonProperty("tag3")
    private String tag3;

    @JsonProperty("tag4")
    private String tag4;

    @JsonProperty("tag5")
    private String tag5;

    @JsonProperty("tag6")
    private String tag6;

    @JsonProperty("tag7")
    private String tag7;

    @JsonProperty("wear")
    private String wear;

    @JsonProperty("isstar")
    private Boolean isStar;

    @JsonProperty("isstattrak")
    private Boolean isStatTrak;

    @JsonProperty("itemgroup")
    private String itemGroup;

    @JsonProperty("itemname")
    private String itemName;

    @JsonProperty("itemtype")
    private String itemType;

    @JsonProperty("pricelatestsell24h")
    private Double priceLatestSell24h;

    @JsonProperty("pricelatestsell7d")
    private Double priceLatestSell7d;

    @JsonProperty("pricelatestsell30d")
    private Double priceLatestSell30d;

    @JsonProperty("pricelatestsell90d")
    private Double priceLatestSell90d;

    @JsonProperty("pricesafe7d")
    private Double priceSafe7d;

    @JsonProperty("pricesafe24h")
    private Double priceSafe24h;

    @JsonProperty("pricesafe30d")
    private Double priceSafe30d;

    @JsonProperty("pricesafe90d")
    private Double priceSafe90d;

    public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getMarketHashName() {
		return marketHashName;
	}

	public void setMarketHashName(String marketHashName) {
		this.marketHashName = marketHashName;
	}

	public String getMarketName() {
		return marketName;
	}

	public void setMarketName(String marketName) {
		this.marketName = marketName;
	}

	public String getSlug() {
		return slug;
	}

	public void setSlug(String slug) {
		this.slug = slug;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public String getAssetId() {
		return assetId;
	}

	public void setAssetId(String assetId) {
		this.assetId = assetId;
	}

	public String getClassId() {
		return classId;
	}

	public void setClassId(String classId) {
		this.classId = classId;
	}

	public String getGroupId() {
		return groupId;
	}

	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}

	public String getInstanceId() {
		return instanceId;
	}

	public void setInstanceId(String instanceId) {
		this.instanceId = instanceId;
	}

	public Integer getNameId() {
		return nameId;
	}

	public void setNameId(Integer nameId) {
		this.nameId = nameId;
	}

	public Double getPriceLatest() {
		return priceLatest;
	}

	public void setPriceLatest(Double priceLatest) {
		this.priceLatest = priceLatest;
	}

	public Double getPriceLatestSell() {
		return priceLatestSell;
	}

	public void setPriceLatestSell(Double priceLatestSell) {
		this.priceLatestSell = priceLatestSell;
	}

	public Double getPriceMix() {
		return priceMix;
	}

	public void setPriceMix(Double priceMix) {
		this.priceMix = priceMix;
	}

	public Double getPriceMedian() {
		return priceMedian;
	}

	public void setPriceMedian(Double priceMedian) {
		this.priceMedian = priceMedian;
	}

	public Double getPriceSafe() {
		return priceSafe;
	}

	public void setPriceSafe(Double priceSafe) {
		this.priceSafe = priceSafe;
	}

	public Double getPriceAvg() {
		return priceAvg;
	}

	public void setPriceAvg(Double priceAvg) {
		this.priceAvg = priceAvg;
	}

	public Double getPriceMin() {
		return priceMin;
	}

	public void setPriceMin(Double priceMin) {
		this.priceMin = priceMin;
	}

	public Double getPriceMax() {
		return priceMax;
	}

	public void setPriceMax(Double priceMax) {
		this.priceMax = priceMax;
	}

	public PriceUpdatedAt getPriceUpdatedAt() {
		return priceUpdatedAt;
	}

	public void setPriceUpdatedAt(PriceUpdatedAt priceUpdatedAt) {
		this.priceUpdatedAt = priceUpdatedAt;
	}

	public Double getPriceReal() {
		return priceReal;
	}

	public void setPriceReal(Double priceReal) {
		this.priceReal = priceReal;
	}

	public Double getPriceReal24h() {
		return priceReal24h;
	}

	public void setPriceReal24h(Double priceReal24h) {
		this.priceReal24h = priceReal24h;
	}

	public Double getPriceReal7d() {
		return priceReal7d;
	}

	public void setPriceReal7d(Double priceReal7d) {
		this.priceReal7d = priceReal7d;
	}

	public Double getPriceReal30d() {
		return priceReal30d;
	}

	public void setPriceReal30d(Double priceReal30d) {
		this.priceReal30d = priceReal30d;
	}

	public Double getPriceReal90d() {
		return priceReal90d;
	}

	public void setPriceReal90d(Double priceReal90d) {
		this.priceReal90d = priceReal90d;
	}

	public Double getPriceRealChangePercent() {
		return priceRealChangePercent;
	}

	public void setPriceRealChangePercent(Double priceRealChangePercent) {
		this.priceRealChangePercent = priceRealChangePercent;
	}

	public Double getPriceRealChangePercent7d() {
		return priceRealChangePercent7d;
	}

	public void setPriceRealChangePercent7d(Double priceRealChangePercent7d) {
		this.priceRealChangePercent7d = priceRealChangePercent7d;
	}

	public Double getPriceRealChangePercent30d() {
		return priceRealChangePercent30d;
	}

	public void setPriceRealChangePercent30d(Double priceRealChangePercent30d) {
		this.priceRealChangePercent30d = priceRealChangePercent30d;
	}

	public Double getPriceRealChangePercent90d() {
		return priceRealChangePercent90d;
	}

	public void setPriceRealChangePercent90d(Double priceRealChangePercent90d) {
		this.priceRealChangePercent90d = priceRealChangePercent90d;
	}

	public Double getWinLoss() {
		return winLoss;
	}

	public void setWinLoss(Double winLoss) {
		this.winLoss = winLoss;
	}

	public Integer getOfferVolume() {
		return offerVolume;
	}

	public void setOfferVolume(Integer offerVolume) {
		this.offerVolume = offerVolume;
	}

	public Integer getHoursToSold() {
		return hoursToSold;
	}

	public void setHoursToSold(Integer hoursToSold) {
		this.hoursToSold = hoursToSold;
	}

	public Integer getSold24h() {
		return sold24h;
	}

	public void setSold24h(Integer sold24h) {
		this.sold24h = sold24h;
	}

	public Integer getSold7d() {
		return sold7d;
	}

	public void setSold7d(Integer sold7d) {
		this.sold7d = sold7d;
	}

	public Integer getSold30d() {
		return sold30d;
	}

	public void setSold30d(Integer sold30d) {
		this.sold30d = sold30d;
	}

	public Integer getSold90d() {
		return sold90d;
	}

	public void setSold90d(Integer sold90d) {
		this.sold90d = sold90d;
	}

	public Integer getPoints() {
		return points;
	}

	public void setPoints(Integer points) {
		this.points = points;
	}

	public Double getBuyOrderPrice() {
		return buyOrderPrice;
	}

	public void setBuyOrderPrice(Double buyOrderPrice) {
		this.buyOrderPrice = buyOrderPrice;
	}

	public Double getBuyOrderMedian() {
		return buyOrderMedian;
	}

	public void setBuyOrderMedian(Double buyOrderMedian) {
		this.buyOrderMedian = buyOrderMedian;
	}

	public Double getBuyOrderAvg() {
		return buyOrderAvg;
	}

	public void setBuyOrderAvg(Double buyOrderAvg) {
		this.buyOrderAvg = buyOrderAvg;
	}

	public Integer getBuyOrderVolume() {
		return buyOrderVolume;
	}

	public void setBuyOrderVolume(Integer buyOrderVolume) {
		this.buyOrderVolume = buyOrderVolume;
	}

	public String getNameTag() {
		return nameTag;
	}

	public void setNameTag(String nameTag) {
		this.nameTag = nameTag;
	}

	public String getBorderColor() {
		return borderColor;
	}

	public void setBorderColor(String borderColor) {
		this.borderColor = borderColor;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getQuality() {
		return quality;
	}

	public void setQuality(String quality) {
		this.quality = quality;
	}

	public String getRarity() {
		return rarity;
	}

	public void setRarity(String rarity) {
		this.rarity = rarity;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Boolean getMarketable() {
		return marketable;
	}

	public void setMarketable(Boolean marketable) {
		this.marketable = marketable;
	}

	public Boolean getTradable() {
		return tradable;
	}

	public void setTradable(Boolean tradable) {
		this.tradable = tradable;
	}

	public Boolean getUnstable() {
		return unstable;
	}

	public void setUnstable(Boolean unstable) {
		this.unstable = unstable;
	}

	public String getUnstableReason() {
		return unstableReason;
	}

	public void setUnstableReason(String unstableReason) {
		this.unstableReason = unstableReason;
	}

	public List<Tag> getTags() {
		return tags;
	}

	public void setTags(List<Tag> tags) {
		this.tags = tags;
	}

	public List<Description> getDescriptions() {
		return descriptions;
	}

	public void setDescriptions(List<Description> descriptions) {
		this.descriptions = descriptions;
	}

	public List<Action> getActions() {
		return actions;
	}

	public void setActions(List<Action> actions) {
		this.actions = actions;
	}

	public CreatedAt getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(CreatedAt createdAt) {
		this.createdAt = createdAt;
	}

	public String getFirstSeenTime() {
		return firstSeenTime;
	}

	public void setFirstSeenTime(String firstSeenTime) {
		this.firstSeenTime = firstSeenTime;
	}

	public String getInspectLink() {
		return inspectLink;
	}

	public void setInspectLink(String inspectLink) {
		this.inspectLink = inspectLink;
	}

	public InspectLinkParsed getInspectLinkParsed() {
		return inspectLinkParsed;
	}

	public void setInspectLinkParsed(InspectLinkParsed inspectLinkParsed) {
		this.inspectLinkParsed = inspectLinkParsed;
	}

	public Integer getMarketTradableRestriction() {
		return marketTradableRestriction;
	}

	public void setMarketTradableRestriction(Integer marketTradableRestriction) {
		this.marketTradableRestriction = marketTradableRestriction;
	}

	public String getTag1() {
		return tag1;
	}

	public void setTag1(String tag1) {
		this.tag1 = tag1;
	}

	public String getTag2() {
		return tag2;
	}

	public void setTag2(String tag2) {
		this.tag2 = tag2;
	}

	public String getTag3() {
		return tag3;
	}

	public void setTag3(String tag3) {
		this.tag3 = tag3;
	}

	public String getTag4() {
		return tag4;
	}

	public void setTag4(String tag4) {
		this.tag4 = tag4;
	}

	public String getTag5() {
		return tag5;
	}

	public void setTag5(String tag5) {
		this.tag5 = tag5;
	}

	public String getTag6() {
		return tag6;
	}

	public void setTag6(String tag6) {
		this.tag6 = tag6;
	}

	public String getTag7() {
		return tag7;
	}

	public void setTag7(String tag7) {
		this.tag7 = tag7;
	}

	public String getWear() {
		return wear;
	}

	public void setWear(String wear) {
		this.wear = wear;
	}

	public Boolean getIsStar() {
		return isStar;
	}

	public void setIsStar(Boolean isStar) {
		this.isStar = isStar;
	}

	public Boolean getIsStatTrak() {
		return isStatTrak;
	}

	public void setIsStatTrak(Boolean isStatTrak) {
		this.isStatTrak = isStatTrak;
	}

	public String getItemGroup() {
		return itemGroup;
	}

	public void setItemGroup(String itemGroup) {
		this.itemGroup = itemGroup;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getItemType() {
		return itemType;
	}

	public void setItemType(String itemType) {
		this.itemType = itemType;
	}

	public Double getPriceLatestSell24h() {
		return priceLatestSell24h;
	}

	public void setPriceLatestSell24h(Double priceLatestSell24h) {
		this.priceLatestSell24h = priceLatestSell24h;
	}

	public Double getPriceLatestSell7d() {
		return priceLatestSell7d;
	}

	public void setPriceLatestSell7d(Double priceLatestSell7d) {
		this.priceLatestSell7d = priceLatestSell7d;
	}

	public Double getPriceLatestSell30d() {
		return priceLatestSell30d;
	}

	public void setPriceLatestSell30d(Double priceLatestSell30d) {
		this.priceLatestSell30d = priceLatestSell30d;
	}

	public Double getPriceLatestSell90d() {
		return priceLatestSell90d;
	}

	public void setPriceLatestSell90d(Double priceLatestSell90d) {
		this.priceLatestSell90d = priceLatestSell90d;
	}

	public Double getPriceSafe7d() {
		return priceSafe7d;
	}

	public void setPriceSafe7d(Double priceSafe7d) {
		this.priceSafe7d = priceSafe7d;
	}

	public Double getPriceSafe24h() {
		return priceSafe24h;
	}

	public void setPriceSafe24h(Double priceSafe24h) {
		this.priceSafe24h = priceSafe24h;
	}

	public Double getPriceSafe30d() {
		return priceSafe30d;
	}

	public void setPriceSafe30d(Double priceSafe30d) {
		this.priceSafe30d = priceSafe30d;
	}

	public Double getPriceSafe90d() {
		return priceSafe90d;
	}

	public void setPriceSafe90d(Double priceSafe90d) {
		this.priceSafe90d = priceSafe90d;
	}

	public static class PriceUpdatedAt {
        @JsonProperty("date")
        private String date;

        @JsonProperty("timezone_type")
        private Integer timezoneType;

        @JsonProperty("timezone")
        private String timezone;

		public String getDate() {
			return date;
		}

		public void setDate(String date) {
			this.date = date;
		}

		public Integer getTimezoneType() {
			return timezoneType;
		}

		public void setTimezoneType(Integer timezoneType) {
			this.timezoneType = timezoneType;
		}

		public String getTimezone() {
			return timezone;
		}

		public void setTimezone(String timezone) {
			this.timezone = timezone;
		}
        
    }

    public static class CreatedAt {
        @JsonProperty("date")
        private String date;

        @JsonProperty("timezone_type")
        private Integer timezoneType;

        @JsonProperty("timezone")
        private String timezone;

		public String getDate() {
			return date;
		}

		public void setDate(String date) {
			this.date = date;
		}

		public Integer getTimezoneType() {
			return timezoneType;
		}

		public void setTimezoneType(Integer timezoneType) {
			this.timezoneType = timezoneType;
		}

		public String getTimezone() {
			return timezone;
		}

		public void setTimezone(String timezone) {
			this.timezone = timezone;
		}
        
    }

    public static class InspectLinkParsed {
        @JsonProperty("a")
        private String a;

        @JsonProperty("s")
        private String s;

        @JsonProperty("d")
        private String d;

		public String getA() {
			return a;
		}

		public void setA(String a) {
			this.a = a;
		}

		public String getS() {
			return s;
		}

		public void setS(String s) {
			this.s = s;
		}

		public String getD() {
			return d;
		}

		public void setD(String d) {
			this.d = d;
		}
        
    }

    public static class Tag {
        @JsonProperty("category")
        private String category;

        @JsonProperty("internal_name")
        private String internalName;

        @JsonProperty("localized_category_name")
        private String localizedCategoryName;

        @JsonProperty("localized_tag_name")
        private String localizedTagName;

        @JsonProperty("color")
        private String color;

		public String getCategory() {
			return category;
		}

		public void setCategory(String category) {
			this.category = category;
		}

		public String getInternalName() {
			return internalName;
		}

		public void setInternalName(String internalName) {
			this.internalName = internalName;
		}

		public String getLocalizedCategoryName() {
			return localizedCategoryName;
		}

		public void setLocalizedCategoryName(String localizedCategoryName) {
			this.localizedCategoryName = localizedCategoryName;
		}

		public String getLocalizedTagName() {
			return localizedTagName;
		}

		public void setLocalizedTagName(String localizedTagName) {
			this.localizedTagName = localizedTagName;
		}

		public String getColor() {
			return color;
		}

		public void setColor(String color) {
			this.color = color;
		}
        
    }

    public static class Description {
        @JsonProperty("type")
        private String type;

        @JsonProperty("value")
        private String value;

        @JsonProperty("name")
        private String name;

        @JsonProperty("color")
        private String color;

		public String getType() {
			return type;
		}

		public void setType(String type) {
			this.type = type;
		}

		public String getValue() {
			return value;
		}

		public void setValue(String value) {
			this.value = value;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getColor() {
			return color;
		}

		public void setColor(String color) {
			this.color = color;
		}
        
    }

    public static class Action {
    	
        @JsonProperty("link")
        private String link;

        @JsonProperty("name")
        private String name;

		public String getLink() {
			return link;
		}

		public void setLink(String link) {
			this.link = link;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}
        
    }
}

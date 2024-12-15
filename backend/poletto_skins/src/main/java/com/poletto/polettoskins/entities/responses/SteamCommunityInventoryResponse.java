package com.poletto.polettoskins.entities.responses;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SteamCommunityInventoryResponse {

	private Boolean success;

	@JsonProperty("total_inventory_count")
	private Integer totalInventoryCount;

	private List<Asset> assets = new ArrayList<>();

	private List<ItemDescription> descriptions = new ArrayList<>();

	public Boolean getSuccess() {
		return success;
	}

	public void setSuccess(Boolean success) {
		this.success = success;
	}

	public Integer getTotalInventoryCount() {
		return totalInventoryCount;
	}

	public void setTotalInventoryCount(Integer totalInventoryCount) {
		this.totalInventoryCount = totalInventoryCount;
	}

	public List<Asset> getAssets() {
		return assets;
	}

	public void setAssets(List<Asset> assets) {
		this.assets = assets;
	}

	public List<ItemDescription> getDescriptions() {
		return descriptions;
	}

	public void setDescriptions(List<ItemDescription> descriptions) {
		this.descriptions = descriptions;
	}

	public static class Asset {

		@JsonProperty("appid")
		private Integer appId;

		@JsonProperty("contextid")
		private String contextId;

		@JsonProperty("assetid")
		private String assetId;

		@JsonProperty("classid")
		private String classId;

		@JsonProperty("instanceid")
		private String instanceId;

		@JsonProperty("amount")
		private String amount;

		public Integer getAppId() {
			return appId;
		}

		public void setAppId(Integer appId) {
			this.appId = appId;
		}

		public String getContextId() {
			return contextId;
		}

		public void setContextId(String contextId) {
			this.contextId = contextId;
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

		public String getInstanceId() {
			return instanceId;
		}

		public void setInstanceId(String instanceId) {
			this.instanceId = instanceId;
		}

		public String getAmount() {
			return amount;
		}

		public void setAmount(String amount) {
			this.amount = amount;
		}

	}

	public static class ItemDescription {

		@JsonProperty("appid")
		private Integer appId;

		@JsonProperty("classid")
		private String classId;

		@JsonProperty("instanceid")
		private String instanceId;

		@JsonProperty("currency")
		private Integer currency;

		@JsonProperty("background_color")
		private String backgroundColor;

		@JsonProperty("icon_url")
		private String iconUrl;

		@JsonProperty("descriptions")
		private List<Description> descriptions;

		@JsonProperty("tradable")
		private Integer tradable;

		@JsonProperty("actions")
		private List<Action> actions;

		@JsonProperty("name")
		private String name;

		@JsonProperty("name_color")
		private String nameColor;

		@JsonProperty("type")
		private String type;

		@JsonProperty("market_name")
		private String marketName;

		@JsonProperty("market_hash_name")
		private String marketHashName;

		@JsonProperty("market_actions")
		private List<Action> marketActions;

		@JsonProperty("commodity")
		private Integer commodity;

		@JsonProperty("market_tradable_restriction")
		private Integer marketTradableRestriction;

		@JsonProperty("market_marketable_restriction")
		private Integer marketMarketableRestriction;

		@JsonProperty("marketable")
		private Integer marketable;

		@JsonProperty("tags")
		private List<Tag> tags;

		public Integer getAppId() {
			return appId;
		}

		public void setAppId(Integer appId) {
			this.appId = appId;
		}

		public String getClassId() {
			return classId;
		}

		public void setClassId(String classId) {
			this.classId = classId;
		}

		public String getInstanceId() {
			return instanceId;
		}

		public void setInstanceId(String instanceId) {
			this.instanceId = instanceId;
		}

		public Integer getCurrency() {
			return currency;
		}

		public void setCurrency(Integer currency) {
			this.currency = currency;
		}

		public String getBackgroundColor() {
			return backgroundColor;
		}

		public void setBackgroundColor(String backgroundColor) {
			this.backgroundColor = backgroundColor;
		}

		public String getIconUrl() {
			return iconUrl;
		}

		public void setIconUrl(String iconUrl) {
			this.iconUrl = iconUrl;
		}

		public List<Description> getDescriptions() {
			return descriptions;
		}

		public void setDescriptions(List<Description> descriptions) {
			this.descriptions = descriptions;
		}

		public Integer getTradable() {
			return tradable;
		}

		public void setTradable(Integer tradable) {
			this.tradable = tradable;
		}

		public List<Action> getActions() {
			return actions;
		}

		public void setActions(List<Action> actions) {
			this.actions = actions;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getNameColor() {
			return nameColor;
		}

		public void setNameColor(String nameColor) {
			this.nameColor = nameColor;
		}

		public String getType() {
			return type;
		}

		public void setType(String type) {
			this.type = type;
		}

		public String getMarketName() {
			return marketName;
		}

		public void setMarketName(String marketName) {
			this.marketName = marketName;
		}

		public String getMarketHashName() {
			return marketHashName;
		}

		public void setMarketHashName(String marketHashName) {
			this.marketHashName = marketHashName;
		}

		public List<Action> getMarketActions() {
			return marketActions;
		}

		public void setMarketActions(List<Action> marketActions) {
			this.marketActions = marketActions;
		}

		public Integer getCommodity() {
			return commodity;
		}

		public void setCommodity(Integer commodity) {
			this.commodity = commodity;
		}

		public Integer getMarketTradableRestriction() {
			return marketTradableRestriction;
		}

		public void setMarketTradableRestriction(Integer marketTradableRestriction) {
			this.marketTradableRestriction = marketTradableRestriction;
		}

		public Integer getMarketMarketableRestriction() {
			return marketMarketableRestriction;
		}

		public void setMarketMarketableRestriction(Integer marketMarketableRestriction) {
			this.marketMarketableRestriction = marketMarketableRestriction;
		}

		public Integer getMarketable() {
			return marketable;
		}

		public void setMarketable(Integer marketable) {
			this.marketable = marketable;
		}

		public List<Tag> getTags() {
			return tags;
		}

		public void setTags(List<Tag> tags) {
			this.tags = tags;
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
	}

}
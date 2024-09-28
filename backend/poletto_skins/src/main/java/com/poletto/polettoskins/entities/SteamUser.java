package com.poletto.polettoskins.entities;

import java.io.Serializable;
import java.util.Objects;

public class SteamUser implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String steamId;
    private int communityVisibilityState;
    private int profileState;
    private String personaName;
    private String profileUrl;
    private String avatar;
    private String avatarMedium;
    private String avatarFull;
    private long lastLogoff;
    private int personaState;
    private String realName;
    private String primaryClanId;
    private long timeCreated;
    private int personaStateFlags;
    private String locCountryCode;
    private String locStateCode;
    private int locCityId;
    
    public SteamUser() {
    	
    }

	public SteamUser(
			String steamId,
			int communityVisibilityState,
			int profileState,
			String personaName,
			String profileUrl,
			String avatar,
			String avatarMedium,
			String avatarFull,
			long lastLogoff,
			int personaState,
			String realName,
			String primaryClanId,
			long timeCreated,
			int personaStateFlags,
			String locCountryCode,
			String locStateCode,
			int locCityId
		) {
		this.steamId = steamId;
		this.communityVisibilityState = communityVisibilityState;
		this.profileState = profileState;
		this.personaName = personaName;
		this.profileUrl = profileUrl;
		this.avatar = avatar;
		this.avatarMedium = avatarMedium;
		this.avatarFull = avatarFull;
		this.lastLogoff = lastLogoff;
		this.personaState = personaState;
		this.realName = realName;
		this.primaryClanId = primaryClanId;
		this.timeCreated = timeCreated;
		this.personaStateFlags = personaStateFlags;
		this.locCountryCode = locCountryCode;
		this.locStateCode = locStateCode;
		this.locCityId = locCityId;
	}

	public String getSteamId() {
		return steamId;
	}

	public void setSteamId(String steamId) {
		this.steamId = steamId;
	}

	public int getCommunityVisibilityState() {
		return communityVisibilityState;
	}

	public void setCommunityVisibilityState(int communityVisibilityState) {
		this.communityVisibilityState = communityVisibilityState;
	}

	public int getProfileState() {
		return profileState;
	}

	public void setProfileState(int profileState) {
		this.profileState = profileState;
	}

	public String getPersonaName() {
		return personaName;
	}

	public void setPersonaName(String personaName) {
		this.personaName = personaName;
	}

	public String getProfileUrl() {
		return profileUrl;
	}

	public void setProfileUrl(String profileUrl) {
		this.profileUrl = profileUrl;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public String getAvatarMedium() {
		return avatarMedium;
	}

	public void setAvatarMedium(String avatarMedium) {
		this.avatarMedium = avatarMedium;
	}

	public String getAvatarFull() {
		return avatarFull;
	}

	public void setAvatarFull(String avatarFull) {
		this.avatarFull = avatarFull;
	}

	public long getLastLogoff() {
		return lastLogoff;
	}

	public void setLastLogoff(long lastLogoff) {
		this.lastLogoff = lastLogoff;
	}

	public int getPersonaState() {
		return personaState;
	}

	public void setPersonaState(int personaState) {
		this.personaState = personaState;
	}

	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public String getPrimaryClanId() {
		return primaryClanId;
	}

	public void setPrimaryClanId(String primaryClanId) {
		this.primaryClanId = primaryClanId;
	}

	public long getTimeCreated() {
		return timeCreated;
	}

	public void setTimeCreated(long timeCreated) {
		this.timeCreated = timeCreated;
	}

	public int getPersonaStateFlags() {
		return personaStateFlags;
	}

	public void setPersonaStateFlags(int personaStateFlags) {
		this.personaStateFlags = personaStateFlags;
	}

	public String getLocCountryCode() {
		return locCountryCode;
	}

	public void setLocCountryCode(String locCountryCode) {
		this.locCountryCode = locCountryCode;
	}

	public String getLocStateCode() {
		return locStateCode;
	}

	public void setLocStateCode(String locStateCode) {
		this.locStateCode = locStateCode;
	}

	public int getLocCityId() {
		return locCityId;
	}

	public void setLocCityId(int locCityId) {
		this.locCityId = locCityId;
	}

	@Override
	public int hashCode() {
		return Objects.hash(steamId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		SteamUser other = (SteamUser) obj;
		return Objects.equals(steamId, other.steamId);
	}

	@Override
	public String toString() {
		return "SteamUser [steamId=" + steamId + ", communityVisibilityState=" + communityVisibilityState
				+ ", profileState=" + profileState + ", personaName=" + personaName + ", profileUrl=" + profileUrl
				+ ", avatar=" + avatar + ", avatarMedium=" + avatarMedium + ", avatarFull=" + avatarFull
				+ ", lastLogoff=" + lastLogoff + ", personaState=" + personaState + ", realName=" + realName
				+ ", primaryClanId=" + primaryClanId + ", timeCreated=" + timeCreated + ", personaStateFlags="
				+ personaStateFlags + ", locCountryCode=" + locCountryCode + ", locStateCode=" + locStateCode
				+ ", locCityId=" + locCityId + "]";
	}

	}
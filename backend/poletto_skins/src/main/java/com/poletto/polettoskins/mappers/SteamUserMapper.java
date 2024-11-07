package com.poletto.polettoskins.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.poletto.polettoskins.entities.SteamUser;
import com.poletto.polettoskins.entities.responses.SteamAPIUserResponse.Player;

@Mapper(componentModel = "spring")
public interface SteamUserMapper {

	SteamUserMapper INSTANCE = Mappers.getMapper(SteamUserMapper.class);

	@Mapping(source = "steamid", target = "steamId")
	@Mapping(source = "communityvisibilitystate", target = "communityVisibilityState")
	@Mapping(source = "profilestate", target = "profileState")
	@Mapping(source = "personaname", target = "personaName")
	@Mapping(source = "profileurl", target = "profileUrl")
	@Mapping(source = "avatarmedium", target = "avatarMedium")
	@Mapping(source = "avatarfull", target = "avatarFull")
	@Mapping(source = "lastlogoff", target = "lastLogoff")
	@Mapping(source = "personastate", target = "personaState")
	@Mapping(source = "realname", target = "realName")
	@Mapping(source = "primaryclanid", target = "primaryClanId")
	@Mapping(source = "timecreated", target = "timeCreated")
	@Mapping(source = "personastateflags", target = "personaStateFlags")
	@Mapping(source = "loccountrycode", target = "locCountryCode")
	@Mapping(source = "locstatecode", target = "locStateCode")
	@Mapping(source = "loccityid", target = "locCityId")
	SteamUser toSteamUser(Player player);

}
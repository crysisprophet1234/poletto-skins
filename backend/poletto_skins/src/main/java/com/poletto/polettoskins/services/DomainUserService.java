package com.poletto.polettoskins.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.poletto.polettoskins.dto.DomainUserDto;
import com.poletto.polettoskins.entities.SteamUser;

@Service
public interface DomainUserService {
	
	@Transactional(readOnly = true)
	DomainUserDto findUserById(String userId);
	
	@Transactional(readOnly = true)
	DomainUserDto findOrRegisterUserBySteamId(String steamId);
	
	@Transactional
	DomainUserDto createUser(SteamUser steamUser);
	
	@Transactional
	DomainUserDto updateEmail(String userId, DomainUserDto domainUserDto);

}

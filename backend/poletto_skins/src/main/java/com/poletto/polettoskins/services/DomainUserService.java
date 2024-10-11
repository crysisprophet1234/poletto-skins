package com.poletto.polettoskins.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.poletto.polettoskins.dto.DomainUserDTO;
import com.poletto.polettoskins.entities.SteamUser;

@Service
public interface DomainUserService {
	
	@Transactional(readOnly = true)
	DomainUserDTO findUserById(String userId);
	
	@Transactional(readOnly = true)
	DomainUserDTO findOrRegisterUserBySteamId(String steamId);
	
	@Transactional
	DomainUserDTO createUser(SteamUser steamUser);
	
	@Transactional
	DomainUserDTO updateEmail(String userId, DomainUserDTO domainUserDto);

}

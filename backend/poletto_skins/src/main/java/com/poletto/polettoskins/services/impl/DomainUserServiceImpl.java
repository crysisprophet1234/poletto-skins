package com.poletto.polettoskins.services.impl;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poletto.polettoskins.dto.DomainUserDTO;
import com.poletto.polettoskins.entities.DomainUser;
import com.poletto.polettoskins.entities.SteamUser;
import com.poletto.polettoskins.exceptions.response.EmailAlreadyInUseException;
import com.poletto.polettoskins.exceptions.response.ResourceNotFoundException;
import com.poletto.polettoskins.mappers.DomainUserMapper;
import com.poletto.polettoskins.repositories.DomainUserRepository;
import com.poletto.polettoskins.services.DomainUserService;
import com.poletto.polettoskins.services.SteamService;

@Service
public class DomainUserServiceImpl implements DomainUserService {
	
	@Autowired
    private DomainUserRepository domainUserRepository;
	
	@Autowired
	private SteamService steamService;

	@Override
	public DomainUserDTO findUserById(String userId) {
		
		var user = domainUserRepository
				.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User id provided doesnt exist"));
		
		return DomainUserMapper.INSTANCE.toDomainUserDto(user);
	}
	
	@Override
	public DomainUserDTO findOrRegisterUserBySteamId(String steamId) {	
		
		var steamUser = steamService.findSteamUserBySteamId(steamId);
		
		var optionalUser = domainUserRepository.findBySteamUserId(steamId);
		
		if (optionalUser.isPresent()) {
			var domainUser = optionalUser.get();
			domainUser.setSteamUser(steamUser);
			domainUser = domainUserRepository.save(domainUser);
			return DomainUserMapper.INSTANCE.toDomainUserDto(domainUser);
		}
		
		return createUser(steamUser);
		
	}

	@Override
	public DomainUserDTO createUser(SteamUser steamUser) {
		
		var optionalUser = domainUserRepository.findBySteamUserId(steamUser.getSteamId());
		
		if (optionalUser.isPresent()) {
			throw new RuntimeException("SteamID provided is already being used");
		}
		
		var user = new DomainUser();
		user.setSteamUser(steamUser);
		user.setBalance(BigDecimal.ZERO);
		
		user = domainUserRepository.save(user);
		
		return DomainUserMapper.INSTANCE.toDomainUserDto(user);
	}
	
	@Override
	public DomainUserDTO updateEmail(String userId, DomainUserDTO domainUserDto) {
		
		String newEmail = domainUserDto.getEmail();
		
		var user = domainUserRepository
				.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User id provided doesnt exist"));
		
		var optionalUser = domainUserRepository.findByEmail(newEmail);
		
		if (optionalUser.isPresent()) {
			throw new EmailAlreadyInUseException("Email provided is already being used");
		}
		
		user.setEmail(domainUserDto.getEmail());
		
		domainUserRepository.save(user);
		
		return DomainUserMapper.INSTANCE.toDomainUserDto(user);	
	}

}
package com.poletto.polettoskins.services;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.poletto.polettoskins.entities.SteamItem;

@Service
public interface CSFloatService {

	@Transactional(readOnly = true)
	Optional<SteamItem> findItemByInspectUrl(String inspectUrl);
	
}
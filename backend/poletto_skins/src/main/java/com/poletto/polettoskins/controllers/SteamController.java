package com.poletto.polettoskins.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.poletto.polettoskins.entities.SteamUser;
import com.poletto.polettoskins.services.SteamService;

@RestController
public class SteamController {
	
	@Autowired
	private SteamService steamService;

    @GetMapping("/getPlayerInfo")
    public SteamUser getPlayerInfo(@RequestParam String steamId) {
        return steamService.getPlayerInfo(steamId);
    }

}

package com.poletto.polettoskins.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.poletto.polettoskins.entities.SteamItem;
import com.poletto.polettoskins.entities.SteamUser;
import com.poletto.polettoskins.services.SteamService;

@RestController
public class SteamController {
	
	@Autowired
	private SteamService steamService;

    @GetMapping("/getPlayerInfo")
    public SteamUser getUserInfo(@RequestParam String steamId) {
        return steamService.getUserInfo(steamId);
    }
    
    @GetMapping("/getPlayerInventory")
    public List<SteamItem> getPlayerInventory(@RequestParam String steamId) {
        return steamService.getUserInventory(steamId);
    }

}
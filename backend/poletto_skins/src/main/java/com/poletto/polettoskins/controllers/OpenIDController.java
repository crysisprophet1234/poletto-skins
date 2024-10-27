package com.poletto.polettoskins.controllers;

import java.util.List;

import org.openid4java.consumer.ConsumerManager;
import org.openid4java.discovery.DiscoveryInformation;
import org.openid4java.discovery.Identifier;
import org.openid4java.message.AuthRequest;
import org.openid4java.message.ParameterList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.util.UriComponentsBuilder;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Controller
public class OpenIDController {

	@Value("${openid.return-to-url}")
	private String openIdReturnToUrl;
	
	@Value("${openid.providers.steam}")
	private String openidSteamProvider;
	
	@Value("${openid.redirect.login-success}")
	private String redirectLoginSuccessUrl;
	
	@Value("${openid.redirect.login-failure}")
	private String redirectLoginFailureUrl;
	
    @Autowired
    private ConsumerManager consumerManager;

    @GetMapping("/login")
    public void login(
		@RequestParam("provider") String provider,
		HttpServletRequest request,
		HttpServletResponse response
    ) throws Exception {
    	
    	consumerManager.setMaxAssocAttempts(0);
        
        List<DiscoveryInformation> discoveries = consumerManager.discover(openidSteamProvider);
        
        DiscoveryInformation discovered = consumerManager.associate(discoveries);
        
        request.getSession().setAttribute("discovered", discovered);
        
        AuthRequest authRequest = consumerManager.authenticate(discovered, openIdReturnToUrl);
        
        response.sendRedirect(authRequest.getDestinationUrl(true));
    }

    @GetMapping("/openidreturn")
    public String openidReturn(HttpServletRequest request) throws Exception {
    	
        ParameterList responseList = new ParameterList(request.getParameterMap());

        DiscoveryInformation discovered = (DiscoveryInformation) request.getSession().getAttribute("discovered");
        
        StringBuffer receivingURL = request.getRequestURL();
        
        if (request.getQueryString() != null) {
            receivingURL.append("?").append(request.getQueryString());
        }

        Identifier identifier = consumerManager.verify(
    		receivingURL.toString(),
    		responseList,
    		discovered
		).getVerifiedId();
        
        if (identifier != null) {
            String steamId = identifier.getIdentifier().replace("https://steamcommunity.com/openid/id/", "");

            String returnUrl = UriComponentsBuilder
            		.fromHttpUrl(redirectLoginSuccessUrl)
            		.pathSegment("login")
            		.queryParam("steamId", steamId)
            		.toUriString();
            
            return "redirect:" + returnUrl;
        }
        
        return "redirect:" + redirectLoginFailureUrl;
    }
    
}

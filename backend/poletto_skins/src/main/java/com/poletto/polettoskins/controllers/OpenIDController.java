package com.poletto.polettoskins.controllers;

import java.util.List;
import java.util.Map;

import org.openid4java.consumer.ConsumerManager;
import org.openid4java.discovery.DiscoveryInformation;
import org.openid4java.discovery.Identifier;
import org.openid4java.message.AuthRequest;
import org.openid4java.message.ParameterList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Controller
public class OpenIDController {

	
	
    @Autowired
    private ConsumerManager consumerManager;
    
    //TODO: this will be refactored in the future...
    
    private static final Map<String, String> providers = Map.of(
    	    "steam", "https://steamcommunity.com/openid",
    	    "github", "not implemented yet"
    );

    @GetMapping("/login")
    public void login(
		@RequestParam("provider") String provider,
		HttpServletRequest request,
		HttpServletResponse response
    ) throws Exception {
    	
    	String identifier = providers.get(provider);
    	
    	consumerManager.setMaxAssocAttempts(0);
        
        List<DiscoveryInformation> discoveries = consumerManager.discover(identifier);
        
        DiscoveryInformation discovered = consumerManager.associate(discoveries);
        
        request.getSession().setAttribute("discovered", discovered);
        
        String returnToUrl = "http://localhost:8080/openidreturn";
        
        AuthRequest authRequest = consumerManager.authenticate(discovered, returnToUrl);
        
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
            return "redirect:http://localhost:3000/login?steamId=" + steamId;
        }
        
        return "redirect:http://localhost:3000/";
    }
    
}

package com.poletto.polettoskins.controllers;

import java.util.List;
import org.openid4java.consumer.ConsumerManager;
import org.openid4java.discovery.DiscoveryInformation;
import org.openid4java.discovery.Identifier;
import org.openid4java.message.AuthRequest;
import org.openid4java.message.ParameterList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger logger = LoggerFactory.getLogger(OpenIDController.class);

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
    	
        logger.info("Login requested with provider: {}", provider);
        
        consumerManager.setMaxAssocAttempts(0);

        List<DiscoveryInformation> discoveries = consumerManager.discover(openidSteamProvider);
        logger.info("Discovered {} providers for OpenID", discoveries.size());

        DiscoveryInformation discovered = consumerManager.associate(discoveries);
        logger.info("Associated with discovery information: {}", discovered);

        request.getSession().setAttribute("discovered", discovered);

        AuthRequest authRequest = consumerManager.authenticate(discovered, openIdReturnToUrl);
        logger.info("Auth request created with destination URL: {}", authRequest.getDestinationUrl(true));

        response.sendRedirect(authRequest.getDestinationUrl(true));
        logger.info("Redirecting to OpenID provider for authentication");
    }

    @GetMapping("/openidreturn")
    public String openidReturn(HttpServletRequest request) throws Exception {
        logger.info("Received OpenID return request");

        ParameterList responseList = new ParameterList(request.getParameterMap());
        logger.info("Received parameters: {}", responseList.getParameters());

        DiscoveryInformation discovered = (DiscoveryInformation) request.getSession().getAttribute("discovered");
        if (discovered == null) {
            logger.error("Discovery information not found in session");
            return "redirect:" + redirectLoginFailureUrl;
        }
        
        StringBuffer receivingURL = request.getRequestURL();
        if (request.getQueryString() != null) {
            receivingURL.append("?").append(request.getQueryString());
        }
        logger.info("Receiving URL: {}", receivingURL.toString());

        Identifier identifier = consumerManager.verify(
            receivingURL.toString(),
            responseList,
            discovered
        ).getVerifiedId();

        if (identifier != null) {
            String steamId = identifier.getIdentifier().replace("https://steamcommunity.com/openid/id/", "");
            logger.info("Successfully authenticated with Steam ID: {}", steamId);

            String returnUrl = UriComponentsBuilder
                .fromHttpUrl(redirectLoginSuccessUrl)
                .pathSegment("login")
                .queryParam("steamId", steamId)
                .toUriString();
            logger.info("Redirecting to success URL: {}", returnUrl);
            return "redirect:" + returnUrl;
        } else {
            logger.warn("Authentication failed; redirecting to failure URL");
            return "redirect:" + redirectLoginFailureUrl;
        }
    }
}

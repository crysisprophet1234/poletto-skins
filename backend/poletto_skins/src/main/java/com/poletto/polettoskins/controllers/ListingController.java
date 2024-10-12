package com.poletto.polettoskins.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.poletto.polettoskins.dto.ListingDTO;
import com.poletto.polettoskins.services.ListingService;

@RestController
@RequestMapping("/listings")
public class ListingController {

	@Autowired
	private ListingService listingService;
	
	@GetMapping
	public Page<ListingDTO> getListingsPaged(
	    @RequestParam(required = false, defaultValue = "") String query,
	    @RequestParam(required = false, defaultValue = "") String userId,
	    @RequestParam(required = false) Double minPrice,
	    @RequestParam(required = false) Double maxPrice,
	    @RequestParam(required = false) Double minFloat,
	    @RequestParam(required = false) Double maxFloat,
	    @PageableDefault(page = 0, size = 12, sort = "createdOn", direction = Direction.DESC) Pageable pageable
	) {
	    return listingService.findListingsPaged(pageable, query, userId, minPrice, maxPrice, minFloat, maxFloat);
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ListingDTO createListing(@RequestBody ListingDTO listingDTO) {
		return listingService.createListing(listingDTO);
	}
	
}

package com.poletto.polettoskins.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.poletto.polettoskins.dto.ListingDTO;
import com.poletto.polettoskins.entities.enums.ListingStatus;

@Service
public interface ListingService {
	
	@Transactional(readOnly = true)
	Page<ListingDTO> findListingsPaged(
	    Pageable pageable, 
	    String query, 
	    String userId,
	    ListingStatus listingStatus,
	    Double minPrice, 
	    Double maxPrice, 
	    Double minFloat, 
	    Double maxFloat
	);
	
	@Transactional
	ListingDTO createListing(ListingDTO listingDTO);

}
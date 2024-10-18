package com.poletto.polettoskins.services.impl;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.poletto.polettoskins.dto.ListingDTO;
import com.poletto.polettoskins.entities.DomainUser;
import com.poletto.polettoskins.entities.Listing;
import com.poletto.polettoskins.entities.SteamItem;
import com.poletto.polettoskins.entities.SteamItemPrice;
import com.poletto.polettoskins.entities.enums.ListingStatus;
import com.poletto.polettoskins.exceptions.response.ResourceNotFoundException;
import com.poletto.polettoskins.mappers.ListingMapper;
import com.poletto.polettoskins.repositories.DomainUserRepository;
import com.poletto.polettoskins.repositories.ListingRepository;
import com.poletto.polettoskins.services.ListingService;
import com.poletto.polettoskins.services.SteamService;

@Service
public class ListingServiceImpl implements ListingService {
	
	@Autowired
	private ListingRepository listingRepository;
	
	@Autowired
    private DomainUserRepository domainUserRepository;
	
	@Autowired
	private SteamService steamService;
	
	@Override
	public Page<ListingDTO> findListingsPaged(
	    Pageable pageable, 
	    String query, 
	    String userId, 
	    Double minPrice, 
	    Double maxPrice, 
	    Double minFloat, 
	    Double maxFloat
	) {
		
	    Page<Listing> result = listingRepository.findListingsPaged(
	        pageable, query, userId, minPrice, maxPrice, minFloat, maxFloat
	    );
	    return result.map(item -> ListingMapper.INSTANCE.toListingDTO(item));
	}

	@Override
	public ListingDTO createListing(ListingDTO listingDTO) {
		
		listingDTO.setCreatedOn(LocalDateTime.now());
		
		listingDTO.setStatus(ListingStatus.ACTIVE);
		
		DomainUser user = domainUserRepository.findById(listingDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User id provided doesn't exist: " + listingDTO.getUserId()));
		
		SteamItem steamItem = steamService.getItemBySteamId(listingDTO.getItem().getItemId())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid item or item name not found."));
		
		listingDTO.setItem(steamItem);
		
		SteamItemPrice steamItemPrice = steamService.getItemPriceBySteamId(steamItem.getFullItemName());
		
		listingDTO.setSteamPrice(steamItemPrice.getMedianPrice());
		
		try {
	        BigDecimal discountPercentage = calculateDiscountPercentage(steamItemPrice.getMedianPrice(), listingDTO.getListingPrice());
	        listingDTO.setDiscount(discountPercentage.intValue());
	    } catch (IllegalArgumentException e) {
	        listingDTO.setDiscount(0);
	        //TODO custom exception here
	    }
		
		listingDTO.setViewsCount(0);
		listingDTO.setFavoritesCount(0);
		
		Listing createdListing = listingRepository.save(ListingMapper.INSTANCE.toListing(listingDTO));
		
		return ListingMapper.INSTANCE.toListingDTO(createdListing);
	}
	
	private static BigDecimal calculateDiscountPercentage(BigDecimal steamPrice, BigDecimal listingPrice) {
        if (steamPrice.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Steam price must be greater than zero");
        }
        
        if (listingPrice.compareTo(steamPrice) > 0) {
            throw new IllegalArgumentException("Listing price cannot be greater than Steam price");
        }

        return steamPrice.subtract(listingPrice)
                .divide(steamPrice, 4, RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100))
                .setScale(2, RoundingMode.HALF_UP);
    }

}

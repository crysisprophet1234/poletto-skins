package com.poletto.polettoskins.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.poletto.polettoskins.dto.ListingDTO;
import com.poletto.polettoskins.entities.Listing;

@Mapper(componentModel = "spring")
public interface ListingMapper {
	
	ListingMapper INSTANCE = Mappers.getMapper(ListingMapper.class);
	
	ListingDTO toListingDTO(Listing listing);

    Listing toListing(ListingDTO listingDTO);

}

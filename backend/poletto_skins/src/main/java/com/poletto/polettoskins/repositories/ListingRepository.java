package com.poletto.polettoskins.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.poletto.polettoskins.entities.Listing;

@Repository
public interface ListingRepository extends MongoRepository<Listing, String> {
	
	//TODO: listing value should be stored as a double anyway
	@Query("{ $and: [ " +
	       "  { $or: [ " +
	       "    { $expr: { $eq: ['', ?0] } }, " +
	       "    { 'item.fullItemName': { $regex: ?0, $options: 'i' } }" +
	       "  ] }, " +
	       "  { $or: [ " +
	       "    { $expr: { $eq: ['', ?1] } }, " +
	       "    { userId: ?1 }" +
	       "  ] }, " +
	       "  { $or: [ " +
	       "    { $expr: { $eq: [null, ?2] } }, " +
	       "    { $expr: { $gte: [ { $toDouble: '$listingPrice' }, ?2 ] } }" +
	       "  ] }, " +
	       "  { $or: [ " +
	       "    { $expr: { $eq: [null, ?3] } }, " +
	       "    { $expr: { $lte: [ { $toDouble: '$listingPrice' }, ?3 ] } }" +
	       "  ] }, " +
	       "  { $or: [ " +
	       "    { $expr: { $eq: [null, ?4] } }, " +
	       "    { 'item.floatValue': { $gte: ?4 } }" +
	       "  ] }, " +
	       "  { $or: [ " +
	       "    { $expr: { $eq: [null, ?5] } }, " +
	       "    { 'item.floatValue': { $lte: ?5 } }" +
	       "  ] }" +
	       "] }"
	)
	Page<Listing> findListingsPaged(
	    Pageable pageable,
	    String query,
	    String userId,
	    Double minPrice,
	    Double maxPrice,
	    Double minFloat,
	    Double maxFloat
	);
	
	@Query("{ 'item.assetId': { $in: ?0 } }")
	List<Listing> findAllByAssetIdIn(List<String> assetIds);

}
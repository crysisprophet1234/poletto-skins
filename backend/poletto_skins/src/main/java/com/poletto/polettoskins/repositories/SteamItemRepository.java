package com.poletto.polettoskins.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.poletto.polettoskins.entities.SteamItem;

@Repository
public interface SteamItemRepository extends MongoRepository<SteamItem, String> {
	
	@Query("{ $or: [ " +
           "  { $expr: { $eq: ['', ?0] } }, " +
           "  { 'fullItemName': { $regex: ?0, $options: 'i' } }" +
           "] }")
    Page<SteamItem> findByFullItemName(String fullItemName, Pageable pageable);

}

package com.poletto.polettoskins.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.poletto.polettoskins.entities.DomainUser;

@Repository
public interface DomainUserRepository extends MongoRepository<DomainUser, String> {
	
	@Query("{ 'steamUser.steamId': ?0 }")
	Optional<DomainUser> findBySteamUserId(String steamId);
	
	Optional<DomainUser> findByEmail(String email);

}
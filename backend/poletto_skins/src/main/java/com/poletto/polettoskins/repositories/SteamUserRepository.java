package com.poletto.polettoskins.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.poletto.polettoskins.entities.SteamUser;

@Repository
public interface SteamUserRepository extends MongoRepository<SteamUser, String> {
}

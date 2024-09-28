package com.poletto.polettoskins.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.poletto.polettoskins.entities.BalanceChange;

public interface BalanceRepository extends MongoRepository<BalanceChange, String> {
	
}

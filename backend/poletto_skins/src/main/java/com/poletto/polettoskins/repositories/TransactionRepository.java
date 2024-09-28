package com.poletto.polettoskins.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.poletto.polettoskins.entities.Transaction;

@Repository
public interface TransactionRepository extends MongoRepository<Transaction, String> {
	
	List<Transaction> findByUserId(String userId);

}
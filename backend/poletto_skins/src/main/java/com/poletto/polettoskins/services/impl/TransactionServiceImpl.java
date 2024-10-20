package com.poletto.polettoskins.services.impl;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poletto.polettoskins.dto.ListingDTO;
import com.poletto.polettoskins.dto.TransactionDTO;
import com.poletto.polettoskins.entities.DomainUser;
import com.poletto.polettoskins.entities.Listing;
import com.poletto.polettoskins.entities.Transaction;
import com.poletto.polettoskins.entities.enums.BalanceChangeType;
import com.poletto.polettoskins.entities.enums.ListingStatus;
import com.poletto.polettoskins.entities.enums.TransactionType;
import com.poletto.polettoskins.exceptions.response.InsufficientCreditException;
import com.poletto.polettoskins.exceptions.response.ListingNoLongerActiveException;
import com.poletto.polettoskins.exceptions.response.ResourceNotFoundException;
import com.poletto.polettoskins.mappers.TransactionMapper;
import com.poletto.polettoskins.repositories.DomainUserRepository;
import com.poletto.polettoskins.repositories.ListingRepository;
import com.poletto.polettoskins.repositories.TransactionRepository;
import com.poletto.polettoskins.services.BalanceService;
import com.poletto.polettoskins.services.TransactionService;

@Service
public class TransactionServiceImpl implements TransactionService {
	
	@Autowired
    private TransactionRepository transactionRepository;
	
	@Autowired
	private ListingRepository listingRepository;

    @Autowired
    private DomainUserRepository domainUserRepository;
    
    @Autowired
    private BalanceService balanceService;
    
    @Override
	public List<TransactionDTO> getUserTransactions(String userId) {
    	
    	 List<Transaction> transactions = transactionRepository.findByUserId(userId);
    	 
         return transactions.stream()
                 .map(TransactionMapper.INSTANCE::toTransactionDto)
                 .collect(Collectors.toList());
	}

    @Override
    public TransactionDTO checkoutCart(TransactionDTO transactionDTO) {
    	
    	DomainUser buyer = domainUserRepository.findById(transactionDTO.getUserId())
    			.orElseThrow(() -> new ResourceNotFoundException("Buyer user not found."));
    	
    	List<Listing> listings = new ArrayList<>();
    	
    	for (ListingDTO listingDTO : transactionDTO.getListings()) {
    		
    		Listing listing = listingRepository.findById(listingDTO.getId())
    		        .orElseThrow(() -> new ResourceNotFoundException("Listing not found."));
    		
    		if (!listing.getStatus().equals(ListingStatus.ACTIVE)) {
    			throw new ListingNoLongerActiveException("Listing is no longer available.");
    		}
    		
    		listing.setStatus(ListingStatus.SOLD);
    		
    		listings.add(listing);
    	}
    	
    	Transaction buyerTransaction = new Transaction();
        buyerTransaction.setUserId(buyer.getId());
        buyerTransaction.setTransactionType(TransactionType.PURCHASE);
        buyerTransaction.setDate(LocalDateTime.now());
        
        buyerTransaction.setListings(listings);
        
        buyerTransaction.setTotalValue(
        	listings
	    		.stream()
	    		.map(Listing::getListingPrice)
	    		.reduce(BigDecimal.ZERO, BigDecimal::add)
    	);
        
        validateUserBalance(buyerTransaction, buyer);
        
        buyerTransaction = transactionRepository.save(buyerTransaction);
        
        balanceService.updateUserBalance(buyer, buyerTransaction.getTotalValue(), BalanceChangeType.PURCHASE);
    	
    	for (Listing listing : listings) {
    		
    		DomainUser seller = domainUserRepository.findById(listing.getUserId())
        	        .orElseThrow(() -> new ResourceNotFoundException("Seller user not found."));
    		
    		listing = listingRepository.save(listing);
    		
    		Transaction sellerTransaction = new Transaction();
    	    sellerTransaction.setUserId(seller.getId());
    	    sellerTransaction.setTransactionType(TransactionType.SELLING);
    	    sellerTransaction.setTotalValue(listing.getListingPrice());
    	    sellerTransaction.setDate(LocalDateTime.now());
    	    sellerTransaction.setListings(List.of(listing));
    	    
    	    transactionRepository.save(sellerTransaction);
    	    
    	    balanceService.updateUserBalance(seller, listing.getListingPrice(), BalanceChangeType.SELLING);
	
    	}

		return TransactionMapper.INSTANCE.toTransactionDto(buyerTransaction); 	
    }

    private void validateUserBalance(Transaction transaction, DomainUser user) {
    	
        if (transaction.getTransactionType() == TransactionType.PURCHASE 
         && user.getBalance().compareTo(transaction.getTotalValue()) < 0
         ) {
            throw new InsufficientCreditException("User does not have sufficient credit for this transaction.");
        }
    }

    /*
    private void updateUserBalance(DomainUser user, BigDecimal transactionTotal, TransactionType transactionType) {
    	
        BigDecimal balanceChange = transactionType == TransactionType.PURCHASE ? transactionTotal.negate() : transactionTotal;
        user.setBalance(user.getBalance().add(balanceChange));
        domainUserRepository.save(user);
    }
    */
    
}
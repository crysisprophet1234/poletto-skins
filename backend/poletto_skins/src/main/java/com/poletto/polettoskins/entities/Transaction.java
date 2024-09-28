package com.poletto.polettoskins.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.poletto.polettoskins.entities.enums.TransactionType;

@Document(collection = "transactions")
public class Transaction {
	
	@Id
    private String id;
    private LocalDateTime date;
    private BigDecimal totalValue;
    private TransactionType transactionType;
    private Double tax;
    private String userId;
    private List<TransactionItem> items = new ArrayList<>();
    
    public Transaction() {}

	public Transaction(
		String id,
		LocalDateTime date,
		BigDecimal totalValue,
		TransactionType transactionType,
		Double tax,
		String userId,
		List<TransactionItem> items
	) {
		this.id = id;
		this.date = date;
		this.totalValue = totalValue;
		this.transactionType = transactionType;
		this.tax = tax;
		this.userId = userId;
		this.items = items;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public BigDecimal getTotalValue() {
		return totalValue;
	}

	public void setTotalValue(BigDecimal totalValue) {
		this.totalValue = totalValue;
	}

	public TransactionType getTransactionType() {
		return transactionType;
	}

	public void setTransactionType(TransactionType transactionType) {
		this.transactionType = transactionType;
	}

	public Double getTax() {
		return tax;
	}

	public void setTax(Double tax) {
		this.tax = tax;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public List<TransactionItem> getItems() {
		return items;
	}

	public void setItems(List<TransactionItem> items) {
		this.items = items;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Transaction other = (Transaction) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public String toString() {
		return "Transaction [id=" + id + ", date=" + date + ", totalValue=" + totalValue + ", transactionType="
				+ transactionType + ", tax=" + tax + ", userId=" + userId + ", items=" + items + "]";
	}

}
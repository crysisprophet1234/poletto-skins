package com.poletto.polettoskins.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.poletto.polettoskins.entities.enums.TransactionType;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class TransactionDto implements Serializable {

    private static final long serialVersionUID = 1L;
    
    private String id;
    private LocalDateTime date;
    private BigDecimal totalValue;
    private TransactionType transactionType;
    private Double tax;
    private String userId;
    
    @NotEmpty
    @NotNull
    private List<TransactionItemDto> items = new ArrayList<>();
    
    public TransactionDto() {}

    public TransactionDto(
        String id,
        LocalDateTime date,
        BigDecimal totalValue,
        TransactionType transactionType,
        Double tax,
        String userId,
        List<TransactionItemDto> items
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

    public List<TransactionItemDto> getItems() {
		return items;
	}

	public void setItems(List<TransactionItemDto> items) {
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
        TransactionDto other = (TransactionDto) obj;
        return Objects.equals(id, other.id);
    }

	@Override
	public String toString() {
		return "TransactionDto [id=" + id + ", date=" + date + ", totalValue=" + totalValue + ", transactionType="
				+ transactionType + ", tax=" + tax + ", userId=" + userId + ", items=" + items + "]";
	}

}
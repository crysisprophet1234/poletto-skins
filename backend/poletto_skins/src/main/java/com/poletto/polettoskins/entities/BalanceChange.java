package com.poletto.polettoskins.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Objects;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.poletto.polettoskins.entities.enums.BalanceChangeType;

@Document(collection = "balance_changes")
public class BalanceChange {
	
	@Id
    private String id;
    private BigDecimal amount;
    private BalanceChangeType type;
    private LocalDateTime timestamp;
    private String description;
    private String userId;

    public BalanceChange() {
    	
    }

    public BalanceChange(
    	String userId,
		BigDecimal amount,
		BalanceChangeType type,
		LocalDateTime localDateTime,
		String description
	) {
        this.userId = userId;
        this.amount = amount;
        this.type = type;
        this.timestamp = LocalDateTime.now();
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public BalanceChangeType getType() {
        return type;
    }

    public void setType(BalanceChangeType type) {
        this.type = type;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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
		BalanceChange other = (BalanceChange) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public String toString() {
		return "BalanceChange [id=" + id + ", amount=" + amount + ", type=" + type + ", timestamp=" + timestamp
				+ ", description=" + description + ", userId=" + userId + "]";
	}	

}
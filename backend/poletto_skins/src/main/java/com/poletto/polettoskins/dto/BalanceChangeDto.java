package com.poletto.polettoskins.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Objects;

import com.poletto.polettoskins.entities.enums.BalanceChangeType;

public class BalanceChangeDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String id;
    private BigDecimal amount;
    private BalanceChangeType type;
    private LocalDateTime timestamp;
    private String description;
    private String userId;

    public BalanceChangeDTO() {
    }

    public BalanceChangeDTO(
		String id,
		BigDecimal amount,
		BalanceChangeType type,
		LocalDateTime timestamp,
		String description,
		String userId
	) {
        this.id = id;
        this.amount = amount;
        this.type = type;
        this.timestamp = timestamp;
        this.description = description;
        this.userId = userId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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
		BalanceChangeDTO other = (BalanceChangeDTO) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public String toString() {
		return "BalanceChangeDto [id=" + id + ", amount=" + amount + ", type=" + type + ", timestamp=" + timestamp
				+ ", description=" + description + ", userId=" + userId + "]";
	}
    
}
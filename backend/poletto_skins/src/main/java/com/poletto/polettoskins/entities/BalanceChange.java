package com.poletto.polettoskins.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Objects;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.poletto.polettoskins.entities.enums.BalanceChangeType;
import com.poletto.polettoskins.entities.enums.PaymentMethod;

@Document(collection = "balance_changes")
public class BalanceChange {
	
	@Id
    private String id;
    private BigDecimal amount;
    private BalanceChangeType type;
    private PaymentMethod paymentMethod;
    private LocalDateTime timestamp;
    private DomainUser user;

    public BalanceChange() {}

	public BalanceChange(
		String id,
		BigDecimal amount,
		BalanceChangeType type,
		PaymentMethod paymentMethod,
		LocalDateTime timestamp,
		DomainUser user
	) {
		this.id = id;
		this.amount = amount;
		this.type = type;
		this.paymentMethod = paymentMethod;
		this.timestamp = timestamp;
		this.user = user;
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

	public PaymentMethod getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(PaymentMethod paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

	public DomainUser getUser() {
		return user;
	}

	public void setUser(DomainUser user) {
		this.user = user;
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
		return "BalanceChange [id=" + id + ", amount=" + amount + ", type=" + type + ", paymentMethod=" + paymentMethod
				+ ", timestamp=" + timestamp + ", user=" + user + "]";
	}
    
}   
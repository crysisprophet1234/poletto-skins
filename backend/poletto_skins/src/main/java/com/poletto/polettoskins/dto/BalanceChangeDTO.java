package com.poletto.polettoskins.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Objects;

import com.poletto.polettoskins.entities.enums.BalanceChangeType;
import com.poletto.polettoskins.entities.enums.PaymentMethod;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class BalanceChangeDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String id;
	
	@NotNull(message = "Valor não pode ser nulo")
    @Positive(message = "Valor deve ser positivo")
    private BigDecimal amount;
	
	@NotNull(message = "Type não pode ser nulo")
    private BalanceChangeType type;
	
	@NotNull(message = "PaymentMethod não pode ser nulo")
    private PaymentMethod paymentMethod;
	
    private LocalDateTime timestamp;
    
    @NotNull(message = "Usuário não pode ser nulo")
    private DomainUserDTO user;

    public BalanceChangeDTO() {}

	public BalanceChangeDTO(
		String id,
		BigDecimal amount,
		BalanceChangeType type,
		PaymentMethod paymentMethod,
		LocalDateTime timestamp,
		DomainUserDTO user
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

	public DomainUserDTO getUser() {
		return user;
	}

	public void setUser(DomainUserDTO user) {
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
		BalanceChangeDTO other = (BalanceChangeDTO) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public String toString() {
		return "BalanceChangeDTO [id=" + id + ", amount=" + amount + ", type=" + type + ", paymentMethod="
				+ paymentMethod + ", timestamp=" + timestamp + ", user=" + user + "]";
	}
    
}  
package com.poletto.polettoskins.entities;

import java.math.BigDecimal;
import java.util.Objects;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class DomainUser {
	
	@Id
    private String id;
    private String email;
    private BigDecimal balance;
    private SteamUser steamUser;
    
    public DomainUser() {}

	public DomainUser(
		String id,
		String email,
		BigDecimal balance,
		SteamUser steamUser
	) {
		this.id = id;
		this.email = email;
		this.balance = balance;
		this.steamUser = steamUser;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public BigDecimal getBalance() {
		return balance;
	}

	public void setBalance(BigDecimal balance) {
		this.balance = balance;
	}

	public SteamUser getSteamUser() {
		return steamUser;
	}

	public void setSteamUser(SteamUser steamUser) {
		this.steamUser = steamUser;
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
		DomainUser other = (DomainUser) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public String toString() {
		return "DomainUser [id=" + id + ", email=" + email + ", balance=" + balance + ", steamUser=" + steamUser + "]";
	}

}
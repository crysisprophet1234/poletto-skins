package com.poletto.polettoskins.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class DomainUserDto implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String id;
	
	@Email
	@NotBlank
    private String email;
	
    private BigDecimal balance;
    private SteamUserDto steamUser;
    
    public DomainUserDto() {
    }

	public DomainUserDto(
		String id,
		String email,
		BigDecimal balance,
		SteamUserDto steamUser
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

	public SteamUserDto getSteamUser() {
		return steamUser;
	}

	public void setSteamUser(SteamUserDto steamUser) {
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
		DomainUserDto other = (DomainUserDto) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public String toString() {
		return "DomainUserDto [id=" + id + ", email=" + email + ", balance=" + balance + ", steamUser=" + steamUser + "]";
	} 

}
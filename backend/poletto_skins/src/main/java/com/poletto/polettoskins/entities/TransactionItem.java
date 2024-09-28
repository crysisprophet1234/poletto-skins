package com.poletto.polettoskins.entities;

import java.math.BigDecimal;
import java.util.Objects;

public class TransactionItem {
	
	private String itemId;
	private BigDecimal value;

	public TransactionItem() {}
	
	public TransactionItem(String itemId, BigDecimal value) {
		this.itemId = itemId;
		this.value = value;
	}

	public String getItemId() {
		return itemId;
	}

	public void setItemId(String itemId) {
		this.itemId = itemId;
	}

	public BigDecimal getValue() {
		return value;
	}

	public void setValue(BigDecimal value) {
		this.value = value;
	}

	@Override
	public int hashCode() {
		return Objects.hash(itemId, value);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		TransactionItem other = (TransactionItem) obj;
		return Objects.equals(itemId, other.itemId) && Objects.equals(value, other.value);
	}

	@Override
	public String toString() {
		return "TransactionItem [itemId=" + itemId + ", value=" + value + "]";
	}
	
}
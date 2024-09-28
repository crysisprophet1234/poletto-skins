package com.poletto.polettoskins.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

public class TransactionItemDto implements Serializable {

	private static final long serialVersionUID = 1L;

    private String itemId;
    private BigDecimal value;

    public TransactionItemDto() {}

    public TransactionItemDto(String itemId, BigDecimal value) {
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
        TransactionItemDto other = (TransactionItemDto) obj;
        return Objects.equals(itemId, other.itemId) && Objects.equals(value, other.value);
    }

    @Override
    public String toString() {
        return "TransactionItemDto [itemId=" + itemId + ", value=" + value + "]";
    }
}

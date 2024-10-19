package com.poletto.polettoskins.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.poletto.polettoskins.dto.BalanceChangeDTO;
import com.poletto.polettoskins.entities.BalanceChange;

@Mapper(componentModel = "spring")
public interface BalanceMapper {
	
	BalanceMapper INSTANCE = Mappers.getMapper(BalanceMapper.class);
	
	BalanceChangeDTO toBalanceChangeDto(BalanceChange balanceChange);

	BalanceChange toBalanceChange(BalanceChangeDTO balanceChangeDto);

}

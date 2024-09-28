package com.poletto.polettoskins.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.poletto.polettoskins.dto.TransactionDto;
import com.poletto.polettoskins.entities.Transaction;

@Mapper(componentModel = "spring")
public interface TransactionMapper {

    TransactionMapper INSTANCE = Mappers.getMapper(TransactionMapper.class);

    TransactionDto toTransactionDto(Transaction transaction);

    Transaction toTransaction(TransactionDto transactionDto);
}
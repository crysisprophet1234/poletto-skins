package com.poletto.polettoskins.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.poletto.polettoskins.dto.DomainUserDto;
import com.poletto.polettoskins.entities.DomainUser;

@Mapper(componentModel = "spring")
public interface DomainUserMapper {

	DomainUserMapper INSTANCE = Mappers.getMapper(DomainUserMapper.class);

    DomainUserDto toDomainUserDto(DomainUser user);

    DomainUser toDomainUser(DomainUserDto userDto);
    
}
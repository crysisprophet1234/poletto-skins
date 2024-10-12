package com.poletto.polettoskins.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.poletto.polettoskins.dto.DomainUserDTO;
import com.poletto.polettoskins.entities.DomainUser;

@Mapper(componentModel = "spring")
public interface DomainUserMapper {

	DomainUserMapper INSTANCE = Mappers.getMapper(DomainUserMapper.class);

    DomainUserDTO toDomainUserDto(DomainUser user);

    DomainUser toDomainUser(DomainUserDTO userDto);
    
}
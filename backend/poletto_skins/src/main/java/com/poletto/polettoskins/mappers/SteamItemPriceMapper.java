package com.poletto.polettoskins.mappers;

import java.math.BigDecimal;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.poletto.polettoskins.entities.SteamItemPrice;
import com.poletto.polettoskins.entities.responses.SteamCommunityPriceOverviewResponse;

@Mapper
public interface SteamItemPriceMapper {
    SteamItemPriceMapper INSTANCE = Mappers.getMapper(SteamItemPriceMapper.class);
    
    @Mapping(target = "lowestPrice", expression = "java(parsePrice(response.getLowestPrice()))")
    @Mapping(target = "medianPrice", expression = "java(parsePrice(response.getMedianPrice()))")
    @Mapping(target = "quantitySoldLast24Hours", expression = "java(parseQuantity(response.getVolume()))")
    SteamItemPrice toSteamItemPrice(SteamCommunityPriceOverviewResponse response);
    
    default BigDecimal parsePrice(String priceStr) {
        if (priceStr == null || priceStr.isEmpty()) {
            return BigDecimal.ZERO;
        }
        String numericValue = priceStr.replace("R$", "").trim()
                                       .replace(".", "")
                                       .replace(",", ".");
        try {
            return new BigDecimal(numericValue);
        } catch (NumberFormatException e) {
            return BigDecimal.ZERO;
        }
    }
    
    default Integer parseQuantity(String volumeStr) {
        if (volumeStr == null || volumeStr.isEmpty()) {
            return 0;
        }
        String numericValue = volumeStr.replace(".", "").replace(",", "").trim();
        try {
            return Integer.parseInt(numericValue);
        } catch (NumberFormatException e) {
            return 0;
        }
    }
}
import { MarketItem } from '@/types/entities/steam-item'

export const extractItemId = (marketItem: MarketItem) => {
    const url = marketItem.item.inspectUrl
    return url?.split('%20')[1] || ''
}
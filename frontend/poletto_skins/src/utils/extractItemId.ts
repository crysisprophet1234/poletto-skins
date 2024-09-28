import { MarketItem } from '@/types/entities/steam-item'

export const extractItemId = (item: MarketItem) => {
    const url = item.inspectUrl
    return url?.split('%20')[1] || ''
}
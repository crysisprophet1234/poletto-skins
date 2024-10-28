import { MarketItem } from './steam-item'

type Inventory = {
    steamId: string
    itemCount: number
    totalSteamPrice: number
    items: MarketItem[]
}
import { SteamItem } from '@/entities/steam-item'

export type Listing = {
    id: string
    createdOn: Date
    userId: string
    listingPrice: number
    steamPrice: number
    discount: number
    status: 'ACTIVE' | 'SOLD' | 'CANCELLED'
    viewsCount: number
    favoritesCount: number
    item: SteamItem
}
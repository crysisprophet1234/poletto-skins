import { UUID } from 'crypto'

export type Item = {
    id: number | UUID
    name: string
    imageUrl: string
}

export type WeaponSkin = Item & {
    category: string
    subCategory: string
    statTrak: boolean
    floatShort: string
    floatFull: number
    stickerArray: Sticker[]
}

export type GloveSkin = Item & {
    category: 'Gloves'
    subCategory: string
    floatShort: string
    floatFull: number
}

export type KnifeSkin = Item & {
    category: 'Knifes'
    subCategory: string
    statTrak: boolean
    floatShort: string
    floatFull: number
}

export type Sticker = Item & {
    category: 'Stickers'
    rarity: 'Common' | 'Uncommon' | 'Rare' | 'Remarkable' | 'Exotic' | 'Extraordinary'
    finish: 'Regular' | 'Holo' | 'Foil' | 'Gold'
    eventOrCollection: string
    origin: 'Capsule' | 'Case' | 'Event Reward'
}

export type ItemType = WeaponSkin | Sticker | GloveSkin | KnifeSkin

export type SteamItemPrice = {
    lowestPrice: number
    medianPrice: number
    quantitySoldLast24Hours: number
}
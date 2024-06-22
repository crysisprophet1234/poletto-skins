export type Item = {
    id: number
    name: string
    imageUrl: string
    price: number
    steamPrice: number
    discount?: number
}

export type WeaponSkin = Item & {
    category: string
    weapon: string
    statTrak: boolean
    floatShort: string
    floatFull: number
    stickerArray: Sticker[]
}

export type GloveSkin = Item & {
    category: 'gloves'
    type: string
    floatShort: string
    floatFull: number
}

export type KnifeSkin = Item & {
    category: 'knifes'
    type: string
    floatShort: string
    floatFull: number
}

export type Sticker = Item & {
    rarity: 'Common' | 'Uncommon' | 'Rare' | 'Remarkable' | 'Exotic' | 'Extraordinary'
    finish: 'Regular' | 'Holo' | 'Foil' | 'Gold'
    eventOrCollection: string
    origin: 'Capsule' | 'Case' | 'Event Reward'
}

type SteamItem = {
    assetId: string
    ownerSteamId: string
    d: string
    m: string
    origin: number
    quality: number
    rarity: number
    paintSeed: number
    defIndex: number
    paintIndex: number
    floatId: string
    lowRank: string
    highRank: string
    floatValue: number
    imageUrl: string
    inspectUrl: string
    min: number
    max: number
    weaponType: string
    itemName: string
    rarityName: string
    qualityName: string
    originName: string
    wearName: string
    fullItemName: string
    stickers: SteamSticker[]
}

type SteamSticker = {
    stickerId: number
    slot: number
    imageUrl: string
    wear: number
    scale: number
    rotation: number
    codename: string
    material: string
    name: string
}

type SteamItemPrice = {
    lowestPrice: number
    medianPrice: number
    quantitySoldLast24Hours: number
}

export type MarketItem = {
    item: SteamItem
    price: SteamItemPrice
}
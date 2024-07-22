export type WearName = 'Factory New' | 'Minimal Wear' | 'Field-Tested' | 'Well-Worn' | 'Battle-Scarred'

export const itemWearAbbreviator = (wearName: WearName): string => {
    switch (wearName) {
        case 'Factory New':
            return 'FN'
        case 'Minimal Wear':
            return 'MW'
        case 'Field-Tested':
            return 'FT'
        case 'Well-Worn':
            return 'WW'
        case 'Battle-Scarred':
            return 'BS'
        default:
            return ''
    }
}
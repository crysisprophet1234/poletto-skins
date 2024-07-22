export const extractStickerFinish = (text: string) => {
    const match = text.match(/\(([^)]+)\)/)
    return match ? match[1] : null
}
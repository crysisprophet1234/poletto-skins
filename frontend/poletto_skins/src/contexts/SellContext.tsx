import { post } from '@/services/api'
import { MarketItem } from '@/types/entities/steam-item'
import { extractItemId } from '@/utils/extractItemId'
import { createContext, ReactNode, useState } from 'react'


type SellContextValue = {
    sellList: MarketItem[]
    isItemInSellList: (itemId: MarketItem['assetId']) => boolean
    addToSellList: (item: MarketItem) => void
    updateItemValue: (itemId: MarketItem['assetId'], value: number) => void
    confirmSelling: (userId: string) => Promise<void>
    removeFromSellList: (itemId: MarketItem['assetId']) => void
    clearSellList: () => void
    totalItems: number
    totalPrice: number
}

export const SellContext = createContext<SellContextValue>({
    sellList: [],
    isItemInSellList: () => { throw new Error('isItemInSellList function not implemented') },
    addToSellList: () => { throw new Error('addToSellList function not implemented') },
    updateItemValue: () => { throw new Error('updateItemValue function not implemented') },
    confirmSelling: () => { throw new Error('confirmSelling function not implemented') },
    removeFromSellList: () => { throw new Error('removeFromSellList function not implemented') },
    clearSellList: () => { throw new Error('clearSellList function not implemented') },
    totalItems: 0,
    totalPrice: 0,
})

type SellProviderProps = {
    children: ReactNode
}

export const SellProvider = ({ children }: SellProviderProps) => {

    const [sellList, setSellList] = useState<MarketItem[]>([])

    const isItemInSellList = (itemId: MarketItem['assetId']) => {
        return sellList.some((item) => item.assetId === itemId)
    }

    const addToSellList = (item: MarketItem) => {
        if (!isItemInSellList(item.assetId)) {
            setSellList([...sellList, item])
        }
    }

    const removeFromSellList = (itemId: MarketItem['assetId']) => {
        setSellList(sellList.filter((item) => item.assetId !== itemId))
    }

    const updateItemValue = (itemId: MarketItem['assetId'], value: number) => {
        setSellList(sellList.map(item =>
            item.assetId === itemId ? { ...item, price: value } : item
        ))
    }

    const clearSellList = () => setSellList([])

    const confirmSelling = async (userId: string) => {
        try {
            const items = sellList.map(item => ({
                itemId: extractItemId(item),
                value: parseFloat(item.price.toFixed(2))
            }))

            const requestData = {
                items: items,
                transactionType: 'INSTANT_SELL',
                tax: 8.00, //TODO: fixed tax value
                userId: userId
            }

            await post('/transactions', requestData)

            clearSellList()

        } catch (error) {
            console.error('Confirming selling failed:', error)
        }
    }

    const totalItems = sellList.length
    const totalPrice = sellList.reduce((acc, item) => acc + item.price, 0)

    return (
        <SellContext.Provider
            value={{
                sellList,
                isItemInSellList,
                addToSellList,
                confirmSelling,
                updateItemValue,
                removeFromSellList,
                clearSellList,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </SellContext.Provider>
    )
}
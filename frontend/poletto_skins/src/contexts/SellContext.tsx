import { post } from '@/services/api'
import { MarketItem } from '@/types/entities/steam-item'
import { extractItemId } from '@/utils/extractItemId'
import { createContext, ReactNode, useState } from 'react'


type SellContextValue = {
    sellList: MarketItem[]
    isItemInSellList: (itemId: MarketItem['assetId']) => boolean
    addToSellList: (item: MarketItem) => void
    updateItemValue: (itemId: MarketItem['assetId'], value: number) => void
    instantSell: (userId: string) => Promise<void>
    createListing: (userId: string) => Promise<void>
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
    instantSell: () => { throw new Error('instantSell function not implemented') },
    createListing: () => { throw new Error('createListing function not implemented') },
    removeFromSellList: () => { throw new Error('removeFromSellList function not implemented') },
    clearSellList: () => { throw new Error('clearSellList function not implemented') },
    totalItems: 0,
    totalPrice: 0,
})

type SellProviderProps = {
    children: ReactNode
}

//FIXME this obviously needs to be refactored

export const SellProvider = ({ children }: SellProviderProps) => {

    const [sellList, setSellList] = useState<MarketItem[]>([])

    const isItemInSellList = (itemId: MarketItem['assetId']) => {
        return sellList.some((marketItem) => marketItem.assetId === itemId)
    }

    const addToSellList = (marketItem: MarketItem) => {
        if (!isItemInSellList(marketItem.assetId)) {
            setSellList([...sellList, marketItem])
        }
    }

    const removeFromSellList = (itemId: MarketItem['assetId']) => {
        setSellList(sellList.filter((marketItem) => marketItem.assetId !== itemId))
    }

    const updateItemValue = (itemId: MarketItem['assetId'], value: number) => {
        setSellList(sellList.map(marketItem =>
            marketItem.assetId === itemId 
                ? { ...marketItem, lowestPrice: value } 
                : marketItem
        ))
    }

    const clearSellList = () => setSellList([])

    const instantSell = async (userId: string) => {
        try {
            const items = sellList.map(marketItem => ({
                itemId: extractItemId(marketItem),
                value: parseFloat(marketItem.lowestPrice.toFixed(2))
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
            console.error('Instant selling failed:', error)
        }
    }

    const createListing = async (userId: string) => {

        try {
            const items = sellList.map(marketItem => ({
                itemId: extractItemId(marketItem),
                value: parseFloat(marketItem.lowestPrice.toFixed(2))
            }))

            const requests = items.map(marketItem => {
                const requestData = {
                    userId: userId,
                    listingPrice: marketItem.value,
                    item: {
                        itemId: marketItem.itemId
                    }
                }
                return post('/listings', requestData)
            })

            await Promise.all(requests)

            clearSellList()
        } catch (error) {
            console.error('Create listing failed:', error)
        }
    }

    const totalItems = sellList.length
    const totalPrice = sellList.reduce((acc, marketItem) => acc + marketItem.lowestPrice, 0)

    return (
        <SellContext.Provider
            value={{
                sellList,
                isItemInSellList,
                addToSellList,
                instantSell,
                createListing,
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
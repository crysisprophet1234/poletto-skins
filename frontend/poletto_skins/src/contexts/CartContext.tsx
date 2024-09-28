import { post } from '@/services/api'
import { MarketItem } from '@/types/entities/steam-item'
import { extractItemId } from '@/utils/extractItemId'
import { createContext, ReactNode, useState } from 'react'

type CartContextValue = {
    cart: MarketItem[]
    isItemInCart: (itemId: MarketItem['assetId']) => boolean
    addToCart: (item: MarketItem) => void
    checkout: (userId: string) => void
    removeFromCart: (itemId: MarketItem['assetId']) => void
    clearCart: () => void
    totalItems: number
    totalPrice: number
}

export const CartContext = createContext<CartContextValue>({
    cart: [],
    isItemInCart: () => { throw new Error('isItemInCart function not implemented') },
    addToCart: () => { throw new Error('addToCart function not implemented') },
    checkout: () => { throw new Error('checkout function not implemented') },
    removeFromCart: () => { throw new Error('removeFromCart function not implemented') },
    clearCart: () => { throw new Error('clearCart function not implemented') },
    totalItems: 0,
    totalPrice: 0,
})

type CartProviderProps = {
    children: ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {

    const [cart, setCart] = useState<MarketItem[]>([])

    const isItemInCart = (itemId: MarketItem['assetId']) => {
        return cart.some((item) => item.assetId === itemId)
    }

    const addToCart = (item: MarketItem) => {
        if (!isItemInCart(item.assetId)) {
            setCart([...cart, item])
        }
    }

    const removeFromCart = (itemId: MarketItem['assetId']) => {
        setCart(cart.filter((item) => item.assetId !== itemId))
    }

    const clearCart = () => setCart([])

    const checkout = async (userId: string) => {

        try {
            const items = cart.map(item => ({
                itemId: extractItemId(item),
                value: parseFloat(item.price.toFixed(2))
            }))

            const requestData = {
                items: items,
                transactionType: 'PURCHASE',
                userId: userId
            }

            await post('/transactions', requestData)

            clearCart()

        } catch (error) {
            console.error('Purchase failed:', error)
        }
    }

    const totalItems = cart.length
    const totalPrice = cart.reduce((acc, item) => acc + item.price, 0)

    return (
        <CartContext.Provider
            value={{
                cart,
                isItemInCart,
                addToCart,
                checkout,
                removeFromCart,
                clearCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

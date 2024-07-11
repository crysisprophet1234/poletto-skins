import { ItemType } from '@/types/entities/item'
import { createContext, ReactNode, useState } from 'react'

type CartContextValue = {
    cart: ItemType[]
    isItemInCart: (itemId: ItemType['id']) => boolean
    addToCart: (item: ItemType) => void
    removeFromCart: (itemId: ItemType['id']) => void
    clearCart: () => void
    totalItems: number
    totalPrice: number
}

export const CartContext = createContext<CartContextValue>({
    cart: [],
    isItemInCart: () => { throw new Error('isItemInCart function not implemented') },
    addToCart: () => { throw new Error('addToCart function not implemented') },
    removeFromCart: () => { throw new Error('removeFromCart function not implemented') },
    clearCart: () => { throw new Error('clearCart function not implemented') },
    totalItems: 0,
    totalPrice: 0,
})

type CartProviderProps = {
    children: ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {

    const [cart, setCart] = useState<ItemType[]>([])

    const isItemInCart = (itemId: ItemType['id']) => {
        return cart.some((item) => item.id === itemId)
    }

    const addToCart = (item: ItemType) => {
        if (!isItemInCart(item.id)) {
            setCart([...cart, item])
        }
    }

    const removeFromCart = (itemId: ItemType['id']) => {
        setCart(cart.filter((item) => item.id !== itemId))
    }

    const clearCart = () => setCart([])

    const totalItems = cart.length
    const totalPrice = cart.reduce((acc, item) => acc + item.price, 0)

    return (
        <CartContext.Provider
            value={{
                cart,
                isItemInCart,
                addToCart,
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

import { post } from '@/services/api'
import { Listing } from '@/types/entities/listing'
import { createContext, ReactNode, useState } from 'react'

type CartContextValue = {
    cart: Listing[]
    isListingInCart: (listingId: Listing['id']) => boolean
    addToCart: (listing: Listing) => void
    checkout: (userId: string) => void
    removeFromCart: (listingId: Listing['id']) => void
    clearCart: () => void
    totalListings: number
    totalPrice: number
}

export const CartContext = createContext<CartContextValue>({
    cart: [],
    isListingInCart: () => { throw new Error('isListingInCart function not implemented') },
    addToCart: () => { throw new Error('addToCart function not implemented') },
    checkout: () => { throw new Error('checkout function not implemented') },
    removeFromCart: () => { throw new Error('removeFromCart function not implemented') },
    clearCart: () => { throw new Error('clearCart function not implemented') },
    totalListings: 0,
    totalPrice: 0,
})

type CartProviderProps = {
    children: ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {

    const [cart, setCart] = useState<Listing[]>([])

    const isListingInCart = (listingId: Listing['id']) => {
        return cart.some((listing) => listing.id === listingId)
    }

    const addToCart = (listing: Listing) => {
        if (!isListingInCart(listing.id)) {
            setCart([...cart, listing])
        }
    }

    const removeFromCart = (listingId: Listing['id']) => {
        setCart(cart.filter((listing) => listing.id !== listingId))
    }

    const clearCart = () => setCart([])

    const checkout = async (userId: string) => {

        try {
            const listings = cart.map(listing => ({
                id: listing.id
            }))

            const requestData = {
                listings,
                userId
            }

            await post('/transactions/checkout-cart', requestData)

            clearCart()

        } catch (error) {
            console.error('Purchase failed:', error)
        }
    }

    const totalListings = cart.length
    const totalPrice = cart.reduce((acc, listing) => {
        console.log(cart)
        return acc + listing.listingPrice
    }, 0)

    return (
        <CartContext.Provider
            value={{
                cart,
                isListingInCart,
                addToCart,
                checkout,
                removeFromCart,
                clearCart,
                totalListings,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

import { post } from '@/services/api'
import { Listing } from '@/types/entities/listing'
import { ApiError } from '@/types/vendor/api-error'
import { createContext, ReactNode, useState } from 'react'

type CheckoutSuccess = {
    message: string
    isSuccessful: boolean
}

type CartContextValue = {
    cart: Listing[]
    isListingInCart: (listingId: Listing['id']) => boolean
    addToCart: (listing: Listing) => void
    checkout: (userId: string) => Promise<void>
    checkoutSuccess: CheckoutSuccess
    setCheckoutSuccess: React.Dispatch<React.SetStateAction<{
        message: string;
        isSuccessful: boolean;
    }>>
    removeFromCart: (listingId: Listing['id']) => void
    clearCart: () => void
    totalListings: number
    totalPrice: number
}

export const CartContext = createContext<CartContextValue>({
    cart: [],
    isListingInCart: () => { throw new Error('isListingInCart function not implemented') },
    addToCart: () => { throw new Error('addToCart function not implemented') },
    checkout: async () => { throw new Error('checkout function not implemented') },
    checkoutSuccess: { message: '', isSuccessful: false },
    setCheckoutSuccess: () => { throw new Error('setCheckoutSuccess function not implemented') },
    removeFromCart: () => { throw new Error('removeFromCart function not implemented') },
    clearCart: () => { throw new Error('clearCart function not implemented') },
    totalListings: 0,
    totalPrice: 0
})

type CartProviderProps = {
    children: ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {

    const [cart, setCart] = useState<Listing[]>([])

    const [checkoutSuccess, setCheckoutSuccess] = useState({
        message: '',
        isSuccessful: false
    })

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

        setCheckoutSuccess({
            isSuccessful: false,
            message: ''
        })

        const listings = cart.map(listing => ({
            id: listing.id
        }))

        const requestData = {
            listings,
            userId
        }

        try {

            await post('/transactions/checkout-cart', requestData)

            setCheckoutSuccess({
                isSuccessful: true,
                message: 'Compra realizada com sucesso!'
            })

            clearCart()

        } catch (error) {

            console.error('Erro na função checkout:', error)

            setCheckoutSuccess({
                isSuccessful: false,
                message: `Erro ao realizar compra: ${(error as ApiError).response?.data.message || (error as Error).message}`
            })

        }
    }

    const totalListings = cart.length
    const totalPrice = cart.reduce((acc, listing) => {
        return acc + listing.listingPrice
    }, 0)

    return (
        <CartContext.Provider
            value={{
                cart,
                isListingInCart,
                addToCart,
                checkout,
                checkoutSuccess,
                setCheckoutSuccess,
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

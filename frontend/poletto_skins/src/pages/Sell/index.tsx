import Catalog from '@/components/Catalog'
import TopFilter from '@/components/TopFilter'
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'
import { get } from '@/services/api'
import { MarketItem, SteamItem } from '@/types/entities/steam-item'
import { Box, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'

type FilterData = {
    minPrice?: string,
    maxPrice?: string,
    minFloat?: string,
    maxFloat?: string,
    category?: string[],
    others?: string[],
    query?: string,
    sort?: string,
    favorite?: boolean
}

const Sell = () => {

    const { steamId } = useAuth()

    const { addToCart, removeFromCart, isItemInCart } = useCart()

    const handleAddCartButtonClick = (item: MarketItem) => {
        if (isItemInCart(item.assetId)) {
            removeFromCart(item.assetId)
        } else {
            addToCart(item)
        }
    }

    const [items, setItems] = useState<MarketItem[]>([])

    const [/*filterData*/, setFilterData] = useState<FilterData>()

    const handleFilterChange = (data: FilterData) => {
        setFilterData(prevFilterData => ({
            ...prevFilterData,
            ...data
        }))
    }

    const getUserItems = useCallback(async (steamId: string) => {
        try {
            const steamItemsFromUser = await get<SteamItem[]>('/getPlayerInventory', { steamId })

            // Mocking prices
            const marketItems = steamItemsFromUser.map(item => ({
                ...item,
                price: Math.random() * 100,
                steamPrice: Math.random() * 100,
                discount: Math.random() > 0.5 ? Math.random() * 20 : undefined,
            }))

            setItems(marketItems)
        } catch (error) {
            console.error(`Error trying to fetch steam user data: ${error}`)
        }
    }, [])

    useEffect(() => {
        if (steamId) {
            getUserItems(steamId)
        }
    }, [getUserItems, steamId])

    return (

        <Box display={'flex'} flexDirection={'row'} gap={2} height={'100%'}>

            <Box
                gap={2}
                display={'flex'}
                height={'100%'}
                width={'100%'}
                flexDirection={'column'}
                bgcolor={'#292733'}
                borderRadius={'5px'}
                p={2}
            >
                <div className='top-filter'>
                    <TopFilter onFilterChange={handleFilterChange} />
                </div>

                <Box
                    sx={{
                        overflowY: 'auto',
                        overflowX: 'hidden'
                    }}
                >
                    <Catalog items={items} itemAction={handleAddCartButtonClick} />
                </Box>

            </Box>

            <Box>
                <Typography variant='body1'>
                    Lista de Venda
                </Typography>
            </Box>

        </Box>

    )

}

export default Sell
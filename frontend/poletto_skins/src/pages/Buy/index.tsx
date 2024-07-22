import Catalog from '@/components/Catalog'
import MainFilter from '@/components/MainFilter'
import TopFilter from '@/components/TopFilter'
import { useCart } from '@/hooks/useCart'
import { get } from '@/services/api'
import { MarketItem, SteamItem } from '@/types/entities/steam-item'
import { Box } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import './styles.scss'

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

const Buy = () => {

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

    const getUserItems = useCallback(async () => {
        try {

            const mockSteamId = '76561198191317871'

            const steamItemsFromUser = await get<SteamItem[]>('/getPlayerInventory', { steamId: mockSteamId })

            // Mocking prices
            const marketItems = steamItemsFromUser.map(item => ({
                ...item,
                price: Math.random() * 100,
                steamPrice: Math.random() * 100,
                discount: Math.random() > 0.5 ? Math.random() * 20 : undefined
            }))

            setItems(marketItems)
        } catch (error) {
            console.error(`Error trying to fetch steam user data: ${error}`)
        }
    }, [])

    useEffect(() => {
        getUserItems()
    }, [getUserItems])

    return (

        <Box
            display={'flex'}
            flexDirection={'row'}
            gap={2}
            height={'100%'}
            width={'100%'}
            bgcolor={'#292733'}
            borderRadius={'5px'}
            p={2}
        >
            <MainFilter onFilterChange={handleFilterChange} />

            <Box
                gap={2}
                display={'flex'}
                height={'100%'}
                width={'100%'}
                flexDirection={'column'}
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

        </Box>

    )

}

export default Buy
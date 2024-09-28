import Cart from '@/components/Cart'
import Catalog from '@/components/Catalog'
import MainFilter from '@/components/MainFilter'
import TopFilter from '@/components/TopFilter'
import { useCart } from '@/hooks/useCart'
import { get } from '@/services/api'
import { MarketItem } from '@/types/entities/steam-item'
import { Box, Stack } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'

import { SpringPage } from '@/types/vendor/spring-page'
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

    const [items, setItems] = useState<SpringPage<MarketItem>>()

    const [filterData, setFilterData] = useState<FilterData>()

    const handleFilterChange = (data: FilterData) => {
        setFilterData(prevFilterData => ({
            ...prevFilterData,
            ...data
        }))
    }

    const getUserItems = useCallback(async () => {
        try {

            const steamItemsFromUser = await get<SpringPage<MarketItem>>('/items/search', { ...filterData })

            //TODO: Adicionando preços mock
            const itemsWithPrices = {
                ...steamItemsFromUser,
                content: steamItemsFromUser.content.map(item => ({
                    ...item,
                    price: Math.random() * 100,
                    steamPrice: Math.random() * 100,
                    discount: Math.random() > 0.5 ? Math.random() * 20 : undefined
                }))
            }

            setItems(itemsWithPrices)
        } catch (error) {
            console.error(`Error trying to fetch steam user data: ${error}`)
        }
    }, [filterData])

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
                <Stack direction={'row'} justifyContent={'space-between'} pr={'20px'}>
                    <TopFilter onFilterChange={handleFilterChange} />

                    <Cart />
                </Stack>

                <Box
                    sx={{
                        overflowY: 'auto',
                        overflowX: 'hidden'
                    }}
                >
                    <Catalog items={items!} itemAction={handleAddCartButtonClick} catalogType='buy' />
                </Box>

            </Box>

        </Box>

    )

}

export default Buy
import Catalog from '@/components/Catalog'
import SellList from '@/components/SellList'
import TopFilter from '@/components/TopFilter'
import { useAuth } from '@/hooks/useAuth'
import { useSell } from '@/hooks/useSell'
import { get } from '@/services/api'
import { SteamItemPrice } from '@/types/entities/item'
import { MarketItem, SteamItem } from '@/types/entities/steam-item'
import { SpringPage } from '@/types/vendor/spring-page'
import { extractItemId } from '@/utils/extractItemId'
import { Box } from '@mui/material'
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

    const { addToSellList, removeFromSellList, isItemInSellList } = useSell()

    const handleAddSellListButtonClick = (item: MarketItem) => {
        if (isItemInSellList(item.assetId)) {
            removeFromSellList(item.assetId)
        } else {
            addToSellList(item)
        }
    }

    const [items, setItems] = useState<SpringPage<MarketItem>>()

    const [/*filterData*/, setFilterData] = useState<FilterData>()

    const handleFilterChange = (data: FilterData) => {
        setFilterData(prevFilterData => ({
            ...prevFilterData,
            ...data
        }))
    }

    const getUserItems = useCallback(async (steamId: string) => {
        try {
            const steamItemsFromUser = await get<SteamItem[]>(`/users/steam/${steamId}/inventory`)

            const marketItemsPromises = steamItemsFromUser.map(async (item) => {
                try {
                    const priceData = await get<SteamItemPrice>(`/items/${extractItemId(item as MarketItem)}/market-price`)

                    return {
                        ...item,
                        price: priceData.lowestPrice,
                        steamPrice: priceData.medianPrice
                    } as MarketItem
                } catch (error) {
                    console.error(`Error fetching price for item ${item.assetId}: ${error}`)
                    return item as MarketItem
                }
            })

            const marketItems = await Promise.all(marketItemsPromises)

            //FIXME: provisory solution
            const marketItemsPage: SpringPage<MarketItem> = {
                content: marketItems,
                totalElements: marketItems.length,
                numberOfElements: marketItems.length,
                totalPages: 1,
                size: marketItems.length,
                number: 0,
                first: true,
                last: true,
                empty: false
            }

            setItems(marketItemsPage)
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
                    <Catalog items={items!} itemAction={handleAddSellListButtonClick} catalogType='sell' />
                </Box>

            </Box>

            <Box>
                <SellList />
            </Box>

        </Box>

    )

}

export default Sell
import SellCatalog from '@/components/SellCatalog'
import SellList from '@/components/SellList'
import TopFilter from '@/components/TopFilter'
import { useAuth } from '@/hooks/useAuth'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { useSell } from '@/hooks/useSell'
import { get } from '@/services/api'
import { MarketItem } from '@/types/entities/steam-item'
import { SpringPage } from '@/types/vendor/spring-page'
import { Box } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'

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

    const handleAddSellListButtonClick = (marketItem: MarketItem) => {
        if (isItemInSellList(marketItem.item.assetId)) {
            removeFromSellList(marketItem.item.assetId)
        } else {
            addToSellList(marketItem)
        }
    }

    const [marketItems, setMarketItems] = useState<SpringPage<MarketItem>>()

    const [/*filterData*/, setFilterData] = useState<FilterData>()

    const handleFilterChange = (data: FilterData) => {
        setFilterData(prevFilterData => ({
            ...prevFilterData,
            ...data
        }))
    }

    const { isXL, isLarge, isMedium } = useBreakpoint()

    const size = useMemo(() => {
        if (isXL) return 20
        if (isLarge) return 16
        if (isMedium) return 9
        return 9
    }, [isXL, isLarge, isMedium])

    const getUserItems = useCallback(async (steamId: string) => {

        try {
            const marketItemsPage = await get<SpringPage<MarketItem>>(`/users/steam/${steamId}/inventory?size=${size}`)
            setMarketItems(marketItemsPage)

        } catch (error) {
            console.error(`Error trying to fetch steam user data: ${error}`)
        }
    }, [size])

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
                    <SellCatalog marketItems={marketItems!} itemAction={handleAddSellListButtonClick} />
                </Box>

            </Box>

            <Box>
                <SellList />
            </Box>

        </Box>

    )

}

export default Sell
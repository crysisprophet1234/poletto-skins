import SellCatalog from '@/components/SellComponents/Catalog'
import TopFilter from '@/components/TopFilter'
import { useAuth } from '@/hooks/useAuth'
import { useSell } from '@/hooks/useSell'
import { get } from '@/services/api'
import { Inventory } from '@/types/entities/inventory'
import { MarketItem } from '@/types/entities/steam-item'
import { Box } from '@mui/material'
import SellList from '@sell/SellList'
import { useEffect, useState } from 'react'

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
        if (isItemInSellList(marketItem.assetId)) {
            removeFromSellList(marketItem.assetId)
        } else {
            addToSellList(marketItem)
        }
    }

    const [userInventory, setUserInventory] = useState<Inventory>()

    const [/* filterData */, setFilterData] = useState<FilterData>()

    const handleFilterChange = (data: FilterData) => {
        setFilterData(prevFilterData => ({
            ...prevFilterData,
            ...data
        }))
    }

    /*
    const { isXL, isLarge, isMedium } = useBreakpoint()

    const size = useMemo(() => {
        if (isXL) return 20
        if (isLarge) return 16
        if (isMedium) return 9
        return 9
    }, [isXL, isLarge, isMedium])
    */

    const getUserItems = async (steamId: string) => {

        try {
            const fetchedUserInventory = await get<Inventory>('/inventory', { steamId })
            if (fetchedUserInventory.items.length > 0) {
                setUserInventory(fetchedUserInventory)
            }
    
        } catch (error) {
            console.error(`Error trying to fetch steam user data: ${error}`)
        }
    }

    useEffect(() => {
        if (steamId) {
            getUserItems(steamId)
        }
    }, [steamId])

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
                    {userInventory && userInventory.items.length > 0 &&
                        <SellCatalog
                            marketItems={userInventory!.items}
                            itemAction={handleAddSellListButtonClick} />
                    }

                </Box>

            </Box>

            <Box>
                <SellList />
            </Box>

        </Box>

    )

}

export default Sell
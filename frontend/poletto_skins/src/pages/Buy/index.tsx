import MainFilter from '@/components/MainFilter'
import TopFilter from '@/components/TopFilter'
import { useCart } from '@/hooks/useCart'
import { get } from '@/services/api'
import { Box, Stack, Typography } from '@mui/material'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import { SpringPage } from '@/types/vendor/spring-page'
import { Listing } from '@/types/entities/listing'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import Catalog from '@buy/Catalog'
import Cart from '@buy/Cart'

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

    const { addToCart, removeFromCart, isListingInCart } = useCart()

    const handleAddCartButtonClick = useCallback((listing: Listing) => {
        if (isListingInCart(listing.id)) {
            removeFromCart(listing.id)
        } else {
            addToCart(listing)
        }
    }, [isListingInCart, addToCart, removeFromCart])

    const [listings, setListings] = useState<SpringPage<Listing> | null>(null)
    const [filterData, setFilterData] = useState<FilterData | null>(null)

    const handleFilterChange = (data: FilterData) => {
        setFilterData(prevFilterData => ({
            ...prevFilterData,
            ...data
        }))
    }

    const { isXL, isLarge, isMedium } = useBreakpoint()

    const size = useMemo(() => {
        if (isXL) return 24
        if (isLarge) return 16
        if (isMedium) return 12
        return 12
    }, [isXL, isLarge, isMedium])

    const fetchListings = useCallback(async () => {

        try {
            const listingsPage = await get<SpringPage<Listing>>('/listings', {
                ...filterData,
                size,
                status: 'ACTIVE'
            })
            setListings(listingsPage)
        } catch (error) {
            console.error(`Erro ao buscar anúncios: ${error}`)
        }
    }, [filterData, size])

    useEffect(() => {
        if (filterData) {
            fetchListings()
        }
    }, [fetchListings, filterData])

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
                        overflowX: 'hidden',
                        flexGrow: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 2
                    }}
                >
                    {listings && listings.totalElements == 0 ? (

                        <Box
                            display='flex'
                            flexDirection='column'
                            alignItems='center'
                            justifyContent='center'
                            textAlign='center'
                        >
                            <SentimentDissatisfiedIcon sx={{ fontSize: 80, mb: 2 }} />
                            <Typography variant='h6' gutterBottom>
                                Nenhum anúncio encontrado.
                            </Typography>
                            <Typography variant='body1'>
                                Tente ajustar seus filtros ou verifique novamente mais tarde.
                            </Typography>
                        </Box>

                    ) : (

                        <Catalog listings={listings!} listingAction={handleAddCartButtonClick} />
                        
                    )}

                </Box>

            </Box>

        </Box>

    )

}

export default Buy
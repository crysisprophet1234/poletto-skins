import { SpringPage } from '@/types/vendor/spring-page'
import { Box, Button, Grid, Skeleton } from '@mui/material'
import { useEffect, useState } from 'react'
import { Listing } from '@/types/entities/listing'
import ListingCard from '@/components/ListingCard'
import ListingModal from '../ListingModal'

type CatalogProps = {
    listings: SpringPage<Listing>
    listingAction: (listing: Listing) => void
}

const Catalog = ({ listings, listingAction }: CatalogProps) => {

    const [loading, setLoading] = useState(true)

    const [selectedListing, setSelectedListing] = useState<Listing>()

    const [open, setOpen] = useState(false)

    const handleOpen = (listing: Listing) => {
        setSelectedListing(listing)
        setOpen(true)
    }

    const handleClose = () => {
        setSelectedListing(undefined)
        setOpen(false)
    }

    useEffect(() => {
        if (listings && listings.content.length > 0) {
            setLoading(false)
        }
    }, [listings])

    return (

        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                overflow: 'auto',
                height: '100%',
                width: '100%',
                paddingRight: '16px',
                scrollbarGutter: 'stable',
                '&::-webkit-scrollbar': {
                    backgroundColor: '#555261',
                    borderRadius: '5px',
                    width: '5px',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#C85CD1',
                    borderRadius: '5px',
                },
            }}
        >
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}
            >
                <Grid container justifyContent='space-between' spacing={1} columns={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 18 }}>
                    {loading
                        ? Array.from(new Array(12)).map((_, index) => (
                            <Grid item xs={2} sm={4} md={4} lg={3} key={index} >
                                <Skeleton
                                    variant='rounded'
                                    animation='wave'
                                    height='344px'
                                />
                            </Grid>
                        ))
                        : listings.content.map((listing) => (
                            <Grid item xs={2} sm={4} md={4} lg={3} key={listing.id}>
                                <ListingCard
                                    listingProps={listing}
                                    key={listing.id}
                                    listingAction={() => listingAction(listing)}
                                    openModal={() => handleOpen(listing)}
                                />
                            </Grid>
                        ))}
                </Grid>
                <Button
                    sx={{
                        width: 'fit-content',
                        alignSelf: 'center',
                        color: '#FFF',
                        backgroundColor: '#806cf5',
                        borderRadius: '0.25rem',
                        transition: 'background-color 0.3s ease-in-out',
                        '&:hover': {
                            backgroundColor: '#9F8FFF',
                        },
                    }}
                >
                    Carregar mais {/*TODO*/}
                </Button>
            </Box>

            {selectedListing && 
                <ListingModal
                    open={open}
                    itemAction={() => listingAction(selectedListing)}
                    handleClose={handleClose}
                    listing={selectedListing}
                />                        
            }

        </Box>

    )

}

export default Catalog
import { SpringPage } from '@/types/vendor/spring-page'
import { Box, Button, Grid, Skeleton } from '@mui/material'
import { useEffect, useState } from 'react'
import { MarketItem } from '@/types/entities/steam-item'
import SellItemModal from '@sell/Catalog/ItemModal'
import ItemCard from '@sell/ItemCard'

type CatalogProps = {
    marketItems: SpringPage<MarketItem>
    itemAction: (marketItem: MarketItem) => void
}

const Catalog = ({ marketItems, itemAction }: CatalogProps) => {

    const [loading, setLoading] = useState(true)
    const [selectedItem, setSelectedItem] = useState<MarketItem>()
    const [open, setOpen] = useState(false)

    const handleOpen = (marketItem: MarketItem) => {
        setSelectedItem(marketItem)
        setOpen(true)
    }

    const handleClose = () => {
        setSelectedItem(undefined)
        setOpen(false)
    }

    useEffect(() => {
        if (marketItems && marketItems.content.length > 0) {
            setLoading(false)
        }
    }, [marketItems])

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
                    gap: 2,
                }}
            >
                <Grid container justifyContent='space-between' spacing={1} columns={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 16 }}>
                    {loading
                        ? Array.from(new Array(12)).map((_, index) => (
                            <Grid item xs={2} sm={4} md={4} lg={3} key={index}>
                                <Skeleton
                                    variant='rounded'
                                    animation='wave'
                                    height='344px'
                                />
                            </Grid>
                        ))
                        : marketItems.content.map((marketItem) => (
                            <Grid item xs={2} sm={4} md={4} lg={3} key={marketItem.item.assetId}>
                                <ItemCard
                                    itemProps={marketItem}
                                    key={marketItem.item.assetId}
                                    itemAction={() => itemAction(marketItem)}
                                    openModal={() => handleOpen(marketItem)}
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

            {
                selectedItem && 

                    <SellItemModal
                        open={open}
                        itemAction={() => itemAction(selectedItem)}
                        handleClose={handleClose}
                        marketItem={selectedItem}
                    />
            }
        </Box>
    )
}

export default Catalog
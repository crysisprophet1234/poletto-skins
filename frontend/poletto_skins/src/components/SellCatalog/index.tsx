import { SpringPage } from '@/types/vendor/spring-page'
import { Box, Button, Grid, Skeleton } from '@mui/material'
import { useEffect, useState } from 'react'

import SellItemCard from '../SellItemCard'
import { MarketItem } from '@/types/entities/steam-item'
import SellItemModal from '../SellItemModal'

type SellCatalogProps = {
    items: SpringPage<MarketItem>
    itemAction: (item: MarketItem) => void
}

const SellCatalog = ({ items, itemAction }: SellCatalogProps) => {
    const [loading, setLoading] = useState(true)
    const [selectedItem, setSelectedItem] = useState<MarketItem>()
    const [open, setOpen] = useState(false)

    const handleOpen = (item: MarketItem) => {
        setSelectedItem(item)
        setOpen(true)
    }

    const handleClose = () => {
        setSelectedItem(undefined)
        setOpen(false)
    }

    useEffect(() => {
        if (items && items.content.length > 0) {
            setLoading(false)
        }
    }, [items])

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
                <Grid container justifyContent='flex-start' spacing={1} columns={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 16 }}>
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
                        : items.content.map((item) => (
                            <Grid item xs={2} sm={4} md={4} lg={3} key={item.assetId}>
                                <SellItemCard
                                    sellItemProps={item}
                                    key={item.assetId}
                                    sellItemAction={() => itemAction(item)}
                                    openModal={() => handleOpen(item)}
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
                        item={selectedItem}
                    />
            }
        </Box>
    )
}

export default SellCatalog
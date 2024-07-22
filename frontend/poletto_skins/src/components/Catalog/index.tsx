import './styles.scss'

import ItemCard from '@/components/ItemCard'
import { MarketItem } from '@/types/entities/steam-item'
import { Box, Button, Grid, Skeleton } from '@mui/material'
import { useEffect, useState } from 'react'
import ItemModal from '../ItemModal'


type CatalogProps = {
    items: MarketItem[]
    itemAction: (item: MarketItem) => void
}

const Catalog = ({ items, itemAction }: CatalogProps) => {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (items && items.length > 0) {
            setLoading(false)
        }
    }, [items])

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

    return (

        <div className='catalog-main-container'>

            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                }}
            >
                <Grid container justifyContent='space-between' spacing={1} columns={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 16 }}>
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
                        : items.map((item) => (
                            <Grid item xs={2} sm={4} md={4} lg={3} key={item.assetId}>
                                <ItemCard
                                    itemProps={item}
                                    key={item.assetId}
                                    itemAction={() => itemAction(item)}
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
                            backgroundColor: '#9F8FFF'
                        }
                    }}
                >
                    Carregar mais {/*TODO*/}
                </Button>
            </Box>

            {
                selectedItem &&
                <ItemModal
                    open={open}
                    itemAction={() => itemAction(selectedItem)}
                    handleClose={handleClose}
                    item={selectedItem}
                />
            }

        </div>

    )

}

export default Catalog
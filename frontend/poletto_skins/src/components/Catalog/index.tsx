import './styles.scss'

import ItemCard from '@/components/ItemCard'
import { MarketItem } from '@/types/entities/steam-item'
import { SpringPage } from '@/types/vendor/spring-page'
import { Box, Button, Grid, Skeleton } from '@mui/material'
import { useEffect, useState } from 'react'
import ItemModal from '../ItemModal'
import SellItemCard from '../SellItemCard'


type CatalogProps = {
    items: SpringPage<MarketItem>
    itemAction: (item: MarketItem) => void
    catalogType: 'buy' | 'sell' | 'trade'
}

const Catalog = ({ items, itemAction, catalogType }: CatalogProps) => {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (items && items.content.length > 0) {
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
                <Grid container justifyContent='flex-start' spacing={1} columns={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 16 }}>
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
                        : items.content.map((item) => (
                            <Grid item xs={2} sm={4} md={4} lg={3} key={item.assetId}>

                                {(() => {
                                    switch (catalogType) {

                                        case 'buy':
                                            return (
                                                <ItemCard
                                                    itemProps={item}
                                                    key={item.assetId}
                                                    itemAction={() => itemAction(item)}
                                                    openModal={() => handleOpen(item)}
                                                />
                                            )

                                        case 'sell':
                                            return (
                                                <SellItemCard
                                                    sellItemProps={item}
                                                    key={item.assetId}
                                                    sellItemAction={() => itemAction(item)}
                                                    openModal={() => handleOpen(item)}
                                                />
                                            )
                                        default:
                                            return null
                                    }
                                })()}

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
                selectedItem && (
                    (() => {
                        switch (catalogType) {
                            case 'buy':
                                return (
                                    <ItemModal
                                        open={open}
                                        itemAction={() => itemAction(selectedItem)}
                                        handleClose={handleClose}
                                        item={selectedItem}
                                    />
                                )
                            case 'sell':
                                return null //TODO: create the sell modal  

                            default:
                                return null
                        }
                    })()
                )
            }

        </div>

    )

}

export default Catalog
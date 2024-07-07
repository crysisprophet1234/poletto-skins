import './styles.scss'

import { ItemType } from '@/types/entities/item'
import { Box, Grid, Skeleton } from '@mui/material'
import { useEffect, useState } from 'react'
import ItemCard from '../ItemCard'
import ItemModal from '../ItemModal'

type CatalogProps = {
    items: ItemType[]
}

const Catalog = ({ items }: CatalogProps) => {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (items && items.length > 0) {
            setLoading(false)
        }
    }, [items])

    const [selectedItem, setSelectedItem] = useState<ItemType>()

    const [open, setOpen] = useState(false)

    const handleOpen = (item: ItemType) => {
        setSelectedItem(item)
        setOpen(true)
    }

    const handleClose = () => {
        setSelectedItem(undefined)
        setOpen(false)
    }

    return (

        <div className='catalog-main-container'>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container justifyContent='space-between' spacing={1} columns={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 16 }}>
                    {loading
                        ? Array.from(new Array(12)).map((_, index) => (
                            <Grid item xs={2} sm={4} md={4} lg={3} key={index} >
                                <Skeleton variant='rounded' animation='wave' height='344px' />
                            </Grid>
                        ))
                        : items.map((item, index) => (
                            <Grid item xs={2} sm={4} md={4} lg={3} key={index}>
                                <ItemCard itemProps={item} key={item.id} openModal={() => handleOpen(item)} />
                            </Grid>
                        ))}
                </Grid>
            </Box>

            {selectedItem &&
                <ItemModal
                    open={open}
                    handleClose={handleClose}
                    item={selectedItem}
                />
            }

        </div>

    )

}

export default Catalog
import './styles.scss'

import { ItemType } from '@/types/entities/item'
import { Box, Grid } from '@mui/material'
import { useState } from 'react'
import ItemCard from '../ItemCard'
import ItemModal from '../ItemModal'

type CatalogProps = {
    items: ItemType[]
}

const Catalog = ({ items }: CatalogProps) => {

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
                    {items.map((item, index) => (
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
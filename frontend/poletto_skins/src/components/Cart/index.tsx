import { Box, ClickAwayListener, Popper } from '@mui/material'
import { useState } from 'react'
import ItemCartPopup from './ItemCartPopup'
import ShowCartButton from './ShowCartButton'

const Cart = () => {

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
    const [open, setOpen] = useState(false)

    const handleOutsideClick = () => {
        setOpen(false)
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
        setOpen(!open)
    }

    return (

        <ClickAwayListener onClickAway={handleOutsideClick}>

            <Box>

                <ShowCartButton handleClick={handleClick} />

                <Popper
                    id='cart-popper'
                    placement='bottom-end'
                    open={open}
                    anchorEl={anchorEl}
                >
                    <ItemCartPopup onClose={() => setOpen(false)} />
                </Popper>

            </Box>

        </ClickAwayListener >

    )

}

export default Cart
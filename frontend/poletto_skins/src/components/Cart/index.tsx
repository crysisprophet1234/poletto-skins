import { Box, ClickAwayListener, Popper } from '@mui/material'
import { useState } from 'react'
import BuyModal from '../BuyModal'
import ItemCartPopup from './ItemCartPopup'
import ShowCartButton from './ShowCartButton'

const Cart = () => {

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

    const [isCartOpen, setIsCartOpen] = useState(false)

    const [isBuyModalOpen, setIsBuyModalOpen] = useState(false)

    const handleOutsideClick = () => {
        setIsCartOpen(false)
    }

    const handleShowCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
        setIsCartOpen(!isCartOpen)
    }

    return (

        <ClickAwayListener onClickAway={handleOutsideClick}>

            <Box>

                <ShowCartButton handleClick={handleShowCartClick} />

                <Popper
                    id='cart-popper'
                    placement='bottom-end'
                    open={isCartOpen}
                    anchorEl={anchorEl}
                >
                    <ItemCartPopup onClose={() => setIsCartOpen(false)} onCheckout={() => setIsBuyModalOpen(!isBuyModalOpen)} />
                </Popper>

                <BuyModal
                    open={isBuyModalOpen}
                    handleClose={() => setIsBuyModalOpen(!isBuyModalOpen)}
                />

            </Box>

        </ClickAwayListener >

    )

}

export default Cart
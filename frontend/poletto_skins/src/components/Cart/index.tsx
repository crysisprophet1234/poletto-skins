import BuyModal from '@/components/BuyModal'
import ItemCartPopup from '@/components/Cart/ItemCartPopup'
import ShowCartButton from '@/components/Cart/ShowCartButton'
import { useAuth } from '@/hooks/useAuth'
import { Box, ClickAwayListener, Popper } from '@mui/material'
import { useState } from 'react'

const Cart = () => {

    const { isAuthenticated } = useAuth()

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

    const handleCheckout = () => {

        if (!isAuthenticated) {
            /* TODO:not working for some reason
            toast.warn('Usuário dever estar logado para fazer checkout!', {
                position: 'top-right',
                autoClose: 5000,
            })
            */
            alert('Usuário dever estar logado para fazer checkout!')
            return
        }
        setIsBuyModalOpen(true)

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
                    <ItemCartPopup onClose={() => setIsCartOpen(false)} onCheckout={handleCheckout} />
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
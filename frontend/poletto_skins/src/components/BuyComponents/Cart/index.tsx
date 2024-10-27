
import SnackbarAlert from '@/components/SnackbarAlert'
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'
import BuyConfirmationModal from '@buy/Cart/BuyConfirmationModal'
import ItemCartPopup from '@buy/Cart/ItemCartPopup'
import ShowCartButton from '@buy/Cart/ShowCartButton'
import { Box, ClickAwayListener, Popper } from '@mui/material'
import { useState } from 'react'

const Cart = () => {

    const { isAuthenticated } = useAuth()

    const { checkoutSuccess, setCheckoutSuccess } = useCart()

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

                <BuyConfirmationModal
                    open={isBuyModalOpen}
                    handleClose={() => setIsBuyModalOpen(!isBuyModalOpen)}
                />

                <SnackbarAlert
                    open={checkoutSuccess.message !== ''}
                    container={document.body}
                    timeout={8000}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    handleClose={() => setCheckoutSuccess({isSuccessful: false, message: ''})}
                    message={checkoutSuccess.message}
                    severity={checkoutSuccess.isSuccessful ? 'success' : 'error'}
                />

            </Box>

        </ClickAwayListener >

    )

}

export default Cart
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'
import { Close } from '@mui/icons-material'
import { Box, IconButton, Modal, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import BuyModalButton from './BuyModalButton'

type BuyModalProps = {
    open: boolean
    handleClose: () => void
}

const BuyModal = ({ open, handleClose }: BuyModalProps) => {

    const { totalItems, totalPrice, checkout } = useCart()

    const { user, refreshUser } = useAuth()

    const [loading, setLoading] = useState(false)

    const userHasEnoughBalance = user && Number(user.balance) > totalPrice

    const handleConfirm = async () => {
        if (!user) {
            //setError('User not authenticated.')
            return
        }

        setLoading(true)

        try {
            checkout(user.id)
            refreshUser()
            handleClose()
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='buy-modal'
            aria-describedby='buy-modal'
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: '#282633',
                borderRadius: '.5rem',
                boxShadow: 24,
                p: 4,
                outline: 0
            }}>

                <Stack
                    direction='column'
                    gap={1}
                >

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >

                        <Box>
                            <Typography
                                variant='h5'
                            >
                                Checkout
                            </Typography>
                        </Box>

                        <IconButton
                            onClick={handleClose}
                            sx={{
                                pt: 0,
                                pr: 0
                            }}
                        >
                            <Close
                                fontSize='large'
                                sx={{
                                    fill: '#817e8f',
                                    '&:hover': {
                                        fill: '#bbb9c7'
                                    }
                                }}
                            />
                        </IconButton>

                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography variant='h6'>
                            Você possui {' '}
                            <Box
                                component='span'
                                sx={{ color: '#806cf5' }}
                            >
                                {totalItems}
                            </Box>{' '}
                            {totalItems === 1 ? 'item' : 'itens'} no carrinho, somando o valor de{' '}
                            <Box
                                component='span'
                                sx={{ color: '#806cf5' }}
                            >
                                R${totalPrice.toFixed(2)}
                            </Box>
                        </Typography>
                        {userHasEnoughBalance ? (
                            <Typography variant='h6'>
                                Seu saldo após essa compra será de {' '}
                                <Box
                                    component='span'
                                    sx={{ color: '#806cf5' }}
                                >
                                    R${(Number(user?.balance) - totalPrice).toFixed(2)}
                                </Box>
                            </Typography>
                        ) : (
                            <Typography variant='h6'>
                                Você precisa adicionar {' '}
                                <Box
                                    component='span'
                                    sx={{ color: '#806cf5' }}
                                >
                                    R${(totalPrice - Number(user?.balance)).toFixed(2)}
                                </Box>
                                {' '} de saldo para finalizar essa compra.
                            </Typography>
                        )}


                    </Box>

                    {userHasEnoughBalance ? (
                        <Typography variant='h6' fontWeight={'600'} textAlign={'center'}>
                            Confirmar compra?
                        </Typography>
                    ) : (
                        <Typography variant='h6' fontWeight={'600'} textAlign={'center'}>
                            Adicionar saldo?
                        </Typography>
                    )}

                </Stack>

                <Box sx={{
                    marginTop: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '15px'
                }}>
                    <BuyModalButton
                        onClick={handleClose}
                        loading={loading}
                        text='RETORNAR'
                        color='#f05f75'
                        hoverColor='#ff8095'
                    />
                    <BuyModalButton
                        onClick={userHasEnoughBalance ? handleConfirm : () => alert('not implemented yet')}
                        loading={loading}
                        text={userHasEnoughBalance ? 'CONFIRMAR' : 'ADICIONAR'}
                        color='#806cf5'
                        hoverColor='#9F8FFF'
                    />
                </Box>

            </Box >
        </Modal >

    )

}

export default BuyModal
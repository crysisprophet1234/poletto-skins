import { Close } from '@mui/icons-material'
import { Box, Button, IconButton, Modal, Stack, Typography } from '@mui/material'
import { useCart } from '../../hooks/useCart'

type BuyModalProps = {
    open: boolean
    handleClose: () => void
}

const BuyModal = ({ open, handleClose }: BuyModalProps) => {

    const userBalanceMock = 12700.38

    const { totalItems, totalPrice } = useCart()

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
                        <Typography variant='h6'>
                            Seu saldo após essa compra será de {' '}
                            <Box
                                component='span'
                                sx={{ color: '#806cf5' }}
                            >
                                R${(userBalanceMock - totalPrice).toFixed(2)}
                            </Box>
                        </Typography>

                    </Box>

                    <Typography variant='h6' fontWeight={'600'} textAlign={'center'}>
                        Confirmar compra?
                    </Typography>

                </Stack>

                <Box sx={{
                    marginTop: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '15px'
                }}>
                    <Button
                        onClick={handleClose}
                        sx={{
                            color: '#FFF',
                            fontWeight: 'bold',
                            backgroundColor: '#f05f75',
                            width: 'calc(100% - 16px)',
                            '&:hover': {
                                backgroundColor: '#ff8095'
                            }
                        }}
                    >
                        RETORNAR
                    </Button>
                    <Button
                        onClick={() => alert('checkout not implemented yet')}
                        sx={{
                            color: '#FFF',
                            fontWeight: 'bold',
                            backgroundColor: '#806cf5',
                            width: 'calc(100% - 16px)',
                            '&:hover': {
                                backgroundColor: '#9F8FFF'
                            }
                        }}
                    >
                        CONFIRMAR
                    </Button>
                </Box>

            </Box >
        </Modal >

    )

}

export default BuyModal
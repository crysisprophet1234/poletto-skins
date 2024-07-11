import { AddShoppingCartRounded, Close } from '@mui/icons-material'
import { Box, Button, Grid, IconButton, Paper, Stack, Typography } from '@mui/material'
import { useCart } from '../../../hooks/useCart'
import ItemCartMiniature from './ItemCartMiniature'

type ItemCartPopupProps = {
    onClose: () => void
}

const ItemCartPopup = ({ onClose }: ItemCartPopupProps) => {

    const { cart, totalItems } = useCart()

    return (
        <Paper
            sx={{
                width: '515px',
                marginTop: 1,
                bgcolor: '#403D4D',
                paddingY: 2,
                paddingLeft: '24px',
                paddingRight: '12px',
                color: '#FFF'
            }}
        >
            <Stack
                direction={'column'}
                gap={1}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingRight: '8px'
                    }}
                >

                    <Box>
                        <Typography
                            variant='h5'
                        >
                            Carrinho
                        </Typography>
                        <Typography
                            variant='body2'
                            color={'#BCBCC2'}
                        >
                            Total items: {totalItems}
                        </Typography>
                    </Box>

                    <IconButton
                        onClick={onClose}
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

                <Box>

                    {totalItems == 0
                        ? (
                            <Stack
                                gap={1}
                                direction='column'
                                alignItems='center'
                            >
                                <AddShoppingCartRounded sx={{ fontSize: '50px' }} />

                                <Typography
                                    variant='body1'
                                    fontWeight='bold'
                                >
                                    Seu carrinho está vazio!
                                </Typography>

                                <Typography
                                    variant='body2'
                                >
                                    Os itens do mercado adicionados ao carrinho serão mostrados aqui.
                                </Typography>

                            </Stack>
                        ) : (
                            <Box
                                sx={{
                                    overflowY: 'auto',
                                    overflowX: 'hidden',
                                    maxHeight: '605px',
                                    paddingRight: '12px',
                                    scrollbarGutter: 'stable',
                                    scrollbarColor: '#555261',
                                    '&::-webkit-scrollbar': {
                                        width: '5px',
                                        borderRadius: '5px'
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        backgroundColor: '#C85CD1',
                                        borderRadius: '5px'
                                    },
                                    '&::-webkit-scrollbar-track': {
                                        backgroundColor: '#555261',
                                        borderRadius: '5px'
                                    },
                                    '&::-webkit-scrollbar-thumb:hover': {
                                        backgroundColor: '#D63FE9'
                                    }
                                }}
                            >
                                <Grid container spacing={1} columns={3} >

                                    {cart.map((item, index) => (
                                        <Grid item key={index} sm={1}>
                                            <ItemCartMiniature item={item} />
                                        </Grid>
                                    ))}

                                </Grid>
                            </Box>
                        )
                    }

                </Box>

                <Box mt={1}>
                    <Button
                        onClick={
                            totalItems == 0
                                ? () => onClose()
                                : () => alert('not implemented yet')
                        }
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
                        {
                            totalItems > 0
                                ? 'Finalizar compra'
                                : 'Ir para o Mercado'
                        }
                    </Button>
                </Box>

            </Stack>

        </Paper>
    )

}

export default ItemCartPopup
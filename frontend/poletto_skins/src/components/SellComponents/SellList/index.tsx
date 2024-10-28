import { useAuth } from '@/hooks/useAuth'
import { useSell } from '@/hooks/useSell'
import { Box, Button, Divider, Typography } from '@mui/material'
import { useState } from 'react'
import SellListItem from '@sell/SellList/SellListItem'
import SellConfirmationModal from '@sell/SellList/SellConfirmationModal'

const SellList = () => {

    const { sellList, totalItems, totalPrice } = useSell()

    const { user } = useAuth()

    const [isSellModalOpen, setIsSellModalOpen] = useState(false)

    const handleConfirmSelling = async () => {
        if (!user) return
        setIsSellModalOpen(true)
    }

    return (

        <Box
            sx={{
                minWidth: '350px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography variant='h6' sx={{ mb: 2 }}>
                Lista de Venda
            </Typography>

            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
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
                    },
                    mb: 2,
                }}
            >
                {sellList.map((marketItem, index) => (
                    <Box key={marketItem.assetId} sx={{ mb: 2, pr: 1 }}>

                        <SellListItem marketItem={marketItem} />

                        {index < sellList.length - 1 && sellList.length > 1 && (
                            <Divider
                                sx={{
                                    mt: 2,
                                    bgcolor: '#403D4D'
                                }}
                            />
                        )}

                    </Box>
                ))}
            </Box>

            <Box sx={{ mt: 'auto', pt: 2 }}>

                <Divider
                    sx={{
                        mb: 2,
                        bgcolor: '#403D4D'
                    }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant='body2'>
                        Total:
                    </Typography>
                    <Typography variant='body2'>
                        R$ {totalPrice.toFixed(2)}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <Typography variant='body1'>
                        Você ganha:
                    </Typography>
                    <Typography variant='body1'>
                        R$ {(totalPrice - (totalPrice * 0.10)).toFixed(2)}
                    </Typography>
                </Box>
                <Button
                    type='submit'
                    variant='contained'
                    fullWidth
                    onClick={handleConfirmSelling}
                    disabled={totalItems === 0}
                    sx={{
                        backgroundColor: '#806cf5',
                        '&:hover': {
                            backgroundColor: '#9F8FFF'
                        },
                        '&.Mui-disabled': {
                            backgroundColor: '#E0E0E0',
                            color: '#C1C1C1'
                        }
                    }}
                >
                    Confirmar Venda
                </Button>
            </Box>

            <SellConfirmationModal
                open={isSellModalOpen}
                handleClose={() => setIsSellModalOpen(!isSellModalOpen)}
            />

        </Box>

    )
}

export default SellList
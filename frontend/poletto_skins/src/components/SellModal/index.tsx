import { useAuth } from '@/hooks/useAuth'
import { useSell } from '@/hooks/useSell'
import { Close } from '@mui/icons-material'
import { Box, IconButton, Modal, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import BuyModalButton from '../BuyModal/BuyModalButton'

type SellModalProps = {
    open: boolean
    handleClose: () => void
}

const SellModal = ({ open, handleClose }: SellModalProps) => {

    const { totalItems, totalPrice, instantSell, createListing } = useSell()

    const { user, refreshUser } = useAuth()

    const [loading, setLoading] = useState(false)

    const handleAnnunciate = async () => {

        setLoading(true)

        try {
            await createListing(user?.id)
        } catch (error) {
            console.error('Failed to announce:', error)
        } finally {
            setLoading(false)
            refreshUser()
            handleClose()
        }
    }

    const handleInstantSell = async () => {

        setLoading(true)

        try {
            await instantSell(user?.id)
        } catch (error) {
            console.error('Failed to sell instantly:', error)
        } finally {
            setLoading(false)
            refreshUser()
            handleClose()
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='sell-modal'
            aria-describedby='sell-modal'
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
                <Stack direction='column' gap={1}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Box>
                            <Typography variant='h5'>Venda</Typography>
                        </Box>

                        <IconButton onClick={handleClose} sx={{ pt: 0, pr: 0 }}>
                            <Close fontSize='large' sx={{ fill: '#817e8f', '&:hover': { fill: '#bbb9c7' } }} />
                        </IconButton>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='h6'>           
                            Você possui <Box component='span' sx={{ color: '#806cf5' }}>{totalItems}</Box>{' '}
                            {totalItems === 1 ? 'item' : 'itens'} para vender, somando o valor de{' '}
                            <Box component='span' sx={{ color: '#806cf5' }}>
                                {totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </Box>
                            .
                        </Typography>
                    </Box>

                    <Typography variant='h6' fontWeight={'600'} textAlign={'center'}>
                        O que você deseja fazer?
                    </Typography>
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
                        onClick={handleAnnunciate}
                        loading={loading}
                        text='ANUNCIAR'
                        color='#806cf5'
                        hoverColor='#9F8FFF'
                    />
                    <BuyModalButton
                        onClick={handleInstantSell}
                        loading={loading}
                        text='VENDA INSTANTÂNEA'
                        color='#806cf5'
                        hoverColor='#9F8FFF'
                    />
                </Box>
            </Box >
        </Modal >
    )
}

export default SellModal
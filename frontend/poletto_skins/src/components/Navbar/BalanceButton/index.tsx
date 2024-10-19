import AddFundsModal from '@/components/AddFundsModal'
import { useAuth } from '@/hooks/useAuth'
import { AddCircle, WalletRounded } from '@mui/icons-material'
import { Box, IconButton, LinearProgress, Stack, Typography } from '@mui/material'
import { useState } from 'react'

const BalanceButton = () => {

    const { user } = useAuth()

    const [open, setOpen] = useState(false)

    return (

        <>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#292733',
                    borderRadius: '5px',
                    padding: '0px'
                }}
            >

                <Stack
                    direction={'row'}
                    spacing={1}
                    px={2}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    minWidth={'190px'}
                >
                    <WalletRounded fontSize='medium' />
                    <Typography variant='h6' color='#FFF'>
                        {user
                            ? <>{Number(user?.balance).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</>
                            : <LinearProgress
                                sx={{
                                    minWidth: '100px',
                                    borderRadius: '5px',
                                    backgroundColor: '#C85CD1',
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: '#d475db'
                                    }
                                }}
                            />
                        }
                    </Typography>

                </Stack>

                <IconButton
                    onClick={() => setOpen(true)}
                    sx={{
                        backgroundColor: '#C85CD1',
                        borderRadius: '0px 5px 5px 0px',
                        color: '#FFF',
                        height: '100%',
                        width: '50px',
                        '&:hover': {
                            backgroundColor: '#d475db'
                        }
                    }}
                >
                    <AddCircle fontSize='large' />
                </IconButton>

            </Box>

            <AddFundsModal open={open} onClose={() => setOpen(false)}/>

        </>

    )
}

export default BalanceButton
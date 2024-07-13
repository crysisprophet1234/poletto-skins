import { AddCircle, WalletRounded } from '@mui/icons-material'
import { Box, IconButton, Stack, Typography } from '@mui/material'

const BalanceButton = () => {

    const balanceValue = 37890.35

    return (

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
                justifyContent={'center'}
                alignItems={'center'}
            >
                <WalletRounded fontSize='medium' />
                <Typography variant='h6' color='#FFF'>
                    R${balanceValue.toFixed(2)}
                </Typography>
            </Stack>

            <IconButton
                onClick={() => alert('not yet implemented')}
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

    )
}

export default BalanceButton

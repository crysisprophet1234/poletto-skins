import { useAuth } from '@/hooks/useAuth'
import { Box, Button, Typography } from '@mui/material'
import { FaSteam } from 'react-icons/fa'

const LoginButton = () => {

    const { steamAuthRedirect } = useAuth()

    return (
        <Box
            sx={{
                height: '100%',
                alignContent: 'center'
            }}
        >
            <Button
                onClick={steamAuthRedirect}
                sx={{
                    gap: '10px',
                    height: '75%',
                    paddingX: '20px',
                    backgroundColor: '#806cf5',
                    '&:hover': {
                        backgroundColor: '#9f8fff'
                    }
                }}
            >
                <FaSteam
                    style={{
                        marginBottom: '2px',
                        fontSize: '18px',
                        fill: 'white'
                    }}
                />
                <Typography variant='button' color={'#FFF'}>
                    Login
                </Typography>
            </Button>
        </Box>
    )
}

export default LoginButton
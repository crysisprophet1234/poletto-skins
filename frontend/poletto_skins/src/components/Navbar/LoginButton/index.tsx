import { Box, Button, Typography } from '@mui/material'
import { FaSteam } from 'react-icons/fa'

type LoginButtonProps = {
    mockLogoff: () => void
}

const LoginButton = ({ mockLogoff }: LoginButtonProps) => {
    return (
        <Box
            sx={{
                height: '100%',
                alignContent: 'center'
            }}
        >
            <Button
                onClick={mockLogoff}
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
                        fill: 'black'
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
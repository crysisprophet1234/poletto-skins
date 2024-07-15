import LogoUrl from '@/assets/images/polettoskins-logo.png'
import BalanceButton from '@/components/Navbar/BalanceButton'
import LoginButton from '@/components/Navbar/LoginButton'
import NavbarButton from '@/components/Navbar/NavbarButton'
import NotificationMenu from '@/components/Navbar/NotificationMenu'
import ProfileMenu from '@/components/Navbar/ProfileMenu'
import { useAuth } from '@/hooks/useAuth'
import { FavoriteBorder } from '@mui/icons-material'
import { Box, Stack } from '@mui/material'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const { isAuthenticated } = useAuth()

    return (

        <Stack direction='row' justifyContent='space-between' height={'10%'} px={2} alignItems={'center'}>

            <Box>

                <Box
                    sx={{
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease-in-out',
                        '&:hover': {
                            transform: 'scale(1.05)'
                        }
                    }}
                >
                    <Link to='/'>
                        <img
                            src={LogoUrl}
                            alt='Poletto Skins Logo'
                        />
                    </Link>
                </Box>

            </Box>

            <Box height={'60%'}>

                {isAuthenticated ?

                    <Stack direction='row' spacing={3} height={'100%'}>

                        <NotificationMenu />

                        <NavbarButton onClick={() => alert('not yet implemented')} >
                            <FavoriteBorder />
                        </NavbarButton>

                        <BalanceButton />

                        <ProfileMenu />

                    </Stack>

                    :

                    <LoginButton />

                }

            </Box>

        </Stack>

    )

}

export default Navbar
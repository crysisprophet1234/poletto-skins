// components/AccessDenied.tsx
import { Box, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LoginButton from '../Navbar/LoginButton'

const AccessDenied = () => {

  return (

    <Box
      sx={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        padding: 2,
        backgroundColor: 'transparent',
      }}
    >
      <LockOutlinedIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />

      <Typography variant='h4' gutterBottom>
        Acesso Restrito
      </Typography>

      <Typography variant='body1' align='center' gutterBottom>
        Você precisa estar logado para acessar esta página.
      </Typography>

      <LoginButton />

    </Box>

  )

}

export default AccessDenied
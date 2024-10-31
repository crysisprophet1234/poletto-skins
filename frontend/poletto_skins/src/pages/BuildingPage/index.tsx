import { Box, Container, Typography, Paper } from '@mui/material'
import ConstructionIcon from '@mui/icons-material/Construction'
import BuildIcon from '@mui/icons-material/Build'

const BuildingPage = () => {

    return (

        <Container maxWidth='md' style={{ display: 'flex', height: '100%', flexDirection: 'column', alignItems: 'center', verticalAlign: 'center', padding: '2rem' }}>

            <Paper elevation={3} style={{ padding: '2rem', textAlign: 'center', width: '100%', backgroundColor: '#292733' }}>

                <Box display='flex' justifyContent='center' mb={2}>
                    <ConstructionIcon color='primary' style={{ fontSize: '4rem', margin: '0 0.5rem' }} />
                    <BuildIcon color='secondary' style={{ fontSize: '4rem', margin: '0 0.5rem' }} />
                </Box>

                <Typography variant='h4' color='#FFF' gutterBottom>
                    Esta página está em construção!
                </Typography>

                <Typography variant='subtitle1' color='#FFF'>
                    Estamos trabalhando para trazer novidades em breve.
                </Typography>

                <Box display='flex' justifyContent='center' mt={3}>
                    <ConstructionIcon color='primary' style={{ fontSize: '3rem', margin: '0 0.5rem' }} />
                    <BuildIcon color='secondary' style={{ fontSize: '3rem', margin: '0 0.5rem' }} />
                    <ConstructionIcon color='primary' style={{ fontSize: '3rem', margin: '0 0.5rem' }} />
                </Box>

            </Paper>

        </Container>
    )
}

export default BuildingPage

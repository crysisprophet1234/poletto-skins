import EditableInput from '@/components/FormComponents/EditableInput'
import FormInputText from '@/components/FormComponents/FormInputText'
import { useAuth } from '@/hooks/useAuth'
import { Avatar, Box, Divider, Grid, Link, Stack, Switch, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'


const User = () => {

    const { user, updateProfile } = useAuth()

    const { control, handleSubmit, reset, getValues } = useForm({
        defaultValues: {
            whatsapp: '(51) 91234-5678',
            email: user?.email || '',
            steamTradeUrl: 'https://steamcommunity.com/tradeoffer/new/?partner=391810592&token=XmWSIIo6',
        }
    })

    const onSubmitWhatsapp = () => {
        /* TODO: phone number */
        console.log('Saving new phone number:', getValues('whatsapp'))
    }

    const onSubmitEmail = () => {
        updateProfile('email', getValues('email'))
    }

    const onSubmitSteamTradeUrl = () => {
        /* TODO: steam trade url */
        console.log('Saving new Steam trade URL:', getValues('steamTradeUrl'))
    }

    return (
        <Box sx={{ padding: 3, backgroundColor: '#292733', borderRadius: 1, height: '100%' }}>

            <Grid container spacing={3}>

                <Grid item xs={12} md={6}>
                    <Box sx={{ backgroundColor: '#1c1a24', padding: 3, borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)' }}>

                        <Typography variant='h5' gutterBottom>Perfil</Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2 }}>
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >
                                <Avatar
                                    alt='Profile Picture'
                                    src={user?.steamUser.avatarMedium}
                                    sx={{ width: 64, height: 64, marginRight: 2 }}
                                />
                                <Typography variant='h6'>{user?.steamUser.personaName}</Typography>
                            </Box>

                            <Box mt={2} display={'flex'} flexDirection={'column'} gap={2}>

                                <Stack direction={'row'} gap={0}>
                                    <Typography variant='body1' width={'30%'}>
                                        Commission: {' '}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: '#806cf5',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        7%
                                    </Typography>
                                </Stack>

                                <Divider sx={{ backgroundColor: '#403D4D' }} />

                                <Stack direction={'row'}>
                                    <Typography variant='body1' width={'30%'}>
                                        Registration: {' '}
                                    </Typography>
                                    <Typography>
                                        17.07.2023
                                    </Typography>
                                </Stack>

                            </Box>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6}>

                    <Box sx={{ backgroundColor: '#1c1a24', padding: 3, borderRadius: 2, height: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)' }}>

                        <Typography variant='h5' gutterBottom>Informações de Contato</Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2 }}>

                            <Box mt={2} display={'flex'} flexDirection={'column'} gap={2}>

                                <Stack direction={'row'} gap={2} flexWrap={'nowrap'} alignItems={'center'}>
                                    <Typography variant='body1' width={'100px'}>
                                        Nome: {' '}
                                    </Typography>
                                    <Typography>
                                        {user?.steamUser.realName}
                                    </Typography>
                                </Stack>

                                <Divider sx={{ backgroundColor: '#403D4D' }} />

                                <EditableInput
                                    label='email'
                                    placeholder='Digite seu e-mail'
                                    control={control}
                                    reset={reset}
                                    onSave={handleSubmit(onSubmitEmail)}
                                    onConfirm={onSubmitEmail}
                                />

                                <Divider sx={{ backgroundColor: '#403D4D' }} />

                                <EditableInput
                                    label='whatsapp'
                                    placeholder='Digite seu número'
                                    control={control}
                                    reset={reset}
                                    onSave={handleSubmit(onSubmitWhatsapp)}
                                    onConfirm={onSubmitWhatsapp}
                                />

                            </Box>

                        </Box>

                    </Box>

                </Grid>

                <Grid item xs={12}>
                    <Box sx={{ backgroundColor: '#1c1a24', padding: 3, borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)' }}>

                        <Typography variant='h5' gutterBottom>Dados da Steam</Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2 }}>

                            <Box mt={2} display={'flex'} flexDirection={'column'} gap={2}>

                                <Stack direction={'row'} gap={2} flexWrap={'nowrap'} alignItems={'center'}>

                                    <Typography
                                        variant='body1'
                                        sx={{
                                            flexShrink: 0,
                                            width: '100px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        Trade Link: {' '}
                                    </Typography>

                                    <FormInputText
                                        name='steamTradeUrl'
                                        control={control}
                                        label='Steam Trade URL'
                                        placeholder='Enter your Steam trade URL'
                                    />

                                    <Link
                                        target='_blank'
                                        href='https://steamcommunity.com/id/me/tradeoffers/privacy#trade_offer_access_url'
                                        rel='noreferrer'
                                        underline='hover'
                                        sx={{
                                            color: '#806cf5',
                                            cursor: 'pointer',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        Obter Link
                                    </Link>

                                    <Link
                                        href='#'
                                        underline='hover'
                                        onClick={handleSubmit(onSubmitSteamTradeUrl)}
                                        sx={{
                                            color: '#806cf5',
                                            cursor: 'pointer',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        Salvar
                                    </Link>

                                </Stack>

                                <Divider sx={{ backgroundColor: '#403D4D' }} />

                                <Stack direction={'row'} gap={2} flexWrap={'nowrap'} alignItems={'center'}>

                                    <Typography
                                        variant='body1'
                                        sx={{
                                            flexShrink: 0,
                                            width: '100px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        SteamID: {' '}
                                    </Typography>

                                    <Typography variant='body1'>
                                        {user?.steamUser.steamId}
                                    </Typography>

                                </Stack>

                                <Divider sx={{ backgroundColor: '#403D4D' }} />

                                <Stack direction={'row'} gap={2} flexWrap={'nowrap'} alignItems={'center'}>

                                    <Typography
                                        variant='body1'
                                        sx={{
                                            flexShrink: 0,
                                            width: '100px',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        Permissões: {' '}
                                    </Typography>

                                    <Typography variant='body1'>
                                        Permitir uso de cookies da Sessão Steam
                                    </Typography>

                                    <Switch
                                        onChange={() => alert('not yet implemented') /* TODO: cookies usage */}
                                        checked={true}
                                        sx={{
                                            ml: 'auto',
                                            '& .MuiSwitch-switchBase': {
                                                color: '#806cf5',
                                                '&.Mui-checked': {
                                                    color: '#806cf5',
                                                    '& + .MuiSwitch-track': {
                                                        backgroundColor: '#806cf5',
                                                    },
                                                },
                                            },
                                            '& .MuiSwitch-track': {
                                                backgroundColor: '#e0e0e0',
                                            },
                                        }}
                                    />

                                </Stack>

                            </Box>

                        </Box>

                    </Box>

                </Grid>

            </Grid>

        </Box>
    )

}

export default User
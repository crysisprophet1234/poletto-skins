import { Edit, ExitToApp, Help, HistoryRounded, Sell } from '@mui/icons-material'
import { Avatar, Box, ClickAwayListener, IconButton, ListItemIcon, MenuItem, Paper, Popper } from '@mui/material'
import { useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'

const ProfileMenu = () => {

    const { steamUser, logout } = useAuth()

    const [imageLoading, setImageLoading] = useState(true)

    const [open, setOpen] = useState(false)

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
        setOpen(!open)
    }

    return (

        <ClickAwayListener onClickAway={() => setOpen(false)}>

            <Box
                sx={{
                    aspectRatio: '1 / 1',
                    height: '100%'
                }}
            >

                <IconButton
                    onClick={(e) => {
                        e.stopPropagation()
                        handleClick(e)
                    }}
                    disableRipple
                    sx={{
                        width: '100%',
                        height: '100%',
                        padding: 0,
                        '&:hover': {
                            filter: 'brightness(1.1)',
                            outline: '2px solid #5A5565'
                        }
                    }}
                >
                    {steamUser && steamUser.avatarMedium
                        ? <Avatar
                            src={steamUser?.avatarMedium}
                            alt={steamUser?.personaName}
                            onLoad={() => setImageLoading(false)}
                            sx={{
                                width: '100%',
                                height: '100%',
                                display: imageLoading ? 'none' : 'block'
                            }}
                        />
                        : <Avatar sx={{ width: '100%', height: '100%' }} />
                    }
                </IconButton>

                <Popper
                    id='profile-menu'
                    aria-labelledby='profile-menu'
                    placement='bottom-start'
                    open={open}
                    anchorEl={anchorEl}
                >
                    <Paper
                        elevation={6}
                        sx={{
                            backgroundColor: '#292733',
                            color: '#FFF',
                            marginTop: 1,
                            marginRight: 1,
                            py: 1,
                            '& .MuiListItemIcon-root': {
                                color: '#FFF'
                            }
                        }}
                    >

                        <MenuItem onClick={() => { }}>
                            <ListItemIcon>
                                <Edit />
                            </ListItemIcon>
                            Meu perfil
                        </MenuItem>

                        <MenuItem onClick={() => { }}>
                            <ListItemIcon>
                                <HistoryRounded />
                            </ListItemIcon>
                            Histórico
                        </MenuItem>

                        <MenuItem onClick={() => { }}>
                            <ListItemIcon>
                                <Sell />
                            </ListItemIcon>
                            Anúncios
                        </MenuItem>

                        <MenuItem onClick={() => { }}>
                            <ListItemIcon>
                                <Help />
                            </ListItemIcon>
                            Ajuda
                        </MenuItem>

                        <MenuItem onClick={logout}>
                            <ListItemIcon>
                                <ExitToApp />
                            </ListItemIcon>
                            Logoff
                        </MenuItem>

                    </Paper>

                </Popper>

            </Box>

        </ClickAwayListener>

    )

}

export default ProfileMenu
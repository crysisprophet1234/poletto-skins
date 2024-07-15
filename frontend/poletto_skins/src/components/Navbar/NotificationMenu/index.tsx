import NavbarButton from '@/components/Navbar/NavbarButton'
import { Notification } from '@/types/entities/notification'
import { Close } from '@mui/icons-material'
import { Badge, Box, ClickAwayListener, Divider, IconButton, Paper, Popper, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { IoNotificationsSharp } from 'react-icons/io5'

const NotificationMenu = () => {

    const notifications: Notification[] = [
        {
            'date': '2023-10-14 10:23',
            'title': 'Website in development',
            'description': 'This website is currently under development, please be patient and wait for new releases!'
        },
        {
            'date': '2023-09-25 08:15',
            'title': 'New Feature Available',
            'description': 'We have just released a new feature. Check it out now!'
        },
        {
            'date': '2023-11-05 14:10',
            'title': 'Update Successful',
            'description': 'Your profile has been successfully updated.'
        },
        {
            'date': '2023-12-01 02:30',
            'title': 'Scheduled Maintenance',
            'description': 'The website will be undergoing scheduled maintenance from 12:00 AM to 2:00 AM.'
        },
        {
            'date': '2023-07-23 09:45',
            'title': 'Welcome!',
            'description': 'Thank you for joining our platform. We are excited to have you!'
        },
        {
            'date': '2023-08-15 16:20',
            'title': 'New Message Received',
            'description': 'You have received a new message from John Doe.'
        },
        {
            'date': '2023-09-10 11:05',
            'title': 'Subscription Renewal',
            'description': 'Your subscription has been successfully renewed.'
        },
        {
            'date': '2023-10-30 07:50',
            'title': 'Security Alert',
            'description': 'A new device has logged into your account. If this wasn\'t you, please secure your account immediately.'
        },
        {
            'date': '2023-06-22 12:40',
            'title': 'Promotion Unlocked',
            'description': 'Congratulations! You have unlocked a new promotion. Check your account for details.'
        },
        {
            'date': '2023-11-19 18:55',
            'title': 'Feedback Request',
            'description': 'We would love to hear your feedback on our recent update. Please take a moment to share your thoughts.'
        }
    ]

    const [open, setOpen] = useState(false)

    const [badgeVisible, setBadgeVisible] = useState(true)

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
        setOpen(!open)
        setBadgeVisible(false)
    }

    return (

        <ClickAwayListener onClickAway={() => setOpen(false)}>

            <Box>

                <NavbarButton onClick={handleClick}>
                    <Badge
                        variant='dot'
                        invisible={!badgeVisible}
                        sx={{
                            '& .MuiBadge-badge': {
                                backgroundColor: '#C85CD1'
                            }
                        }}
                    >
                        <IoNotificationsSharp />
                    </Badge>
                </NavbarButton>

                <Popper
                    id='notification-popper'
                    placement='bottom'
                    open={open}
                    anchorEl={anchorEl}
                >
                    <Paper
                        sx={{
                            backgroundColor: '#292733',
                            color: '#FFF',
                            width: '400px',
                            marginTop: 1,
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        }}
                    >
                        <Stack direction='row' justifyContent='space-between' ml={2} py={1}>

                            <Typography variant='h5' py={1}>
                                Notificações
                            </Typography>

                            <IconButton onClick={() => setOpen(false)}>
                                <Close
                                    fontSize='large'
                                    sx={{
                                        fill: '#817e8f',
                                        '&:hover': {
                                            fill: '#bbb9c7'
                                        }
                                    }}
                                />
                            </IconButton>

                        </Stack>

                        <Box
                            sx={{
                                overflowY: 'auto',
                                overflowX: 'hidden',
                                maxHeight: '605px',
                                scrollbarGutter: 'stable',
                                scrollbarColor: '#555261',
                                '&::-webkit-scrollbar': {
                                    width: '5px'
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: '#C85CD1'
                                },
                                '&::-webkit-scrollbar-track': {
                                    backgroundColor: '#555261'
                                },
                                '&::-webkit-scrollbar-thumb:hover': {
                                    backgroundColor: '#D63FE9'
                                }
                            }}
                        >
                            <Stack direction='column'>
                                {notifications.map((notification, x) => (
                                    <Box
                                        key={x}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#5A5565'
                                            }
                                        }}>
                                        <Divider sx={{ backgroundColor: '#817e8f' }} />
                                        <Stack direction='column' mx={2} py={1} sx={{ cursor: 'pointer' }}>
                                            <Typography variant='h6'>{notification.title}</Typography>
                                            <Typography variant='caption' color='#747180'>{notification.date}</Typography>
                                            <Typography variant='body1' mt={1}>{notification.description}</Typography>
                                        </Stack>
                                    </Box>
                                ))}
                            </Stack>
                        </Box>

                    </Paper>

                </Popper>

            </Box>

        </ClickAwayListener>

    )
}

export default NotificationMenu
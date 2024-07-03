import './styles.scss'

import { Link } from 'react-router-dom'

import LogoUrl from '../../assets/images/polettoskins-logo.png'

import { FaUser } from "react-icons/fa"
import { GrAnnounce } from "react-icons/gr"
import { ImExit } from "react-icons/im"
import { IoIosHelpCircle, IoMdAddCircle } from 'react-icons/io'
import { IoNotificationsSharp } from 'react-icons/io5'
import { MdAccountBalanceWallet, MdFavorite, MdOutlineHistory } from 'react-icons/md'

import { SetStateAction, useEffect, useState } from 'react'

const Navbar = () => {

    const balanceValue = 37890.35

    const profilePictureUrl = 'https://loremflickr.com/250/250/dog'

    const isAuthenticated = true

    const [openMenu, setOpenMenu] = useState('none')

    const [notifications, setNotifications] = useState([
        {
            'isRead': true,
            'title': 'Website in development',
            'description': 'This website is currently under development, please be patient and wait for new releases!'
        },
        {
            'isRead': true,
            'title': 'New Feature Available',
            'description': 'We have just released a new feature. Check it out now!'
        },
        {
            'isRead': true,
            'title': 'Update Successful',
            'description': 'Your profile has been successfully updated.'
        },
        {
            'isRead': false,
            'title': 'Scheduled Maintenance',
            'description': 'The website will be undergoing scheduled maintenance from 12:00 AM to 2:00 AM.'
        },
        {
            'isRead': true,
            'title': 'Welcome!',
            'description': 'Thank you for joining our platform. We are excited to have you!'
        },
        {
            'isRead': false,
            'title': 'New Message Received',
            'description': 'You have received a new message from John Doe.'
        },
        {
            'isRead': true,
            'title': 'Subscription Renewal',
            'description': 'Your subscription has been successfully renewed.'
        },
        {
            'isRead': false,
            'title': 'Security Alert',
            'description': 'A new device has logged into your account. If this wasnt you, please secure your account immediately.'
        },
        {
            'isRead': true,
            'title': 'Promotion Unlocked',
            'description': 'Congratulations! You have unlocked a new promotion. Check your account for details.'
        },
        {
            'isRead': false,
            'title': 'Feedback Request',
            'description': 'We would love to hear your feedback on our recent update. Please take a moment to share your thoughts.'
        }
    ])

    const [isGlowing, setIsGlowing] = useState(false)

    useEffect(() => {
        setIsGlowing(false)
        notifications.forEach(x => {
            if (x.isRead == false) {
                setIsGlowing(true)
            }
        })
    }, [notifications])

    const readAll = () => {
        setNotifications(notifications.map(x => ({
            ...x,
            isRead: true
        })))
        console.log(notifications)
    }

    const changeMenuState = (menu: SetStateAction<string>) => {
        if (openMenu == menu) {
            setOpenMenu('none')
        } else {
            setOpenMenu(menu)
        }
    }

    return (

        <nav className='navbar'>

            <div className='navbar-left'>

                <div className='logo'>
                    <Link to='/'>
                        <img src={LogoUrl} alt='Poletto Skins Logo' />
                    </Link>
                </div>

            </div>

            <div className='navbar-center'>

            </div>

            <div className='navbar-right'>

                {isAuthenticated ?

                    <>

                        <div className='notification container glowing'
                            onClick={() => {
                                changeMenuState('notification')
                                readAll()
                            }}
                        >

                            <div className={`icon ${isGlowing ? 'glowing' : ''}`}>

                                <IoNotificationsSharp />

                            </div>

                            {openMenu == 'notification' && (

                                <div className='menu'>

                                    <div className='header'>
                                        <span>Notificações</span>
                                        <hr />
                                    </div>

                                    <ul>

                                        {/*TODO: slicing only first 5 elements, what to do in there are a lot of notifications? pagination maybe?*/}
                                        {notifications.slice(0, 5).map((notification, x) => {
                                            return (
                                                <li key={x}>
                                                    <span className='title'>{notification.title}</span>
                                                    <span className='date'>16/06/2024 19:11</span>
                                                    <span className='description'>{notification.description}</span>
                                                </li>
                                            )
                                        }
                                        )}

                                    </ul>

                                </div>

                            )}

                        </div>

                        <div className='favorite container'>

                            <div className='icon'>

                                <MdFavorite />

                            </div>

                        </div>

                        <div className='balance container'>

                            <div className='value'>
                                <MdAccountBalanceWallet /><span>R$ {balanceValue}</span>
                            </div>

                            <Link to='/add-funds'>
                                <div className='add-funds'>

                                    <IoMdAddCircle />

                                </div>
                            </Link>

                        </div>

                        <div className='profile'>

                            <div className='avatar'
                                onClick={() => changeMenuState('profile')}
                            >
                                <img src={profilePictureUrl} alt='Profile picture'></img>
                            </div>

                            {openMenu == 'profile' && (

                                <div className='menu'>

                                    <div className='user'>
                                        <span>Nome de Usuário</span>
                                        <hr />
                                    </div>

                                    <ul>
                                        <li>
                                            <Link to='/profile'>
                                                <FaUser />
                                                Perfil
                                            </Link>
                                        </li>

                                        <li>
                                            <Link to='/history'>
                                                <MdOutlineHistory />
                                                Histórico
                                            </Link>
                                        </li>

                                        <li>
                                            <Link to='/announces'>
                                                <GrAnnounce />
                                                Meus anúncios
                                            </Link>
                                        </li>

                                        <li>
                                            <Link to='/help'>
                                                <IoIosHelpCircle />
                                                Ajuda
                                            </Link>
                                        </li>

                                        <li className='exit'>
                                            <Link to='/exit'>
                                                <ImExit />
                                                Sair
                                            </Link>
                                        </li>
                                    </ul>

                                </div>

                            )}

                        </div>

                    </>

                    :

                    <>
                        <div className='login'>
                            <span>LOGIN</span>
                        </div>
                    </>

                }

            </div>

        </nav>

    )

}

export default Navbar
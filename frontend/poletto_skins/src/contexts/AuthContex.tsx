
import { SteamUser } from '@/types/vendor/steamUser'
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { get } from '../services/api'
import { steamAuth } from '../services/auth'

type AuthContextType = {
    isAuthenticated: boolean
    steamId: string | null,
    steamUser: SteamUser | null,
    steamAuthRedirect: () => void,
    login: (steamId: string) => void
    logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    steamId: null,
    steamUser: null,
    steamAuthRedirect: () => { throw new Error('steamAuthRedirect function not implemented') },
    login: () => { throw new Error('login function not implemented') },
    logout: () => { throw new Error('logout function not implemented') }
})

type AuthProviderProps = {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

    const navigate = useNavigate()

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const [steamId, setSteamId] = useState<string | null>(null)

    const [steamUser, setSteamUser] = useState<SteamUser | null>(null)

    const steamAuthRedirect = () => steamAuth()

    const login = (steamId: string) => {
        localStorage.setItem('steamId', steamId)
        setIsAuthenticated(true)
        navigate('/')
    }

    const logout = () => {
        localStorage.removeItem('steamId')
        setIsAuthenticated(false)
    }

    const fetchSteamProfile = useCallback(async (steamId: string) => {

        try {
            const response = await get<SteamUser>('/getPlayerInfo', { steamId })
            setSteamUser(response)
        } catch (error) {
            console.error(`Error trying to fetch steam user data: ${error}`)
        }

    }, [])

    useEffect(() => {
        if (isAuthenticated && steamId) {
            fetchSteamProfile(steamId)
        }
    }, [steamId, isAuthenticated, fetchSteamProfile])

    useEffect(() => {
        const steamId = localStorage.getItem('steamId')
        if (steamId) {
            setSteamId(steamId)
            setIsAuthenticated(true)
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                steamId,
                steamUser,
                steamAuthRedirect,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}
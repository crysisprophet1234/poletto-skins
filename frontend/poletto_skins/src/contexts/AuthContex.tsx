
import { get, put } from '@/services/api'
import { steamAuth } from '@/services/auth'
import { User } from '@/types/entities/user'
import { createContext, ReactNode, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type AuthContextType = {
    isAuthenticated: boolean
    steamId: string | null,
    user: User | null,
    refreshUser: () => void,
    updateProfile: (property: 'email' | 'phoneNumber' | 'steamTradeUrl', value: string) => void,
    steamAuthRedirect: () => void,
    login: (steamId: string) => void
    logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    steamId: null,
    user: null,
    refreshUser: () => { throw new Error('refreshUser function not implemented') },
    updateProfile: () => { throw new Error('updateProfile function not implemented') },
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

    const [user, setUser] = useState<User | null>(null)

    const steamAuthRedirect = () => steamAuth()

    const login = (steamId: string) => {
        localStorage.setItem('steamId', steamId)
        setIsAuthenticated(true)
        navigate('/')
    }

    const refreshUser = () => {
        if (isAuthenticated && steamId) {
            fetchSteamProfile(steamId)
        }
    }

    const logout = () => {
        localStorage.removeItem('steamId')
        setIsAuthenticated(false)
    }

    const fetchSteamProfile = useCallback(async (steamId: string) => {

        try {
            const response = await get<User>(`/users/steam/${steamId}`)
            setUser(response)
        } catch (error) {
            console.error(`Error trying to fetch steam user data: ${error}`)
        }

    }, [])

    const updateProfile = useCallback(async (property: 'email' | 'phoneNumber' | 'steamTradeUrl', value: string) => {
        try {
            const response = await put<User>(`/users/${user?.id}/${property}`, { [property]: value })
            setUser(response)
        } catch (error) {
            console.error(`Error trying to update user profile data: ${error}`)
        }
    }, [user])

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
                user,
                refreshUser,
                updateProfile,
                steamAuthRedirect,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const Login = () => {

    const { login } = useAuth()

    const [searchParams] = useSearchParams()

    useEffect(() => {

        const steamId = searchParams.get('steamId')

        if (steamId) {
            login(steamId)
        }

    }, [login, searchParams])

    return (
        <div>
            <p>Logging in...</p>
        </div>
    )
}

export default Login
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'


const Login = () => {

    const { login } = useAuth()

    const [searchParams, setSearchParams] = useSearchParams()

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
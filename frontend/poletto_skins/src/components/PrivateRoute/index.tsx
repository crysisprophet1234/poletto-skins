import { useAuth } from '@/hooks/useAuth'
import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

type PrivateRouteProps = {
    children: ReactNode
    redirectPath?: string
}

const PrivateRoute = ({ children, redirectPath = '/' }: PrivateRouteProps) => {

    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        return <Navigate to={redirectPath} replace />
    }

    return children
}

export default PrivateRoute
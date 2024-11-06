// components/PrivateRoute.tsx
import { useAuth } from '@/hooks/useAuth'
import { ReactNode } from 'react'
import AccessDenied from '@/components/AccessDenied'


type PrivateRouteProps = {
  children: ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <AccessDenied />
  }

  return <>{children}</>
}

export default PrivateRoute
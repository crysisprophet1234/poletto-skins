import { AuthContext } from '@/contexts/AuthContex'
import { useContext } from 'react'


export const useAuth = () => useContext(AuthContext)
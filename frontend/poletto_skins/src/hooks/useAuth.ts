import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContex'


export const useAuth = () => useContext(AuthContext)
// src/utils/jwtUtils.ts
import { jwtDecode } from 'jwt-decode'

interface JwtPayload {
  sub: string
  exp: number
  iat: number 
}

export const jwtUtils = {

  getSteamId: (token: string): string | null => {
    try {
      const decoded = jwtDecode<JwtPayload>(token)
      return decoded.sub
    } catch (error) {
      console.error('Erro ao decodificar token:', error)
      return null
    }
  },

  isTokenExpired: (token: string): boolean => {
    try {
      const decoded = jwtDecode<JwtPayload>(token)
      return decoded.exp * 1000 < Date.now()
    } catch (error) {
      return true
    }
  },

  getTokenInfo: (token: string): JwtPayload | null => {
    try {
      return jwtDecode<JwtPayload>(token)
    } catch (error) {
      console.error('Erro ao decodificar token:', error)
      return null
    }
  }
}
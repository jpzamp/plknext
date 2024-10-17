/* eslint-disable prettier/prettier */
'use client'

import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
  useCallback,
  useMemo,
} from 'react'
import { setCookie, destroyCookie, parseCookies } from 'nookies'

import { useRouter } from 'next/navigation'
import { PlkUser } from '../data/types/user'
import { api } from '../data/api'

interface AuthContextType {
  isAuthenticated: boolean
  login: (token: string, user: PlkUser) => void
  fetchUserInfo: (accessToken: string, customerId: string) => Promise<Response>
  logout: () => void
  token: string | null
  user: PlkUser | null
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => { },
  fetchUserInfo: () => { return new Promise(() => { }); },
  logout: () => { },
  token: null,
  user: null,
})

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<PlkUser | null>(null)
  const router = useRouter()

  const login = (jwtToken: string, userData: PlkUser) => {
    setCookie(null, 'plk_next_access_token', jwtToken, {
      maxAge: 30 * 24 * 60 * 60, // 30 dias
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
    setCookie(null, 'plk_next_user', JSON.stringify(userData), { path: '/' })
    setToken(jwtToken)
    setUser(userData)
  }

  const logout = useCallback(() => {
    destroyCookie(null, 'plk_next_access_token', { path: '/' })
    destroyCookie(null, 'plk_next_user', { path: '/' })
    setToken(null)
    setUser(null)
    router.push('/auth')
  }, [router])

  const fetchUserInfo = useCallback(async (accessToken: string,
    customerId: string) => {
    const response = await api(
      `/customer/v0.1/profile?customer_id=${customerId}`,
      {
        headers: {
          Authorization: accessToken,
        },
      },
      'API',
    )

    return response
  }, [])

  const handleVerifyToken = useCallback(async (storedToken: string, storedUser: PlkUser) => {
    setToken(storedToken)
    setUser(storedUser)

    const response = await fetchUserInfo(storedToken, storedUser.customerId)
    if (!response.ok) {
      logout() // Invalid token, need to re-login or refresh token (Not implemented yet)
    }
  }, [fetchUserInfo, logout])

  useEffect(() => {
    const cookies = parseCookies()
    const storedToken = cookies.plk_next_access_token
    const storedUser: PlkUser | null = cookies.plk_next_user ? JSON.parse(cookies.plk_next_user) : null

    if (storedToken && storedUser) handleVerifyToken(storedToken, storedUser)
  }, [handleVerifyToken])

  const isAuthenticated = useMemo(() => !!token && !!user, [token, user]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, fetchUserInfo, logout, token, user }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }

  return context
}

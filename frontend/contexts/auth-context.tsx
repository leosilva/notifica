"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type UserType = "student" | "admin"

export interface User {
  id: string
  name: string
  email: string
  type: UserType
  avatar?: string
  // TODO: BACKEND INTEGRATION - Adicionar campos do SUAP
  // matricula?: string (para estudantes)
  // siape?: string (para servidores)
  // curso?: string
  // campus?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, userType: UserType) => Promise<boolean>
  loginWithSuap: (userType: UserType) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: BACKEND INTEGRATION - Verificar token JWT válido
    // const token = localStorage.getItem("auth_token")
    // if (token) {
    //   validateToken(token).then(userData => {
    //     if (userData) setUser(userData)
    //   })
    // }

    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, userType: UserType): Promise<boolean> => {
    setIsLoading(true)

    try {
      // TODO: BACKEND INTEGRATION - Substituir por chamada real à API
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password, userType })
      // })
      //
      // if (!response.ok) {
      //   setIsLoading(false)
      //   return false
      // }
      //
      // const { user, token } = await response.json()
      // localStorage.setItem("auth_token", token)
      // setUser(user)

      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser: User = {
        id: "1",
        name: userType === "student" ? "João Silva" : "Admin Sistema",
        email,
        type: userType,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
      setIsLoading(false)
      return true
    } catch (error) {
      console.error("Erro no login:", error)
      setIsLoading(false)
      return false
    }
  }

  const loginWithSuap = async (userType: UserType): Promise<boolean> => {
    setIsLoading(true)

    try {
      // TODO: BACKEND INTEGRATION - Redirecionar para OAuth do SUAP
      // window.location.href = `/api/auth/suap/redirect?userType=${userType}&redirect=${window.location.origin}/dashboard`
      // return true // A função não retornará aqui pois haverá redirecionamento

      await new Promise((resolve) => setTimeout(resolve, 1500))

      const mockUser: User = {
        id: "2",
        name: userType === "student" ? "Maria Santos (SUAP)" : "Admin SUAP",
        email: "usuario@suap.edu.br",
        type: userType,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=suap-${userType}`,
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
      setIsLoading(false)
      return true
    } catch (error) {
      console.error("Erro no login SUAP:", error)
      setIsLoading(false)
      return false
    }
  }

  const logout = () => {
    // TODO: BACKEND INTEGRATION - Invalidar token no servidor
    // fetch('/api/auth/logout', { method: 'POST' })
    // localStorage.removeItem("auth_token")

    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ user, login, loginWithSuap, logout, isLoading }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

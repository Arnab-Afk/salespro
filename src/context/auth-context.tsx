'use client'
import { createContext, useContext, useState, useEffect } from "react"

type AuthContextType = {
  accessToken: string | null
  idToken: string | null
  setAuthData: (data: { 
    accessToken: string | null, 
    idToken: string | null
  }) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token')
    }
    return null
  })

  const [idToken, setIdToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('id_token')
    }
    return null
  })

  const setAuthData = (data: { 
    accessToken: string | null, 
    idToken: string | null
  }) => {
    setAccessToken(data.accessToken)
    setIdToken(data.idToken)
  }

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('auth_token', accessToken)
    } else {
      localStorage.removeItem('auth_token')
    }

    if (idToken) {
      localStorage.setItem('id_token', idToken)
    } else {
      localStorage.removeItem('id_token')
    }
  }, [accessToken, idToken])

  return (
    <AuthContext.Provider value={{ 
      accessToken, 
      idToken, 
      setAuthData 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

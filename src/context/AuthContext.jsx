import { useState } from "react"
import { loginUser } from "../services/authService"
import { AuthContext } from "./AuthContextInstance"

export function AuthProvider({ children }) {

  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState(token ? { logged: true } : null)

  async function login(credentials) {

    const data = await loginUser(credentials)

    localStorage.setItem("token", data.token)

    setToken(data.token)
    setUser({ logged: true })
  }

  function logout() {

    localStorage.removeItem("token")

    setToken(null)
    setUser(null)

  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
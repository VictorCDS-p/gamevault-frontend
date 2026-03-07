import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import Input from "../components/ui/Input"
import Button from "../components/ui/Button"

import { loginUser } from "../services/authService"

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    setError("")
    setLoading(true)

    try {

      await loginUser({
        email,
        password
      })

      navigate("/games")

    } catch (error) {

      setError("Email ou senha inválidos.")

      console.error(error)

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">

      <h1>Entrar</h1>

      {error && (
        <div className="auth-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seuemail@exemplo.com"
        />

        <Input
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
        />

        <Button type="submit">
          {loading ? "Entrando..." : "Entrar"}
        </Button>

      </form>

      <p style={{ marginTop: "16px" }}>
        Não tem uma conta?{" "}
        <Link to="/register">
          Criar conta
        </Link>
      </p>

    </div>
  )
}
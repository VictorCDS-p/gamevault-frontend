import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import Input from "../components/ui/Input"
import Button from "../components/ui/Button"

import { registerUser } from "../services/authService"

export default function Register() {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    setError("")
    setSuccess("")
    setLoading(true)

    try {

      await registerUser({
        username,
        email,
        password
      })

      setSuccess("Conta criada com sucesso! Redirecionando...")

      setTimeout(() => {
        navigate("/login")
      }, 1500)

    } catch (error) {

      setError("Erro ao criar conta. Verifique os dados.")

      console.error(error)

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">

      <h1>Criar Conta</h1>

      {error && (
        <div className="auth-error">
          {error}
        </div>
      )}

      {success && (
        <div className="auth-success">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <Input
          label="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Seu nome de usuário"
        />

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
          placeholder="Crie uma senha"
        />

        <Button type="submit">
          {loading ? "Criando..." : "Criar conta"}
        </Button>

      </form>

      <p style={{ marginTop: "16px" }}>
        Já possui conta?{" "}
        <Link to="/login">
          Entrar
        </Link>
      </p>

    </div>
  )
}
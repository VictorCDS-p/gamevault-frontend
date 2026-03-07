import { useEffect, useState } from "react"

import Input from "../components/ui/Input"
import Button from "../components/ui/Button"
import Card from "../components/ui/Card"

import api from "../services/api"

export default function Profile() {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")

  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    loadProfile()
  }, [])

  async function loadProfile() {
    try {

      const response = await api.get("/users/me")

      setUsername(response.data.username)
      setEmail(response.data.email)

    } catch {

      setError("Erro ao carregar perfil.")

    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    setError("")
    setMessage("")

    try {

      await api.put("/users/me", {
        username,
        email
      })

      setMessage("Perfil atualizado com sucesso!")

    } catch {

      setError("Erro ao atualizar perfil.")

    }
  }

  async function handleDelete() {

    const confirmDelete = confirm("Tem certeza que deseja deletar sua conta?")

    if (!confirmDelete) return

    try {

      await api.delete("/users/me")

      localStorage.removeItem("token")

      window.location.href = "/register"

    } catch {

      setError("Erro ao deletar conta.")

    }
  }

  if (loading) {
    return <p>Carregando perfil...</p>
  }

  return (
    <div>

      <h1>Perfil</h1>

      <Card>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {message && (
          <div className="auth-success">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <Input
            label="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button type="submit">
            Salvar alterações
          </Button>

        </form>

        <hr style={{ margin: "20px 0" }} />

        <Button
          variant="danger"
          onClick={handleDelete}
        >
          Deletar conta
        </Button>

      </Card>

    </div>
  )
}
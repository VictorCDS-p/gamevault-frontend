import { useState } from "react"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"

import { loginUser } from "../services/authService"

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    try {

      await loginUser({
        email,
        password
      })

      alert("Login successful!")

      // futuramente redirecionar
      window.location.href = "/games"

    } catch (error) {

      alert("Login failed")

      console.error(error)

    }
  }

  return (
    <div className="auth-page">

      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
        />

        <Button type="submit">
          Login
        </Button>

      </form>

    </div>
  )
}
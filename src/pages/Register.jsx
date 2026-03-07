import { useState } from "react"

import Input from "../components/ui/Input"
import Button from "../components/ui/Button"

import { registerUser } from "../services/authService"

export default function Register() {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    try {

      await registerUser({
        username,
        email,
        password
      })

      alert("User created successfully!")

      window.location.href = "/login"

    } catch (error) {

      alert("Registration failed")

      console.error(error)

    }
  }

  return (
    <div className="auth-page">

      <h1>Register</h1>

      <form onSubmit={handleSubmit}>

        <Input
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your username"
        />

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
          placeholder="Create a password"
        />

        <Button type="submit">
          Register
        </Button>

      </form>

    </div>
  )
}
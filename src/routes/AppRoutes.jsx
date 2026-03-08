import { Routes, Route, Navigate } from "react-router-dom"

import Navbar from "../components/layout/Navbar"
import Container from "../components/layout/Container"
import '../index.css'

import Login from "../pages/Login"
import Register from "../pages/Register"
import Games from "../pages/Games"
import Library from "../pages/Library"
import Collections from "../pages/Collections"
import Profile from "../pages/Profile"

function Layout({ children }) {

  function handleLogout() {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  return (
    <div className="app-layout">

      <Navbar onLogout={handleLogout} />

      <div className="main-layout">

        <Container>
          {children}
        </Container>

      </div>

    </div>
  )
}

function PrivateRoute({ children }) {

  const token = localStorage.getItem("token")

  return token ? children : <Navigate to="/login" />
}

export default function AppRoutes() {

  return (

    <Routes>


      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />



      <Route
        path="/games"
        element={
          <PrivateRoute>
            <Layout>
              <Games />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/library"
        element={
          <PrivateRoute>
            <Layout>
              <Library />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/collections"
        element={
          <PrivateRoute>
            <Layout>
              <Collections />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Layout>
              <Profile />
            </Layout>
          </PrivateRoute>
        }
      />



      <Route path="*" element={<Navigate to="/games" />} />

    </Routes>

  )
}
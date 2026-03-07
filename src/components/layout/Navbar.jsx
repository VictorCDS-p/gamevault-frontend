import Button from "../ui/Button"

export default function Navbar({ onLogout }) {
  return (
    <nav className="navbar">

      <div className="navbar-left">
        <h2>🎮 GameVault</h2>
      </div>

      <div className="navbar-right">
        <Button variant="secondary" onClick={onLogout}>
          Logout
        </Button>
      </div>

    </nav>
  )
}
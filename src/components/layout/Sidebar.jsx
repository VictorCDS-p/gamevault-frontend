import { Link } from "react-router-dom"

export default function Sidebar() {

  return (
    <aside className="sidebar">

      <ul>

        <li>
          <Link to="/games">
            Games
          </Link>
        </li>

        <li>
          <Link to="/library">
            Library
          </Link>
        </li>

        <li>
          <Link to="/collections">
            Collections
          </Link>
        </li>

        <li>
          <Link to="/profile">
            Profile
          </Link>
        </li>

      </ul>

    </aside>
  )
}
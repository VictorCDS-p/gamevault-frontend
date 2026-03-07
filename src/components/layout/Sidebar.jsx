import { Link } from "react-router-dom"

export default function Sidebar() {

  return (
    <aside className="sidebar">

      <ul>

        <li>
          <Link to="/games">
            Jogos
          </Link>
        </li>

        <li>
          <Link to="/library">
            Biblioteca
          </Link>
        </li>

        <li>
          <Link to="/collections">
            Coleções
          </Link>
        </li>

        <li>
          <Link to="/profile">
            Perfil
          </Link>
        </li>

      </ul>

    </aside>
  )
}
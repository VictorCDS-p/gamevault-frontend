import { Link, useLocation } from "react-router-dom";
import Button from "../ui/Button.jsx";
import { MdLogout, MdGames, MdLibraryBooks, MdCollectionsBookmark, MdPerson } from "react-icons/md";

export default function Navbar({ onLogout }) {
  const location = useLocation();

  const links = [
    { to: "/games", label: "Jogos", icon: <MdGames className="text-lg" /> },
    { to: "/library", label: "Biblioteca", icon: <MdLibraryBooks className="text-lg" /> },
    { to: "/collections", label: "Coleções", icon: <MdCollectionsBookmark className="text-lg" /> },
    { to: "/profile", label: "Perfil", icon: <MdPerson className="text-lg" /> },
  ];

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-slate-200 dark:bg-surface rounded-b-xl shadow-md border-b border-slate-300 dark:border-slate-800">
      
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-3xl text-primary">videogame_asset</span>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          GameVault
        </h2>
      </div>

      <ul className="flex items-center gap-4">
        {links.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-primary/20 dark:bg-primary/30 text-primary"
                    : "text-slate-900 dark:text-slate-100 hover:bg-primary/10 dark:hover:bg-primary/20"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <Button
        variant="secondary"
        onClick={onLogout}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-400 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
      >
        <MdLogout className="text-lg" />
        Sair
      </Button>

    </nav>
  );
}
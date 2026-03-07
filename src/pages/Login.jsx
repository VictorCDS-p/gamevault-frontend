import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginUser({ email, password });
      navigate("/games");
    } catch (err) {
      setError("Email ou senha inválidos.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-steam-gradient">
      <div className="mb-8 flex flex-col items-center">
        <div className="bg-primary/20 p-3 rounded-xl mb-4">
          <span className="material-symbols-outlined text-primary text-5xl">
            videogame_asset
          </span>
        </div>
        <h1 className="text-slate-900 dark:text-slate-100 text-4xl font-bold tracking-tight">
          GameVault
        </h1>
      </div>

      <div className="w-full max-w-[400px] bg-slate-200 dark:bg-surface p-8 rounded-lg shadow-2xl border border-slate-300 dark:border-slate-800">
        <h2 className="text-slate-900 dark:text-slate-100 text-xl font-semibold mb-6 uppercase tracking-wider">
          Entrar
        </h2>

        {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-slate-700 dark:text-primary text-xs font-bold uppercase tracking-widest">
              Email
            </label>
            <input
              type="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-100 dark:bg-accent border border-slate-400 dark:border-slate-900 rounded text-slate-900 dark:text-slate-100 px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-2 relative">
            <label className="text-slate-700 dark:text-primary text-xs font-bold uppercase tracking-widest">
              Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-100 dark:bg-accent border border-slate-400 dark:border-slate-900 rounded text-slate-900 dark:text-slate-100 px-4 pr-10 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center justify-center text-slate-500 hover:text-primary"
              >
                {showPassword ? (
                  <MdVisibilityOff className="text-xl" />
                ) : (
                  <MdVisibility className="text-xl" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-blue-gradient hover:opacity-90 text-white font-semibold py-3 rounded shadow-lg transition-all transform active:scale-[0.98]"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-300 dark:border-slate-800 flex flex-col items-center gap-4">
          <Link
            className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
            to="#"
          >
            Esqueceu sua senha?
          </Link>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <p className="text-slate-600 dark:text-slate-400 text-sm">Não tem uma conta?</p>
        <Link
          to="/register"
          className="inline-flex items-center px-6 py-2 border border-slate-400 dark:border-slate-700 rounded text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-sm font-medium"
        >
          Criar Conta
        </Link>
      </div>
    </div>
  );
}
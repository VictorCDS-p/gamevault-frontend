import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

import { registerUser } from "../services/authService";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await registerUser({ username, email, password });
      setSuccess("Conta criada com sucesso! Redirecionando...");

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError("Erro ao criar conta. Verifique os dados.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-steam-gradient">
      <div className="w-full max-w-[400px] bg-slate-200 dark:bg-surface p-8 rounded-lg shadow-2xl border border-slate-300 dark:border-slate-800">
        <h1 className="text-slate-900 dark:text-slate-100 text-2xl font-bold mb-6 text-center">
          Criar Conta
        </h1>

        {error && <div className="text-red-500 mb-4 text-sm text-center">{error}</div>}
        {success && <div className="text-green-500 mb-4 text-sm text-center">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-slate-700 dark:text-primary text-xs font-bold uppercase tracking-widest">
              Usuário
            </label>
            <input
              type="text"
              placeholder="Seu nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-slate-100 dark:bg-accent border border-slate-400 dark:border-slate-900 rounded text-slate-900 dark:text-slate-100 px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>

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
                placeholder="Crie uma senha"
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
                {showPassword ? <MdVisibilityOff className="text-xl" /> : <MdVisibility className="text-xl" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-blue-gradient hover:opacity-90 text-white font-semibold py-3 rounded shadow-lg transition-all transform active:scale-[0.98]"
          >
            {loading ? "Criando..." : "Criar conta"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          Já possui conta?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
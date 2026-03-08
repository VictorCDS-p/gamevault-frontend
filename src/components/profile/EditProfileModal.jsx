import { useState } from "react";
import Button from "../ui/Button.jsx";
import Modal from "../ui/Modal.jsx";

export default function EditProfileModal({ profile, isOpen, onClose, onSave }) {
  const [username, setUsername] = useState(profile.username);
  const [email, setEmail] = useState(profile.email);
  const [error, setError] = useState("");

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!isValidEmail(email)) {
      setError("Por favor, insira um email válido.");
      return;
    }

    onSave({ username, email });
  }

  return (
    <Modal
      isOpen={isOpen}
      title="Editar Perfil"
      onClose={onClose}
      className="w-[90vw] max-w-md p-8 bg-slate-200 dark:bg-surface rounded-xl shadow-2xl border border-slate-300 dark:border-slate-800"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {error && (
          <div className="text-red-500 text-sm text-center mb-2">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="text-slate-700 dark:text-primary text-xs font-bold uppercase tracking-widest">
            Usuário
          </label>
          <input
            type="text"
            placeholder="Seu nome"
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

        <div className="flex justify-end gap-3 mt-4">
          <Button
            variant="secondary"
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-lg border border-slate-400 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="px-6 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 transition shadow-lg"
          >
            Salvar
          </Button>
        </div>
      </form>
    </Modal>
  );
}
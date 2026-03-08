import { useState } from "react"
import Button from "../ui/Button"

export default function CollectionForm({ initialData, onSubmit, onCancel }) {
  const [name, setName] = useState(initialData?.name || "")
  const [description, setDescription] = useState(initialData?.description || "")

  const [prevInitialData, setPrevInitialData] = useState(initialData)

  if (initialData !== prevInitialData) {
    setPrevInitialData(initialData)
    setName(initialData?.name || "")
    setDescription(initialData?.description || "")
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit({ name, description })
    setName("")
    setDescription("")
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-100 dark:bg-slate-900 p-12 rounded-xl shadow-2xl border border-slate-300 dark:border-slate-800">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center uppercase tracking-wider">
        {initialData ? "Editar Coleção" : "Criar Coleção"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-slate-700 dark:text-primary text-xs font-bold uppercase tracking-widest">
            Nome da coleção
          </label>
          <input
            type="text"
            placeholder="My RPG Collection"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-white dark:bg-slate-800 border border-slate-400 dark:border-slate-700 rounded px-4 py-4 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary outline-none transition"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-slate-700 dark:text-primary text-xs font-bold uppercase tracking-widest">
            Descrição
          </label>
          <textarea
            placeholder="Best RPG games"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={5}
            className="w-full bg-white dark:bg-slate-800 border border-slate-400 dark:border-slate-700 rounded px-4 py-4 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary outline-none transition resize-none"
          />
        </div>

        <div className="flex justify-between gap-4">
          {onCancel && (
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              className="flex-1 py-4 rounded-lg border border-slate-400 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
            >
              Cancelar
            </Button>
          )}
          <Button
            type="submit"
            className="flex-1 py-4 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 transition shadow-lg"
          >
            Salvar
          </Button>
        </div>
      </form>
    </div>
  )
}
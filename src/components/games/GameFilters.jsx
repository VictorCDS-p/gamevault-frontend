import { useState } from "react"
import Select from "../ui/Select"
import Button from "../ui/Button"

export default function GameFilters({ categories = [], onFilter }) {
  const [category, setCategory] = useState("")
  const [search, setSearch] = useState("")

  const categoryOptions = [
    { value: "", label: "Todas as Categorias" },
    ...categories.map((cat) => ({
      value: cat.name,
      label: cat.name
    }))
  ]

  function handleSubmit(e) {
    e.preventDefault()

    onFilter({
      category,
      search
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col lg:flex-row gap-4 bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl items-end mb-6"
    >
      <div className="flex-1">
        <label className="block text-sm font-medium mb-1">
          Pesquisar
        </label>

        <input
          type="text"
          placeholder="Buscar jogo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex-1">
        <Select
          label="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={categoryOptions}
          placeholder="Selecionar a categoria"
          className="w-full"
        />
      </div>

      <Button
        type="submit"
        className="bg-primary text-slate-900 px-6 py-2 rounded-lg text-sm font-bold hover:brightness-110 transition-all"
      >
        Filtrar
      </Button>
    </form>
  )
}
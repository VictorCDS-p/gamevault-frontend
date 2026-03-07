import { useState } from "react"
import Select from "../ui/Select"
import Button from "../ui/Button"

export default function GameFilters({ categories = [], onFilter }) {
  const [category, setCategory] = useState("")

  const categoryOptions = [
    { value: "", label: "Todas as Categorias" },
    ...categories.map((cat) => ({
      value: cat.name,
      label: cat.name
    }))
  ]

  function handleSubmit(e) {
    e.preventDefault()
    onFilter(category)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col lg:flex-row gap-4 bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl items-end"
    >
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
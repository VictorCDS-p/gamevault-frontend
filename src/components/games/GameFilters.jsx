import { useState } from "react"
import Select from "../ui/Select"
import Button from "../ui/Button"

export default function GameFilters({ categories = [], onFilter }) {

  const [category, setCategory] = useState("")

  const categoryOptions = categories.map((cat) => ({
    value: cat.name,
    label: cat.name
  }))

  function handleSubmit(e) {
    e.preventDefault()
    onFilter(category)
  }

  return (
    <form onSubmit={handleSubmit} className="game-filters">

      <Select
        label="Categoria"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        options={categoryOptions}
        placeholder="Selecionar a categoria"
      />

      <Button type="submit">
        Filtrar
      </Button>

    </form>
  )
}
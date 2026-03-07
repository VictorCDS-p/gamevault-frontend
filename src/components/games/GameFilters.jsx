import { useState } from "react"
import Input from "../ui/Input"
import Button from "../ui/Button"

export default function GameFilters({ onFilter }) {

  const [category, setCategory] = useState("")

  function handleSubmit(e) {
    e.preventDefault()

    onFilter(category)
  }

  return (
    <form onSubmit={handleSubmit} className="game-filters">

      <Input
        label="Category"
        placeholder="RPG, Action..."
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <Button type="submit">
        Filter
      </Button>

    </form>
  )
}
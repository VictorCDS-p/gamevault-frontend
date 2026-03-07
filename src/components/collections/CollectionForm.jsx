import { useState } from "react"
import Input from "../ui/Input"
import Button from "../ui/Button"

export default function CollectionForm({
  initialData,
  onSubmit
}) {

  const [name, setName] = useState(initialData?.name || "")
  const [description, setDescription] = useState(initialData?.description || "")

  function handleSubmit(e) {
    e.preventDefault()

    onSubmit({
      name,
      description
    })

    setName("")
    setDescription("")
  }

  return (
    <form onSubmit={handleSubmit}>

      <Input
        label="Collection Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="My RPG Collection"
      />

      <Input
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Best RPG games"
      />

      <Button type="submit">
        Save
      </Button>

    </form>
  )
}
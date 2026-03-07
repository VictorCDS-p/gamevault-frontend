import { useState } from "react"
import Input from "../ui/Input"
import Button from "../ui/Button"

export default function CollectionForm({
  initialData,
  onSubmit,
  onCancel
}) {

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

      <div className="form-actions">

        <Button type="submit">
          Save
        </Button>

        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}

      </div>

    </form>
  )
}
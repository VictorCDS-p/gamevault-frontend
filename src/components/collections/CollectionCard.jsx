import Card from "../ui/Card"
import Button from "../ui/Button"

export default function CollectionCard({
  collection,
  onDelete,
  onEdit
}) {

  return (
    <Card>

      <h3>{collection.name}</h3>

      <p>{collection.description}</p>

      <div className="collection-actions">

        <Button
          variant="secondary"
          onClick={() => onEdit(collection)}
        >
          Edit
        </Button>

        <Button
          variant="danger"
          onClick={() => onDelete(collection.id)}
        >
          Delete
        </Button>

      </div>

    </Card>
  )
}
import Card from "../ui/Card"
import Button from "../ui/Button"
import StatusSelector from "./StatusSelector"
import formatStatus from "../../utils/formatStatus"

export default function LibraryCard({
  item,
  onStatusChange,
  onRemove
}) {

  return (
    <Card>

      <h3>{item.game.title}</h3>

      <p>{item.game.description}</p>

      <p>
        <strong>Status:</strong> {formatStatus(item.status)}
      </p>

      <StatusSelector
        currentStatus={item.status}
        onChange={(status) => onStatusChange(item.id, status)}
      />

      <Button
        variant="danger"
        onClick={() => onRemove(item.id)}
      >
        Remover
      </Button>

    </Card>
  )
}
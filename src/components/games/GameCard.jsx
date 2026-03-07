import Card from "../ui/Card"
import Button from "../ui/Button"

export default function GameCard({ game, onAddToLibrary }) {

  return (
    <Card>

      <h3>{game.title}</h3>

      <p>{game.description}</p>

      <p>
        <strong>Developer:</strong> {game.developer}
      </p>

      <p>
        <strong>Publisher:</strong> {game.publisher}
      </p>

      <Button onClick={() => onAddToLibrary(game.id)}>
        Adicione a biblioteca
      </Button>

    </Card>
  )
}
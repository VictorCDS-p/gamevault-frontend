import Card from "../ui/Card"
import Button from "../ui/Button"

export default function GameCard({ game, onAddToLibrary }) {
  return (
    <Card>
      {/* Imagem do jogo */}
      {game.coverImage && (
        <img
          src={game.coverImage}
          alt={game.title}
          style={{ width: "100%", height: "auto" }}
        />
      )}

      <h3>{game.title}</h3>

      <p>{game.description}</p>

      <p>
        <strong>Developer:</strong> {game.developer}
      </p>

      <p>
        <strong>Publisher:</strong> {game.publisher}
      </p>

      <Button onClick={() => onAddToLibrary(game.id)}>
        Adicione à biblioteca
      </Button>
    </Card>
  )
}
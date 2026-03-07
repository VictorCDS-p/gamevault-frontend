import { useState } from "react"

import Card from "../ui/Card"
import Button from "../ui/Button"
import Select from "../ui/Select"

export default function CollectionCard({
  collection,
  library = [],
  onDelete,
  onEdit,
  onAddGame,
  onRemoveGame
}) {

  const [selectedGame, setSelectedGame] = useState("")

  const gameOptions = library.map(item => ({
    value: item.game.id,
    label: item.game.title
  }))

  function handleAddGame() {
    if (selectedGame && onAddGame) {
      onAddGame(collection.id, selectedGame)
      setSelectedGame("")
    }
  }

  return (
    <Card>
      <h3>{collection.name}</h3>
      <p>{collection.description}</p>

      <div className="collection-actions">
        {onEdit && (
          <Button variant="secondary" onClick={() => onEdit(collection)}>
            Editar
          </Button>
        )}
        {onDelete && (
          <Button variant="danger" onClick={() => onDelete(collection.id)}>
            Deletar
          </Button>
        )}
      </div>

      <hr />

      <h4>Jogos</h4>

      {!collection.games || collection.games.length === 0 ? (
        <p>No games in this collection.</p>
      ) : (
        collection.games.map((item) => (
          <div key={item.id} className="collection-game" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            
            {/* Imagem do jogo */}
            {item.game.coverImage && (
              <img
                src={item.game.coverImage}
                alt={item.game.title}
                style={{ width: "60px", height: "auto" }}
              />
            )}

            <span>{item.game.title}</span>

            <Button
              variant="danger"
              onClick={() => onRemoveGame(collection.id, item.game.id)}
            >
              Remover
            </Button>
          </div>
        ))
      )}

      {onAddGame && (
        <div className="add-game">
          <Select
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
            options={gameOptions}
            placeholder="Selecionar jogo"
          />

          <Button onClick={handleAddGame}>
            Adicionar jogo
          </Button>
        </div>
      )}
    </Card>
  )
}
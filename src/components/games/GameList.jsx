import GameCard from "./GameCard"

export default function GameList({ games, onAddToLibrary }) {

  if (!games || games.length === 0) {
    return <p>No games found.</p>
  }

  return (
    <div className="game-list">

      {games.map((game) => (

        <GameCard
          key={game.id}
          game={game}
          onAddToLibrary={onAddToLibrary}
        />

      ))}

    </div>
  )
}
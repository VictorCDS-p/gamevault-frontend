import { useState } from "react"
import GameCard from "./GameCard"
import Pagination from "../ui/Pagination"

export default function GameList({ games, onAddToLibrary }) {

  const [page, setPage] = useState(1)
  const itemsPerPage = 8

  if (!games || games.length === 0) {
    return <p>No games found.</p>
  }

  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage

  const paginatedGames = games.slice(start, end)

  return (
    <div>

      <div className="game-list">

        {paginatedGames.map((game) => (

          <GameCard
            key={game.id}
            game={game}
            onAddToLibrary={onAddToLibrary}
          />

        ))}

      </div>

      <Pagination
        totalItems={games.length}
        itemsPerPage={itemsPerPage}
        currentPage={page}
        onPageChange={setPage}
      />

    </div>
  )
}
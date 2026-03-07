import { useState } from "react"
import GameCard from "./GameCard"
import Pagination from "../ui/Pagination"

export default function GameList({ games, onAddToLibrary }) {
  const [page, setPage] = useState(1)
  const itemsPerPage = 8

  if (!games || games.length === 0) {
    return <p className="text-center text-slate-500 dark:text-slate-400 mt-8">No games found.</p>
  }

  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage
  const paginatedGames = games.slice(start, end)

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedGames.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onAddToLibrary={onAddToLibrary}
          />
        ))}
      </div>

      <div className="mt-8">
        <Pagination
          totalItems={games.length}
          itemsPerPage={itemsPerPage}
          currentPage={page}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}
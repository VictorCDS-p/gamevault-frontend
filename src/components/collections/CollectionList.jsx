import { useState } from "react"
import CollectionCard from "./CollectionCard"
import Pagination from "../ui/Pagination"

export default function CollectionList({
  collections,
  library,
  onDelete,
  onEdit,
  onAddGame,
  onRemoveGame
}) {
  const [page, setPage] = useState(1)
  const itemsPerPage = 8

  if (!collections || collections.length === 0) {
    return (
      <p className="text-center text-slate-500 dark:text-slate-400 mt-8">
        Nenhuma coleção encontrada.
      </p>
    )
  }

  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage
  const paginatedCollections = collections.slice(start, end)

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedCollections.map((collection) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            library={library}
            onDelete={onDelete}
            onEdit={onEdit}
            onAddGame={onAddGame}
            onRemoveGame={onRemoveGame}
          />
        ))}
      </div>

      <div className="mt-8">
        <Pagination
          totalItems={collections.length}
          itemsPerPage={itemsPerPage}
          currentPage={page}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}
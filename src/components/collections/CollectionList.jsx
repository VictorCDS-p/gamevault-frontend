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
  const itemsPerPage = 6

  if (!collections || collections.length === 0) {
    return <p>No collections found.</p>
  }

  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage

  const paginatedCollections = collections.slice(start, end)

  return (
    <div>

      <div className="collection-list">

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

      <Pagination
        totalItems={collections.length}
        itemsPerPage={itemsPerPage}
        currentPage={page}
        onPageChange={setPage}
      />

    </div>
  )
}
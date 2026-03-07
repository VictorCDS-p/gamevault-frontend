import { useState } from "react"
import LibraryCard from "./LibraryCard"
import Pagination from "../ui/Pagination"

export default function LibraryList({
  library,
  onStatusChange,
  onRemove
}) {

  const [page, setPage] = useState(1)
  const itemsPerPage = 8

  if (!library || library.length === 0) {
    return <p>Your library is empty.</p>
  }

  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage

  const paginatedLibrary = library.slice(start, end)

  return (
    <div>

      <div className="library-list">

        {paginatedLibrary.map((item) => (

          <LibraryCard
            key={item.id}
            item={item}
            onStatusChange={onStatusChange}
            onRemove={onRemove}
          />

        ))}

      </div>

      <Pagination
        totalItems={library.length}
        itemsPerPage={itemsPerPage}
        currentPage={page}
        onPageChange={setPage}
      />

    </div>
  )
}
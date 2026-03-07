import { useState } from "react"
import LibraryCard from "./LibraryCard"
import Pagination from "../ui/Pagination"
import formatStatus from "../../utils/formatStatus"

export default function LibraryList({ library, onStatusChange, onRemove }) {
  const [page, setPage] = useState(1)
  const itemsPerPage = 8

  if (!library || library.length === 0) {
    return (
      <p className="text-center text-slate-500 dark:text-slate-400 mt-8">
        Your library is empty.
      </p>
    )
  }

  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage
  const paginatedLibrary = library.slice(start, end)

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedLibrary.map((item) => (
          <LibraryCard
            key={item.id}
            item={{
              ...item,
              statusLabel: formatStatus(item.status)
            }}
            onStatusChange={onStatusChange}
            onRemove={onRemove}
          />
        ))}
      </div>

      <div className="mt-8">
        <Pagination
          totalItems={library.length}
          itemsPerPage={itemsPerPage}
          currentPage={page}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}
export default function Pagination({
  totalItems,
  itemsPerPage = 10,
  currentPage,
  onPageChange
}) {

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  if (totalItems <= itemsPerPage) {
    return null
  }

  const pages = []
  const maxVisible = 5

  let start = Math.max(1, currentPage - 2)
  let end = Math.min(totalPages, currentPage + 2)

  if (currentPage <= 3) {
    end = Math.min(totalPages, maxVisible)
  }

  if (currentPage >= totalPages - 2) {
    start = Math.max(1, totalPages - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return (
    <div className="pagination">

      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ←
      </button>

      {start > 1 && (
        <>
          <button onClick={() => onPageChange(1)}>1</button>
          {start > 2 && <span>...</span>}
        </>
      )}

      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? "active" : ""}
        >
          {page}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span>...</span>}
          <button onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </button>
        </>
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        →
      </button>

    </div>
  )
}
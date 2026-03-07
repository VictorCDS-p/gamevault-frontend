import LibraryCard from "./LibraryCard"

export default function LibraryList({
  library,
  onStatusChange,
  onRemove
}) {

  if (!library || library.length === 0) {
    return <p>Your library is empty.</p>
  }

  return (
    <div className="library-list">

      {library.map((item) => (

        <LibraryCard
          key={item.id}
          item={item}
          onStatusChange={onStatusChange}
          onRemove={onRemove}
        />

      ))}

    </div>
  )
}
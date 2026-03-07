import CollectionCard from "./CollectionCard"

export default function CollectionList({
  collections,
  library,
  onDelete,
  onEdit,
  onAddGame,
  onRemoveGame
}) {

  if (!collections || collections.length === 0) {
    return <p>No collections found.</p>
  }

  return (
    <div className="collection-list">

      {collections.map((collection) => (

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
  )
}
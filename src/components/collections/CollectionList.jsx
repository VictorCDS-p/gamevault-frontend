import CollectionCard from "./CollectionCard"

export default function CollectionList({
  collections,
  onDelete,
  onEdit
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
          onDelete={onDelete}
          onEdit={onEdit}
        />

      ))}

    </div>
  )
}
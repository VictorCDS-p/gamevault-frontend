import { useEffect, useState } from "react"

import CollectionList from "../components/collections/CollectionList"
import CollectionForm from "../components/collections/CollectionForm"

import Modal from "../components/ui/Modal"
import Button from "../components/ui/Button"

import {
  getCollections,
  createCollection,
  updateCollection,
  deleteCollection,
  addGameToCollection,
  removeGameFromCollection
} from "../services/collectionService"

import { getLibrary } from "../services/libraryService"

export default function Collections() {

  const [collections, setCollections] = useState([])
  const [library, setLibrary] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCollection, setEditingCollection] = useState(null)

  async function loadCollections() {
    const data = await getCollections()
    setCollections(data)
  }

  useEffect(() => {
    let ignore = false;
    Promise.all([getCollections(), getLibrary()]).then(([collectionsData, libraryData]) => {
      if (!ignore) {
        setCollections(collectionsData);
        setLibrary(libraryData);
      }
    });
    return () => { ignore = true; };
  }, [])

  async function handleSubmit(data) {

    if (editingCollection) {
      await updateCollection(editingCollection.id, data)
    } else {
      await createCollection(data)
    }

    await loadCollections()

    setEditingCollection(null)
    setIsModalOpen(false)
  }

  function handleEdit(collection) {
    setEditingCollection(collection)
    setIsModalOpen(true)
  }

  async function handleDelete(id) {
    await deleteCollection(id)
    loadCollections()
  }

  async function handleAddGame(collectionId, gameId) {
    await addGameToCollection(collectionId, gameId)
    loadCollections()
  }

  async function handleRemoveGame(collectionId, gameId) {
    await removeGameFromCollection(collectionId, gameId)
    loadCollections()
  }

  function handleCloseModal() {
    setEditingCollection(null)
    setIsModalOpen(false)
  }

  return (
    <div>

      <h1>Collections</h1>

      <Button onClick={() => setIsModalOpen(true)}>
        Create Collection
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingCollection ? "Edit Collection" : "Create Collection"}
      >
        <CollectionForm
          initialData={editingCollection}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>

      <CollectionList
        collections={collections}
        library={library}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onAddGame={handleAddGame}
        onRemoveGame={handleRemoveGame}
      />

    </div>
  )
}
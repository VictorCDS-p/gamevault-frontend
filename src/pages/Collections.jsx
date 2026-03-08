import { useEffect, useState } from "react"

import CollectionCard from "../components/collections/CollectionCard"
import CollectionForm from "../components/collections/CollectionForm"

import Modal from "../components/ui/Modal"
import Card from "../components/ui/Card"

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
    let ignore = false
    Promise.all([getCollections(), getLibrary()]).then(([collectionsData, libraryData]) => {
      if (!ignore) {
        setCollections(collectionsData)
        setLibrary(libraryData)
      }
    })
    return () => { ignore = true }
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

      <h1 className="text-2xl font-bold mb-6">Coleções</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        <div
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer group"
        >
          <Card className="flex flex-col items-center justify-center text-center rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 transition-all h-full p-6 hover:border-primary hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-lg hover:-translate-y-1">
            
            <span className="material-symbols-outlined text-5xl mb-3 text-primary group-hover:scale-110 transition">
              add_circle
            </span>

            <p className="font-semibold text-slate-700 dark:text-slate-200">
              Criar coleção
            </p>

          </Card>
        </div>

        {collections.map((collection) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            library={library}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onAddGame={handleAddGame}
            onRemoveGame={handleRemoveGame}
          />
        ))}

      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingCollection ? "Editar coleção" : "Criar coleção"}
        className="w-[90vw] max-w-md p-6"
      >
        <CollectionForm
          initialData={editingCollection}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>

    </div>
  )
}
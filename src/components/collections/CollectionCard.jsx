import { useState } from "react"
import Card from "../ui/Card"
import Button from "../ui/Button"
import AddGameModal from "./AddGameModal"
import CollectionGamesModal from "./CollectionGamesModal"
import Modal from "../ui/Modal"

export default function CollectionCard({
  collection,
  library = [],
  onDelete,
  onEdit,
  onAddGame,
  onRemoveGame,
}) {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isAddModal, setIsAddModal] = useState(false)
  const [isConfirmModal, setIsConfirmModal] = useState(false)

  const handleConfirmDelete = () => {
    onDelete(collection.id)
    setIsConfirmModal(false)
  }

  return (
    <>
      <Card className="flex flex-col overflow-hidden rounded-xl shadow-sm transition-all border border-slate-200 dark:border-slate-700/50 group">
        <div className="p-4 flex flex-col h-full text-center">
          <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
            {collection.name}
          </h3>

          {collection.description && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              {collection.description}
            </p>
          )}

          <div className="flex flex-col gap-3 mt-auto">

            <Button
              onClick={() => setIsOpenModal(true)}
              className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 transition shadow-lg"
            >
              Abrir
            </Button>

            <Button
              onClick={() => setIsAddModal(true)}
              className="w-full py-3 flex items-center justify-center gap-2 border rounded-lg font-bold text-sm transition-all bg-[rgba(102,192,244,0.1)] border-[rgba(102,192,244,0.2)] text-[#66c0f4] hover:bg-[rgba(102,192,244,0.2)] hover:text-[#0f1f2f]"
            >
              <span className="material-symbols-outlined text-lg">
                add_circle
              </span>
              Adicionar jogo
            </Button>

            {onEdit && (
              <Button
                variant="secondary"
                onClick={() => onEdit(collection)}
                className="w-full py-3 rounded-lg border border-slate-400 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
              >
                Editar
              </Button>
            )}

            {onDelete && (
              <Button
                variant="danger"
                onClick={() => setIsConfirmModal(true)}
                className="w-full py-3 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
              >
                Deletar
              </Button>
            )}

          </div>
        </div>
      </Card>

      <CollectionGamesModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        collection={collection}
        onRemoveGame={onRemoveGame}
      />

      <AddGameModal
        isOpen={isAddModal}
        onClose={() => setIsAddModal(false)}
        library={library}
        collectionId={collection.id}
        collectionGames={collection.games}
        onAdd={onAddGame}
      />

      <Modal
        isOpen={isConfirmModal}
        title="Confirmação de exclusão"
        onClose={() => setIsConfirmModal(false)}
        className="w-[90vw] max-w-sm p-6"
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
          Tem certeza que deseja deletar a coleção <strong>{collection.name}</strong>?
        </p>

        <div className="flex justify-end gap-3">
          <Button
            onClick={() => setIsConfirmModal(false)}
            className="px-4 py-2 rounded-lg border text-sm bg-slate-100 dark:bg-slate-800 dark:text-slate-200 hover:bg-slate-200 transition"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmDelete}
            className="px-4 py-2 rounded-lg border text-sm bg-red-100 border-red-200 text-red-600 hover:bg-red-200 hover:text-red-800 transition"
          >
            Deletar
          </Button>
        </div>
      </Modal>
    </>
  )
}
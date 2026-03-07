import { useState } from "react"
import Card from "../ui/Card"
import Button from "../ui/Button"
import StatusSelector from "./StatusSelector"
import formatStatus from "../../utils/formatStatus"
import statusColors from "../../utils/statusColors"
import Modal from "../ui/Modal"

export default function LibraryCard({ item, onStatusChange, onRemove }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleRemoveClick = () => setIsModalOpen(true)
  const handleConfirmRemove = () => {
    onRemove(item.id)
    setIsModalOpen(false)
  }

  return (
    <>
      <Card className="flex flex-col overflow-hidden rounded-xl shadow-sm transition-all border border-slate-200 dark:border-slate-700/50 group">
        {item.game.coverImage && (
          <div className="relative aspect-[16/9] overflow-hidden">
            <img src={item.game.coverImage} alt={item.game.title} />
          </div>
        )}

        <div className="p-4 flex flex-col">
          <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
            {item.game.title}
          </h3>

          {item.game.description && (
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              <p>{item.game.description}</p>
            </div>
          )}

          <div className="text-sm mb-4">
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`${statusColors[item.status] || "text-slate-500"} px-2 py-0.5 rounded`}
              >
                {formatStatus(item.status)}
              </span>
            </p>
          </div>

          <div className="mb-4">
            <StatusSelector
              currentStatus={item.status}
              onChange={(status) => onStatusChange(item.id, status)}
            />
          </div>

          <div className="flex justify-center mt-auto">
            <Button
              onClick={handleRemoveClick}
              className="flex items-center justify-center gap-2 px-6 py-2.5 border rounded-lg font-bold text-sm transition-all bg-red-100 border-red-200 text-red-600 hover:bg-red-200 hover:text-red-800"
            >
              Remover
            </Button>
          </div>
        </div>
      </Card>

      {/* Modal de confirmação */}
      <Modal
        isOpen={isModalOpen}
        title="Confirmação de remoção"
        onClose={() => setIsModalOpen(false)}
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
          Tem certeza que deseja remover <strong>{item.game.title}</strong> da sua biblioteca?
        </p>
        <div className="flex justify-end gap-3">
          <Button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 rounded-lg border text-sm bg-slate-100 dark:bg-slate-800 dark:text-slate-200 hover:bg-slate-200 transition"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmRemove}
            className="px-4 py-2 rounded-lg border text-sm bg-red-100 border-red-200 text-red-600 hover:bg-red-200 hover:text-red-800 transition"
          >
            Remover
          </Button>
        </div>
      </Modal>
    </>
  )
}
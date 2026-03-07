import Card from "../ui/Card"
import Button from "../ui/Button"
import StatusSelector from "./StatusSelector"
import formatStatus from "../../utils/formatStatus"
import statusColors from "../../utils/statusColors"

export default function LibraryCard({ item, onStatusChange, onRemove }) {
  return (
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
            onClick={() => onRemove(item.id)}
            className="flex items-center justify-center gap-2 px-6 py-2.5 border rounded-lg font-bold text-sm transition-all bg-red-100 border-red-200 text-red-600 hover:bg-red-200 hover:text-red-800"
          >
            Remover
          </Button>
        </div>
      </div>
    </Card>
  )
}
import { useState } from "react"
import Card from "../ui/Card"
import Button from "../ui/Button"

export default function GameCard({ game, onAddToLibrary }) {
  const [loading, setLoading] = useState(false)

  async function handleAdd() {
    setLoading(true)
    await onAddToLibrary(game.id)
    setLoading(false)
  }

  return (
    <Card className="flex flex-col h-[600px] overflow-hidden rounded-xl shadow-sm transition-all border border-slate-200 dark:border-slate-700/50 group">
      {game.coverImage && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={game.coverImage}
            alt={game.title}
          />
          {game.label && (
            <div className="absolute top-2 left-2 px-2 py-1 bg-background-dark/80 backdrop-blur rounded text-[10px] font-bold uppercase tracking-wider text-primary">
              {game.label}
            </div>
          )}
        </div>
      )}

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
          {game.title}
        </h3>

        {game.tags && game.tags.length > 0 && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {game.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-[10px] font-medium text-slate-600 dark:text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="text-sm text-slate-500 dark:text-slate-400 space-y-1 mb-4 flex-1 overflow-y-auto pr-1">
          {game.description && <p>{game.description}</p>}
          {game.developer && <p><strong>Developer:</strong> {game.developer}</p>}
          {game.publisher && <p><strong>Publisher:</strong> {game.publisher}</p>}
        </div>

        <div className="flex justify-center mt-auto">
          <Button
            onClick={handleAdd}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 border rounded-lg font-bold text-sm transition-all bg-[rgba(102,192,244,0.1)] border-[rgba(102,192,244,0.2)] text-[#66c0f4] hover:bg-[rgba(102,192,244,0.2)] hover:text-[#0f1f2f]"
          >
            <span className="material-symbols-outlined text-lg">add_circle</span>
            {loading ? "Adicionando..." : "Add a biblioteca"}
          </Button>
        </div>
      </div>
    </Card>
  )
}
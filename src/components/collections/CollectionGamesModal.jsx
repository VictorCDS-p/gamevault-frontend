import { useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Pagination from "../ui/Pagination";

export default function CollectionGamesModal({
  isOpen,
  onClose,
  collection,
  onRemoveGame,
}) {
  const [page, setPage] = useState(1);
  const [confirmRemoveGameId, setConfirmRemoveGameId] = useState(null);
  const itemsPerPage = 8;

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedGames = collection.games.slice(start, end);

  const handleConfirmRemove = (gameId) => {
    onRemoveGame(collection.id, gameId);
    setConfirmRemoveGameId(null);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={`Jogos da coleção: ${collection.name}`}
        className="w-[80vw] max-w-5xl p-6"
      >
        {collection.games.length === 0 ? (
          <p className="text-center text-lg text-slate-500 dark:text-slate-400">
            Nenhum jogo nessa coleção.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-h-[60vh] overflow-y-auto px-2">
              {paginatedGames.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col border rounded-lg p-3 bg-slate-50 dark:bg-slate-800 shadow-sm"
                >
                  {item.game.coverImage && (
                    <div className="relative aspect-[16/9] overflow-hidden w-full rounded-md mb-3">
                      <img
                        src={item.game.coverImage}
                        alt={item.game.title}
                        className="w-full h-full"
                      />
                    </div>
                  )}

                  <p className="text-base font-semibold text-center flex-1">
                    {item.game.title}
                  </p>

                  <Button
                    className="w-full py-3 flex items-center justify-center gap-2 border rounded-lg font-bold text-sm transition-all bg-[rgba(255,80,80,0.1)] border-[rgba(255,80,80,0.2)] text-[#ff5050] hover:bg-[rgba(255,80,80,0.2)] hover:text-[#0f1f2f] mt-4"
                    onClick={() => setConfirmRemoveGameId(item.game.id)}
                  >
                    <span className="material-symbols-outlined text-lg">
                      delete
                    </span>
                    Remover
                  </Button>
                </div>
              ))}
            </div>

            <Pagination
              totalItems={collection.games.length}
              itemsPerPage={itemsPerPage}
              currentPage={page}
              onPageChange={setPage}
            />
          </div>
        )}
      </Modal>

      {confirmRemoveGameId && (
        <Modal
          isOpen={true}
          title="Confirmação de remoção"
          onClose={() => setConfirmRemoveGameId(null)}
          className="w-[80vw] max-w-sm p-6"
        >
          <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
            Tem certeza que deseja remover{" "}
            <strong>
              {collection.games.find((g) => g.id === confirmRemoveGameId)?.game.title}
            </strong>{" "}
            da coleção <strong>{collection.name}</strong>?
          </p>

          <div className="flex justify-end gap-3">
            <Button
              onClick={() => setConfirmRemoveGameId(null)}
              className="px-4 py-2 rounded-lg border text-sm bg-slate-100 dark:bg-slate-800 dark:text-slate-200 hover:bg-slate-200 transition"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => handleConfirmRemove(confirmRemoveGameId)}
              className="px-4 py-2 rounded-lg border text-sm bg-red-100 border-red-200 text-red-600 hover:bg-red-200 hover:text-red-800 transition"
            >
              Remover
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
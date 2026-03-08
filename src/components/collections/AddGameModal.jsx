import { useState, useMemo } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Pagination from "../ui/Pagination";

export default function AddGameModal({
  isOpen,
  onClose,
  library,
  collectionId,
  collectionGames = [],
  onAdd,
}) {
  const [localExcluded, setLocalExcluded] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const existingGameIds = useMemo(
    () => collectionGames.map((g) => g.game.id),
    [collectionGames]
  );

  const availableGames = useMemo(
    () =>
      library.filter(
        (item) =>
          !existingGameIds.includes(item.game.id) &&
          !localExcluded.includes(item.game.id)
      ),
    [library, existingGameIds, localExcluded]
  );

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedGames = availableGames.slice(start, end);

  const handleAdd = async (gameId) => {
    const collectionIdNum = Number(collectionId);
    const gameIdNum = Number(gameId);

    if (existingGameIds.includes(gameIdNum) || localExcluded.includes(gameIdNum))
      return;

    setLocalExcluded((prev) => [...prev, gameIdNum]);

    try {
      await onAdd(collectionIdNum, gameIdNum);
    } catch (err) {
      console.error(
        "Erro ao adicionar o jogo:",
        err.response?.data?.message || err.message
      );
      setLocalExcluded((prev) => prev.filter((id) => id !== gameIdNum));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Adicionar jogos à coleção" className="w-[80vw] max-w-5xl p-6">
      {availableGames.length === 0 ? (
        <p className="text-center text-lg text-slate-500 dark:text-slate-400">
          Nenhum jogo disponível para adicionar.
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
                  onClick={() => handleAdd(item.game.id)}
                  className="w-full py-3 flex items-center justify-center gap-2 border rounded-lg font-bold text-sm transition-all bg-[rgba(102,192,244,0.1)] border-[rgba(102,192,244,0.2)] text-[#66c0f4] hover:bg-[rgba(102,192,244,0.2)] hover:text-[#0f1f2f] mt-4"
                >
                  <span className="material-symbols-outlined text-lg">
                    add_circle
                  </span>
                  Adicionar
                </Button>
              </div>
            ))}
          </div>

          <Pagination
            totalItems={availableGames.length}
            itemsPerPage={itemsPerPage}
            currentPage={page}
            onPageChange={setPage}
          />
        </div>
      )}
    </Modal>
  );
}
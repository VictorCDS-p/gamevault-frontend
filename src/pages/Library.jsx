import { useEffect, useState } from "react";
import LibraryList from "../components/library/LibraryList";
import Card from "../components/ui/Card";
import {
  getLibrary,
  updateGameStatus,
  removeGameFromLibrary,
} from "../services/libraryService";

export default function Library() {
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    let ignore = false;
    getLibrary()
      .then((data) => !ignore && setLibrary(data))
      .catch((err) => console.error("Erro ao carregar biblioteca:", err));
    return () => {
      ignore = true;
    };
  }, []);

  async function handleStatusChange(libraryItemId, newStatus) {
    try {
      const libraryItem = library.find((item) => item.id === libraryItemId);
      if (!libraryItem) return;

      const gameId = libraryItem.game.id;

      await updateGameStatus(gameId, newStatus);

      setLibrary((prev) =>
        prev.map((item) =>
          item.id === libraryItemId ? { ...item, status: newStatus } : item,
        ),
      );
    } catch (err) {
      console.error("Erro ao atualizar status:", err);
    }
  }

  const handleRemove = async (libraryItemId) => {
    try {
      await removeGameFromLibrary(libraryItemId);
      setLibrary((prev) => prev.filter((item) => item.id !== libraryItemId));
    } catch (err) {
      console.error("Erro ao remover jogo:", err.response?.data || err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold mb-6">Minha Biblioteca</h1>

      {library.length === 0 ? (
        <Card className="p-6 text-center text-slate-600 dark:text-slate-400">
          Nenhum jogo na biblioteca.
        </Card>
      ) : (
        <LibraryList
          library={library}
          onStatusChange={handleStatusChange}
          onRemove={handleRemove}
        />
      )}
    </div>
  );
}

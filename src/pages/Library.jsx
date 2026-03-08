import { useEffect, useState } from "react";
import LibraryList from "../components/library/LibraryList";
import Card from "../components/ui/Card";
import { getLibrary, updateGameStatus, removeGameFromLibrary } from "../services/libraryService";

export default function Library() {
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    getLibrary()
      .then(setLibrary)
      .catch((err) => console.error("Erro ao carregar biblioteca:", err));
  }, []);

  const handleStatusChange = async (item, newStatus) => {
    try {
      await updateGameStatus(item.game.id, newStatus);
      setLibrary((prev) =>
        prev.map((i) => (i.game.id === item.game.id ? { ...i, status: newStatus } : i))
      );
    } catch (err) {
      console.error("Erro ao atualizar status:", err);
    }
  };

  const handleRemove = async (item) => {
    try {
      await removeGameFromLibrary(item.game.id);
      setLibrary((prev) => prev.filter((i) => i.game.id !== item.game.id));
    } catch (err) {
      console.error("Erro ao remover jogo:", err);
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
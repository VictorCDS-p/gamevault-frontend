import { useEffect, useState } from "react";
import LibraryList from "../components/library/LibraryList";
import Card from "../components/ui/Card";

import {
  getLibrary,
  updateGameStatus,
  removeGameFromLibrary
} from "../services/libraryService";

export default function Library() {
  const [library, setLibrary] = useState([]);

  async function loadLibrary() {
    const data = await getLibrary();
    setLibrary(data);
  }

  useEffect(() => {
    let ignore = false;
    getLibrary().then(data => {
      if (!ignore) setLibrary(data);
    });
    return () => { ignore = true; };
  }, []);

  async function handleStatusChange(libraryId, status) {
    await updateGameStatus(libraryId, status);
    loadLibrary();
  }

  async function handleRemove(libraryId) {
    await removeGameFromLibrary(libraryId);
    loadLibrary();
  }

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
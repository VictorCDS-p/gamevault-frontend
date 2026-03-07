import { useEffect, useState } from "react"
import LibraryList from "../components/library/LibraryList"

import {
  getLibrary,
  updateGameStatus,
  removeGameFromLibrary
} from "../services/libraryService"

export default function Library() {

  const [library, setLibrary] = useState([])

  async function loadLibrary() {
    const data = await getLibrary()
    setLibrary(data)
  }

  useEffect(() => {
    let ignore = false;
    getLibrary().then(data => {
      if (!ignore) setLibrary(data);
    });
    return () => { ignore = true; };
  }, [])

  async function handleStatusChange(libraryId, status) {
    await updateGameStatus(libraryId, status)
    loadLibrary()
  }

  async function handleRemove(libraryId) {
    await removeGameFromLibrary(libraryId)
    loadLibrary()
  }

  return (
    <div>

      <h1>My Library</h1>

      <LibraryList
        library={library}
        onStatusChange={handleStatusChange}
        onRemove={handleRemove}
      />

    </div>
  )
}
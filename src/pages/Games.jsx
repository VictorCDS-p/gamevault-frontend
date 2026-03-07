import { useEffect, useState } from "react"
import GameList from "../components/games/GameList"
import GameFilters from "../components/games/GameFilters"

import { getGames, getGamesByCategory } from "../services/gameService"
import { addGameToLibrary } from "../services/libraryService"

export default function Games() {

  const [games, setGames] = useState([])


  useEffect(() => {
    let ignore = false;
    getGames().then(data => {
      if (!ignore) setGames(data);
    });
    return () => { ignore = true; };
  }, [])

  async function handleFilter(category) {
    const data = await getGamesByCategory(category)
    setGames(data)
  }

  async function handleAddToLibrary(gameId) {
    await addGameToLibrary(gameId)
    alert("Game added to library!")
  }

  return (
    <div>

      <h1>Games</h1>

      <GameFilters onFilter={handleFilter} />

      <GameList
        games={games}
        onAddToLibrary={handleAddToLibrary}
      />

    </div>
  )
}
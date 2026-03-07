import { useEffect, useState } from "react"

import GameList from "../components/games/GameList"
import GameFilters from "../components/games/GameFilters"

import { getGames, getGamesByCategory } from "../services/gameService"
import { addGameToLibrary } from "../services/libraryService"
import { getCategories } from "../services/categoryService"

export default function Games() {

  const [games, setGames] = useState([])
  const [categories, setCategories] = useState([])

  async function loadGames() {
    const data = await getGames()
    setGames(data)
  }

  useEffect(() => {
    let ignore = false;
    Promise.all([getGames(), getCategories()]).then(([gamesData, categoriesData]) => {
      if (!ignore) {
        setGames(gamesData);
        setCategories(categoriesData);
      }
    });
    return () => { ignore = true; };
  }, [])

  async function handleFilter(category) {

    if (!category) {
      loadGames()
      return
    }

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

      <GameFilters
        categories={categories}
        onFilter={handleFilter}
      />

      <GameList
        games={games}
        onAddToLibrary={handleAddToLibrary}
      />

    </div>
  )
}
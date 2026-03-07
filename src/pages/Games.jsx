import { useEffect, useState } from "react"
import GameList from "../components/games/GameList"
import GameFilters from "../components/games/GameFilters"
import { getGames, getGamesByCategory } from "../services/gameService"
import { addGameToLibrary, getLibrary } from "../services/libraryService"
import { getCategories } from "../services/categoryService"

export default function Games() {
  const [games, setGames] = useState([])
  const [categories, setCategories] = useState([])
  const [library, setLibrary] = useState([])

  async function loadGames() {
    const [allGames, libraryData] = await Promise.all([getGames(), getLibrary()])
    setLibrary(libraryData)
    const gamesNotInLibrary = allGames.filter(
      (game) => !libraryData.some((lib) => lib.gameId === game.id)
    )
    setGames(gamesNotInLibrary)
  }

  useEffect(() => {
    let ignore = false
    Promise.all([getGames(), getCategories(), getLibrary()]).then(
      ([gamesData, categoriesData, libraryData]) => {
        if (!ignore) {
          setCategories(categoriesData)
          setLibrary(libraryData)
          const gamesNotInLibrary = gamesData.filter(
            (game) => !libraryData.some((lib) => lib.gameId === game.id)
          )
          setGames(gamesNotInLibrary)
        }
      }
    )
    return () => { ignore = true }
  }, [])

  async function handleFilter(category) {
    if (!category) {
      loadGames()
      return
    }
    const data = await getGamesByCategory(category)
    const gamesNotInLibrary = data.filter(
      (game) => !library.some((lib) => lib.gameId === game.id)
    )
    setGames(gamesNotInLibrary)
  }

  async function handleAddToLibrary(gameId) {
    await addGameToLibrary(gameId)
    const updatedLibrary = await getLibrary()
    setLibrary(updatedLibrary)
    setGames((prev) => prev.filter((game) => game.id !== gameId))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold mb-6">Jogos</h1>
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
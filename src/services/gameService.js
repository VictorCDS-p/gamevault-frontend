import api from "./api"

export async function getGames() {
  const response = await api.get("/games")
  return response.data
}

export async function getGamesByCategory(category) {
  const response = await api.get(`/games?category=${category}`)
  return response.data
}

export async function createGame(data) {
  const response = await api.post("/games", data)
  return response.data
}
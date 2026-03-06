import api from "./api"

export async function getLibrary() {
  const response = await api.get("/library")
  return response.data
}

export async function addGameToLibrary(gameId) {
  const response = await api.post(`/library/${gameId}`)
  return response.data
}

export async function updateGameStatus(libraryId, status) {
  const response = await api.put(`/library/${libraryId}/status`, {
    status,
  })

  return response.data
}

export async function removeGameFromLibrary(libraryId) {
  const response = await api.delete(`/library/${libraryId}`)
  return response.data
}
import api from "./api"

export async function getCollections() {
  const response = await api.get("/collections")
  return response.data
}

export async function createCollection(data) {
  const response = await api.post("/collections", data)
  return response.data
}

export async function updateCollection(id, data) {
  const response = await api.put(`/collections/${Number(id)}`, data)
  return response.data
}

export async function deleteCollection(id) {
  const response = await api.delete(`/collections/${Number(id)}`)
  return response.data
}

export async function addGameToCollection(collectionId, gameId) {
  const response = await api.post(
    `/collections/${Number(collectionId)}/games/${Number(gameId)}`
  )
  return response.data
}

export async function removeGameFromCollection(collectionId, gameId) {
  const response = await api.delete(
    `/collections/${Number(collectionId)}/games/${Number(gameId)}`
  )
  return response.data
}
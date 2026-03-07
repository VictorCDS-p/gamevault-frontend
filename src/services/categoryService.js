import api from "./api"

export async function getCategories() {
  const response = await api.get("/categories")
  return response.data
}

export async function getCategoriesWithGames() {
  const response = await api.get("/categories/with-games")
  return response.data
}

export async function getCategory(id) {
  const response = await api.get(`/categories/${id}`)
  return response.data
}

export async function createCategory(data) {
  const response = await api.post("/categories", data)
  return response.data
}
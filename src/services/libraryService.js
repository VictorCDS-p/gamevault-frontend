import api from "./api"; // já deve ter a baseURL configurada e o token Bearer

const ALLOWED_STATUSES = ["PLAYING", "COMPLETED", "BACKLOG", "DROPPED"];

export async function getLibrary() {
  const response = await api.get("/library");
  return response.data;
}

export async function addGameToLibrary(gameId) {
  const response = await api.post(`/library/${gameId}`);
  return response.data;
}

export async function updateGameStatus(gameId, status) {
  if (!ALLOWED_STATUSES.includes(status)) {
    throw new Error(`Status inválido. Deve ser um dos: ${ALLOWED_STATUSES.join(", ")}`);
  }
  const response = await api.put(`/library/${gameId}/status`, { status });
  return response.data;
}

// Remove jogo
export async function removeGameFromLibrary(gameId) {
  const response = await api.delete(`/library/${gameId}`);
  return response.data;
}
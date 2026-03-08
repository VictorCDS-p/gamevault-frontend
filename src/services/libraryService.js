import api from "./api";

const ALLOWED_STATUSES = ["PLAYING", "COMPLETED", "BACKLOG", "DROPPED"];

export async function getLibrary() {
  const response = await api.get("/library");
  return response.data;
}

export async function addGameToLibrary(gameId) {
  const response = await api.post(`/library/${gameId}`);
  return response.data;
}

/**
 * Atualiza o status de um jogo na biblioteca
 * @param {number} libraryId - ID do registro da biblioteca
 * @param {string} status - Novo status (PLAYING, COMPLETED, BACKLOG, DROPPED)
 */
export async function updateGameStatus(libraryId, status) {
  if (!ALLOWED_STATUSES.includes(status)) {
    throw new Error(
      `Status inválido. Deve ser um dos: ${ALLOWED_STATUSES.join(", ")}`
    );
  }

  const response = await api.put(`/library/${libraryId}/status`, { status });
  return response.data;
}

export async function removeGameFromLibrary(libraryId) {
  const response = await api.delete(`/library/${libraryId}`);
  return response.data;
}
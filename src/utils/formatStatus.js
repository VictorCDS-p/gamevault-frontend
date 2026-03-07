export default function formatStatus(status) {

  const map = {
    PLAYING: "Jogando",
    COMPLETED: "Finalizado",
    BACKLOG: "Na fila",
    DROPPED: "Abandonado"
  }

  return map[status] || status
}
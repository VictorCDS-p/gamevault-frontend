export default function StatusSelector({
  currentStatus,
  onChange
}) {

  const statuses = [
    "PLAYING",
    "COMPLETED",
    "BACKLOG",
    "DROPPED"
  ]

  return (
    <select
      value={currentStatus}
      onChange={(e) => onChange(e.target.value)}
    >

      {statuses.map((status) => (

        <option key={status} value={status}>
          {status}
        </option>

      ))}

    </select>
  )
}
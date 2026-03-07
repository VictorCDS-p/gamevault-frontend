import formatStatus from "../../utils/formatStatus"

const statuses = [
  "PLAYING",
  "COMPLETED",
  "BACKLOG",
  "DROPPED"
]

export default function StatusSelector({ value, onChange }) {

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>

      {statuses.map((status) => (

        <option key={status} value={status}>
          {formatStatus(status)}
        </option>

      ))}

    </select>
  )
}
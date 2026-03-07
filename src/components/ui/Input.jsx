export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  name
}) {
  return (
    <div className="input-group">
      {label && <label>{label}</label>}

      <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  )
}
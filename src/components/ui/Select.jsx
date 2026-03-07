export default function Select({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  ...props
}) {

  return (
    <div className="select-field">

      {label && <label>{label}</label>}

      <select
        value={value}
        onChange={onChange}
        {...props}
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (

          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>

        ))}

      </select>

    </div>
  )
}
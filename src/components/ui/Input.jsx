// Input.jsx
export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  name
}) {
  return (
    <div className="">
      {label && <label className="">{label}</label>}
      <input
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className=""
      />
    </div>
  );
}
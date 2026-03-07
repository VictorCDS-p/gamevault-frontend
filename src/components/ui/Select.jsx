import { useState, useRef, useEffect } from "react"

export default function Select({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
}) {
  const [open, setOpen] = useState(false)
  const selectRef = useRef(null)

  const handleSelect = (val) => {
    onChange({ target: { value: val } })
    setOpen(false)
  }

  const selectedLabel = options.find((opt) => opt.value === value)?.label || placeholder

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="flex flex-col gap-1 w-full relative" ref={selectRef}>
      {label && (
        <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-lg text-sm font-medium border border-transparent hover:border-primary/50 transition-all w-full"
      >
        <span>{selectedLabel}</span>
        <span className="material-symbols-outlined text-sm">
          expand_more
        </span>
      </button>

      {open && (
        <ul className="absolute z-20 top-full left-0 mt-1 w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg shadow-lg max-h-60 overflow-auto text-sm">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="px-4 py-2 cursor-pointer hover:bg-primary/10 dark:hover:bg-primary/20"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
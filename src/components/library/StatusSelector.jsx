import { useState } from "react"
import { createPortal } from "react-dom"
import formatStatus from "../../utils/formatStatus"
import statusColors from "../../utils/statusColors"

const statuses = ["PLAYING", "COMPLETED", "BACKLOG", "DROPPED"]

export default function StatusSelector({ currentStatus, onChange }) {
  const [open, setOpen] = useState(false)
  const [dropdownTop, setDropdownTop] = useState(0)
  const [dropdownLeft, setDropdownLeft] = useState(0)
  const [dropdownWidth, setDropdownWidth] = useState(0)

  const buttonRef = (el) => {
    if (el) {
      const rect = el.getBoundingClientRect()
      setDropdownTop(rect.bottom + window.scrollY)
      setDropdownLeft(rect.left + window.scrollX)
      setDropdownWidth(rect.width)
    }
  }

  const options = statuses.map((status) => ({
    value: status,
    label: formatStatus(status)
  }))

  const handleSelect = (val) => {
    onChange(val)
    setOpen(false)
  }

  return (
    <div className="flex flex-col gap-1 w-full relative">
      <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
        Status
      </label>

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-lg text-sm font-medium border border-slate-300 dark:border-slate-700 hover:border-primary/50 transition-all w-full cursor-pointer"
      >
        <span className={`${statusColors[currentStatus] || "text-slate-900 dark:text-slate-200"} px-2 py-0.5 rounded`}>
          {options.find((opt) => opt.value === currentStatus)?.label || "Selecione um status"}
        </span>
        <span className="material-symbols-outlined text-base text-slate-400">
          expand_more
        </span>
      </button>

      {open &&
        createPortal(
          <ul
            onWheel={(e) => {
              const el = e.currentTarget
              const { scrollTop, scrollHeight, clientHeight } = el
              const delta = e.deltaY
              const atTop = scrollTop === 0 && delta < 0
              const atBottom = scrollTop + clientHeight >= scrollHeight && delta > 0
              if (atTop || atBottom) e.preventDefault()
            }}
            className="absolute z-50 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg shadow-lg max-h-60 overflow-auto text-sm"
            style={{
              top: dropdownTop,
              left: dropdownLeft,
              width: dropdownWidth
            }}
          >
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`px-4 py-2 cursor-pointer hover:bg-primary/10 dark:hover:bg-primary/20 ${statusColors[option.value]}`}
              >
                {option.label}
              </li>
            ))}
          </ul>,
          document.body
        )}
    </div>
  )
}
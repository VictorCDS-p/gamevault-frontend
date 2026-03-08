import { useState, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import formatStatus from "../../utils/formatStatus";
import statusColors from "../../utils/statusColors";

const STATUSES = ["PLAYING", "COMPLETED", "BACKLOG", "DROPPED"];

export default function StatusSelector({ currentStatus, onChange }) {
  const [open, setOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [open]);

  const handleSelect = (status) => {
    onChange(status);
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-1 w-full relative">
      <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
        Status
      </label>

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-lg text-sm font-medium border border-slate-300 dark:border-slate-700 hover:border-primary/50 w-full"
      >
        <span
          className={`${statusColors[currentStatus] || "text-slate-900 dark:text-slate-200"} px-2 py-0.5 rounded`}
        >
          {formatStatus(currentStatus) || "Selecione um status"}
        </span>
        <span className="material-symbols-outlined text-base text-slate-400">
          expand_more
        </span>
      </button>

      {open &&
        createPortal(
          <ul
            onWheel={(e) => {
              const el = e.currentTarget;
              const { scrollTop, scrollHeight, clientHeight } = el;
              const delta = e.deltaY;
              if (
                (scrollTop === 0 && delta < 0) ||
                (scrollTop + clientHeight >= scrollHeight && delta > 0)
              ) {
                e.preventDefault();
              }
            }}
            className="absolute z-50 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg shadow-lg max-h-60 overflow-auto text-sm"
            style={{
              top: dropdownPos.top,
              left: dropdownPos.left,
              width: dropdownPos.width,
            }}
          >
            {STATUSES.map((status) => (
              <li
                key={status}
                onClick={() => handleSelect(status)}
                className={`px-4 py-2 cursor-pointer hover:bg-primary/10 dark:hover:bg-primary/20`}
              >
                <span
                  className={`${statusColors[status] || "text-slate-900 dark:text-slate-200"}`}
                >
                  {formatStatus(status)}
                </span>{" "}
              </li>
            ))}
          </ul>,
          document.body,
        )}
    </div>
  );
}

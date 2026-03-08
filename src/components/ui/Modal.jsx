export default function Modal({ isOpen, title, children, onClose, className }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        className={`bg-white dark:bg-slate-900 rounded-xl shadow-lg relative max-h-[90vh] w-fit overflow-hidden ${className || ""}`}
      >
        <div className="flex justify-between items-center mb-4 p-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition text-xl"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto px-4 pb-4 max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  )
}
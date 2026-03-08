export default function ProfileStatCard({ label, value, icon, iconColor, percent, percentColor }) {
  return (
    <div className="flex flex-col gap-2 rounded-xl p-5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
      <div className="flex items-center justify-between">
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{label}</p>
        <span className={`material-symbols-outlined ${iconColor} text-xl`}>{icon}</span>
      </div>

      <div className="flex items-end justify-between">
        <p className="text-slate-900 dark:text-white text-3xl font-bold">{value}</p>
        <p className={`text-xs font-bold mb-1 ${percentColor}`}>{percent}</p>
      </div>
    </div>
  );
}
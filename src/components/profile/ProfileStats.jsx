import ProfileStatCard from "./ProfileStatCard.jsx";

export default function ProfileStats({ stats }) {
  const statItems = [
    {
      label: "Total Games",
      value: stats.totalGames,
      icon: "sports_esports",
      iconColor: "text-primary",
      percent: "+12%",
      percentColor: "text-emerald-500"
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: "check_circle",
      iconColor: "text-emerald-500",
      percent: "+5%",
      percentColor: "text-emerald-500"
    },
    {
      label: "Playing",
      value: stats.playing,
      icon: "play_circle",
      iconColor: "text-primary",
      percent: "0%",
      percentColor: "text-slate-400"
    },
    {
      label: "Backlog",
      value: stats.backlog,
      icon: "inventory_2",
      iconColor: "text-orange-400",
      percent: "-2%",
      percentColor: "text-orange-500"
    }
  ];

  return (
    <div className="px-4 py-2">
      <div className="grid grid-cols-2 gap-3">
        {statItems.map((item) => (
          <ProfileStatCard
            key={item.label}
            label={item.label}
            value={item.value}
            icon={item.icon}
            iconColor={item.iconColor}
            percent={item.percent}
            percentColor={item.percentColor}
          />
        ))}
      </div>
    </div>
  );
}
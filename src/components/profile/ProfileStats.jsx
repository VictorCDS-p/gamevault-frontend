import ProfileStatCard from "./ProfileStatCard.jsx";

export default function ProfileStats({ stats = {} }) {
  const { totalGames = 0, completed = 0, playing = 0, backlog = 0 } = stats;

  const calcPercent = (value) => {
    if (totalGames === 0) return "0%";
    return `${((value / totalGames) * 100).toFixed(0)}%`;
  };

  const statItems = [
    {
      label: "Total de jogos",
      value: totalGames,
      icon: "sports_esports",
      iconColor: "text-primary",
      percent: calcPercent(totalGames),
      percentColor: "text-slate-400"
    },
    {
      label: "Finalizado",
      value: completed,
      icon: "check_circle",
      iconColor: "text-emerald-500",
      percent: calcPercent(completed),
      percentColor: "text-emerald-500"
    },
    {
      label: "Jogando",
      value: playing,
      icon: "play_circle",
      iconColor: "text-primary",
      percent: calcPercent(playing),
      percentColor: "text-blue-500"
    },
    {
      label: "Na fila",
      value: backlog,
      icon: "inventory_2",
      iconColor: "text-orange-400",
      percent: calcPercent(backlog),
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
import ProfileStatCard from "./ProfileStatCard.jsx";

export default function ProfileStats({ stats }) {
  return (
    <div className="profile-stats" style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
      <ProfileStatCard label="Total Games" value={stats.totalGames} />
      <ProfileStatCard label="Completed" value={stats.completed} />
      <ProfileStatCard label="Playing" value={stats.playing} />
      <ProfileStatCard label="Backlog" value={stats.backlog} />
    </div>
  );
}
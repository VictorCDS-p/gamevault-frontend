export default function ProfileStatCard({ label, value }) {
  return (
    <div>
      <h2>{value}</h2>
      <p>{label}</p>
    </div>
  );
}
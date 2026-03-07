import Button from "../ui/Button.jsx";

export default function ProfileHeader({ username, email, onEdit }) {
  return (
    <div className="profile-header">
      <h2>{username}</h2>
      <p>{email}</p>
      <Button onClick={onEdit}>Editar Perfil</Button>
    </div>
  );
}
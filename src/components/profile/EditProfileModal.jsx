import { useState } from "react";
import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import Card from "../ui/Card.jsx";

export default function EditProfileModal({ profile, onClose, onSave }) {
  const [username, setUsername] = useState(profile.username);
  const [email, setEmail] = useState(profile.email);

  function handleSubmit(e) {
    e.preventDefault();
    onSave({ username, email });
  }

  return (
    <div className="modal-overlay">
      <Card style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
        <h2>Editar Perfil</h2>
        <form onSubmit={handleSubmit}>
          <Input label="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
            <Button type="submit">Salvar</Button>
            <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
import { useEffect, useState } from "react";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import { userService } from "../services/userService.js";

import ProfileHeader from "../components/profile/ProfileHeader.jsx";
import ProfileStats from "../components/profile/ProfileStats.jsx";
import EditProfileModal from "../components/profile/EditProfileModal.jsx";

export default function Profile() {

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    setLoading(true);
    try {
      const data = await userService.getProfile();
      setProfile(data);
    } catch {
      setError("Erro ao carregar perfil.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const confirmDelete = confirm("Tem certeza que deseja deletar sua conta?");
    if (!confirmDelete) return;

    try {
      await userService.deleteProfile();
      localStorage.removeItem("token");
      window.location.href = "/register";
    } catch {
      setError("Erro ao deletar conta.");
    }
  }

  if (loading) return <p>Carregando perfil...</p>;
  if (!profile) return <p>Perfil não encontrado.</p>;

  return (
    <div>
      <ProfileHeader
        username={profile.username}
        email={profile.email}
        onEdit={() => setShowEditModal(true)}
      />

      <ProfileStats stats={profile.stats} />

      <Card style={{ marginTop: "20px" }}>
        <Button variant="danger" onClick={handleDelete}>
          Deletar conta
        </Button>
      </Card>

      {showEditModal && (
        <EditProfileModal
          profile={profile}
          onClose={() => setShowEditModal(false)}
          onSave={async (updatedData) => {
            try {
              const updatedProfile = await userService.updateProfile(updatedData);
              setProfile(updatedProfile);
              setShowEditModal(false);
            } catch {
              alert("Erro ao atualizar perfil");
            }
          }}
        />
      )}

      {error && <p className="auth-error">{error}</p>}
    </div>
  );
}
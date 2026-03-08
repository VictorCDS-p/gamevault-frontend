import { useEffect, useState } from "react";

import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";

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
    <div className="max-w-3xl mx-auto px-4 py-6">
      <ProfileHeader
        username={profile.username}
        email={profile.email}
        onEdit={() => setShowEditModal(true)}
      />

      <ProfileStats stats={profile.stats} />

      <Card className="mt-6 flex flex-col gap-2 p-5 rounded-xl ">
        <Button
          onClick={handleDelete}
          className="w-full py-3 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
        >
          Deletar conta
        </Button>
      </Card>

      <EditProfileModal
        profile={profile}
        isOpen={showEditModal}
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

      {error && <p className="auth-error mt-4 text-red-500">{error}</p>}
    </div>
  );
}

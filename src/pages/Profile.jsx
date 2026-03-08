import { useEffect, useState } from "react";

import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Modal from "../components/ui/Modal.jsx";

import { userService } from "../services/userService.js";

import ProfileHeader from "../components/profile/ProfileHeader.jsx";
import ProfileStats from "../components/profile/ProfileStats.jsx";
import EditProfileModal from "../components/profile/EditProfileModal.jsx";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // Mensagem de erro geral
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Modal de confirmação

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

  const handleConfirmDelete = async () => {
    try {
      await userService.deleteProfile();
      localStorage.removeItem("token");
      window.location.href = "/register";
    } catch {
      setError("Erro ao deletar conta.");
      setShowDeleteModal(false);
    }
  };

  if (loading) return <p>Carregando perfil...</p>;
  if (!profile) return <p>Perfil não encontrado.</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <ProfileHeader
        username={profile.username}
        email={profile.email}
        onEdit={() => setShowEditModal(true)}
      />

      <ProfileStats
        stats={profile.stats || { totalGames: 0, completed: 0, playing: 0, backlog: 0 }}
      />

      <Card className="mt-6 flex flex-col gap-2 p-5 rounded-xl">
        <Button
          onClick={() => setShowDeleteModal(true)}
          className="w-full py-3 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
        >
          Deletar conta
        </Button>
      </Card>

      {/* Modal de confirmação de deletar conta */}
      <Modal
        isOpen={showDeleteModal}
        title="Confirmação de exclusão"
        onClose={() => setShowDeleteModal(false)}
        className="w-[90vw] max-w-sm p-6"
      >
        <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
          Tem certeza que deseja <strong>deletar sua conta</strong>? Essa ação não pode ser desfeita.
        </p>

        <div className="flex justify-end gap-3">
          <Button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 rounded-lg border text-sm bg-slate-100 dark:bg-slate-800 dark:text-slate-200 hover:bg-slate-200 transition"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmDelete}
            className="px-4 py-2 rounded-lg border text-sm bg-red-100 border-red-200 text-red-600 hover:bg-red-200 hover:text-red-800 transition"
          >
            Deletar
          </Button>
        </div>
      </Modal>

      <EditProfileModal
        profile={profile}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={async (updatedData) => {
          try {
            const updatedProfile = await userService.updateProfile(updatedData);

            setProfile((prev) => ({
              ...updatedProfile,
              stats: prev.stats || { totalGames: 0, completed: 0, playing: 0, backlog: 0 },
            }));

            setShowEditModal(false);
          } catch {
            setError("Erro ao atualizar perfil");
          }
        }}
      />

      {error && (
        <Card className="mt-4 p-4 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 border border-red-300 dark:border-red-700 rounded">
          {error}
        </Card>
      )}
    </div>
  );
}
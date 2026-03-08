import Avatar from "react-avatar";
import Button from "../ui/Button.jsx";

export default function ProfileHeader({ username, email, onEdit }) {
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="relative">
        <Avatar
          name={username}        
          size="128"             
          round={true}           
          className="ring-4 ring-primary/20 dark:ring-primary/10"
        />

        <div
          onClick={onEdit}
          className="absolute bottom-1 right-1 bg-primary text-background-dark rounded-full p-1 border-4 border-background-dark cursor-pointer hover:scale-105 transition-transform"
        >
          <span className="material-symbols-outlined text-sm block">edit</span>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-slate-900 dark:text-white text-2xl font-bold text-center">
          {username}
        </p>
        <p className="text-slate-500 dark:text-primary/70 text-sm text-center mt-1">
          {email}
        </p>
      </div>

      <Button
        onClick={onEdit}
        className="w-48 py-3 rounded-lg border border-slate-400 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
      >
        Editar Perfil
      </Button>
    </div>
  );
}
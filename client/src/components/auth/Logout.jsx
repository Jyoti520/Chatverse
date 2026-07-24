import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SettingSection from "../layout/navigation/settings/SettingSection";
import {useAuth} from "../../hooks/useAuth"
import { toast } from "react-toastify";


function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      // Send logout request to backend
      const success = await logout();

      // Redirect to login or home page
      if (success) navigate("/");
    } catch (error) {
      toast.error("unable to logout:"|| error.message);
    }
  };

  return (
    <SettingSection icon={LogOut} title="Logout">
        <button
          className="w-full group flex justify-center gap-3 items-center mx-auto px-4 py-3 text-slate-900 dark:text-slate-100 bg-red-500/10 rounded-2xl border-2  border-red-500/30 hover:border-red-500/30 hover:shadow-md active:scale-95 transition-all duration-200 backdrop-blur-xl cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="text-red-500 group-hover:translate-x-0.5 transition-transform duration-200"/>
          <span className="text-red-500 text-sm sm:text-base font-semibold">Logout</span>
        </button>
    </SettingSection>
  );
}

export default Logout;

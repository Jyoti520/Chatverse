import { useEffect } from "react";
import ChatLogo from "../../assets/chatverse_logo.png";
import { useNavigate } from "react-router-dom";
import Loader from "../common/Loader";
import { useAuth } from "../../hooks/useAuth";

function LoadScreen() {
  const navigate = useNavigate();
  const { loggeduser } = useAuth();

  useEffect(() => {
    if (!loggeduser) {
      navigate("/");
    } else {
      navigate("/chats");
    }
  }, [loggeduser, navigate]);

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950">

     <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/10 blur-3xl dark:bg-indigo-600/10" />

      {/* Logo */}
      <div className="relative flex flex-col items-center gap-5">
        <div className="flex flex-col items-center gap-4">
          <img
            src={ChatLogo}
            alt="Chatverse logo"
            className="h-20 w-20 object-contain"
          />
          <h2 className="font-logo text-3xl font-semibold tracking-wide text-slate-800 dark:text-white">
            Chatverse
          </h2>
        </div>

        {/* Loader */}
        <div className="flex flex-col items-center gap-3">
          <Loader textColor="text-indigo-500" />
          <p className="text-center text-sm uppercase tracking-[0.3em] text-slate-600 dark:text-slate-400">
            Loading
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoadScreen;
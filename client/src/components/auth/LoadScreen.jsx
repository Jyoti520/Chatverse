import { useEffect } from "react";
import ChatLogo from "../../assets/chat_icon.PNG";
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
  }, [loggeduser]);

  return (
 <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden 
      bg-gradient-to-br from-indigo-400 via-blue-400 to-cyan-300
    dark:from-indigo-200/10 dark:via-blue-500/10 dark:to-cyan-500/10"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/30 dark:bg-slate-950/85 backdrop-blur-xl" />

      {/* Soft Glow */}
      <div className="absolute top-[-120px] left-[-80px] h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-80px] h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Logo */}
      <div className="relative z-10 flex flex-col justify-center items-center gap-5">
        <div className="flex flex-col items-center gap-4 ">
          <img
            src={ChatLogo}
            alt="chat-logo"
            className="w-20 h-20 object-cover rounded-3xl shadow-2xl shadow-indigo-500/20 border border-white/20 dark:border-white/10"
          />
          <h2 className="text-3xl font-semibold tracking-wide text-slate-800 dark:text-white">
            Chatverse
          </h2>
        </div>

        {/* Loader */}
        <div className="flex flex-col items-center gap-3"></div>
        <Loader textColor="text-indigo-500" />
        <p className="text-sm uppercase tracking-[0.3em] text-center text-slate-600 dark:text-slate-400">
          Loading
        </p>
      </div>
    </div>
  );
}

export default LoadScreen;

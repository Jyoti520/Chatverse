import { useState } from "react";
import Signup from "../components/auth/Signup";
import Logo from "../assets/Logo";
import Login from "../components/auth/Login";

function AuthPage() {
  const [isActive, setActive] = useState(true);

  return (
    <div
      className="relative flex min-h-dvh items-center justify-center overflow-hidden 
      bg-gradient-to-br from-indigo-400 via-blue-400 to-cyan-300
    dark:from-indigo-200/10 dark:via-blue-500/10 dark:to-cyan-500/10 px-4"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/30 dark:bg-slate-950/85 backdrop-blur-xl" />
      {/* Soft Glow */}
      <div className="absolute top-[-120px] left-[-80px] h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-80px] h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Auth Card */}
      <div
        className={`relative w-full max-w-md my-4 sm:my-6 max-h-[95vh]
        rounded-3xl border border-white/20 dark:border-white/10 overflow-y-auto
        backdrop-blur-2xl shadow-md px-5 sm:px-6 py-5 transition-all duration-500 ${
          isActive
            ? "bg-indigo-50/70 dark:bg-white/[0.03] shadow-blue-500/70"
            : "bg-white/60 dark:bg-white/[0.03]"
        }`}
      >
        {/* Logo */}
        <div className="mt-4 flex justify-center">
          <Logo text={"text-2xl"} />
        </div>
        <p className="my-6 text-sm font-medium tracking-wide text-slate-600 dark:text-slate-400 text-center">
          {isActive
            ? "Connect and continue your conversations."
            : "Create your account and start chatting."}
        </p>

        {/* Form */}
        <div className="transition-all duration-300">
          {isActive ? (
            <Login setPage={() => setActive(false)} />
          ) : (
            <Signup setPage={() => setActive(true)} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;

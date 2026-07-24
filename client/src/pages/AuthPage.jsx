import { useState } from "react";
import Signup from "../components/auth/Signup";
import Logo from "../assets/Logo";
import Login from "../components/auth/Login";

function AuthPage() {
  const [isActive, setActive] = useState(true);

  return (
    <div
      className="relative flex min-h-dvh items-center justify-center overflow-hidden 
      bg-slate-100 dark:bg-slate-900 px-4"
    >
      {/* Overlay */}
     <div className="absolute -top-60 -left-60 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[140px]" />
     <div className="absolute -bottom-72 -right-52 h-[500px] w-[500px] rounded-full bg-violet-400/10 blur-[140px]" />

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md my-6">
        <div className="rounded-2xl border border-indigo-200 dark:border-white/[0.07] bg-white/90 
        dark:bg-white/[0.03] shadow-sm dark:shadow-black/40 px-8 py-10">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Logo text={"text-2xl"} showTitle={false}/>
          </div>

          {/* Heading */}
          <div className="my-8 text-center">
            <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
              {isActive ? "Welcome Back" : "Create an account"}
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {isActive
                ? "Sign in to continue your conversations"
                : "Create your account to start chatting."}
            </p>
          </div>

          {/* Form */}
          <div className="mt-6 transition-all duration-300">
            {isActive ? (
              <Login setPage={() => setActive(false)} />
            ) : (
              <Signup setPage={() => setActive(true)} />
            )}
          </div>
        </div>

        {/* Footer */}

        <p className="mt-5 text-center text-xs sm:text-sm text-slate-600 dark:text-slate-500">
          By continuing, you agree to our{" "}
          <a
            href="#"
            className="underline underline-offset-2 hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
          >
            Terms
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="underline underline-offset-2 hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;

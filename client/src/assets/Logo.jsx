import ChatLogo from "../assets/chat_icon.PNG";

function Logo({ text = "" }) {
  return (
    <div className={`flex items-center gap-3 select-none`}>
      {/* Logo container */}
      <div
        className={`relative flex justify-center items-center h-11 w-11 sm:h-12 sm:w-12 overflow-hidden logo bg-gradient-to-br from-indigo-500/10 via-blue-500/10 to-cyan-400/10 rounded-2xl  dark:bg-slate-800 border border-indigo-200/60 dark:border-indigo-400/20 shadow-sm shadow-indigo-200/40 dark:shadow-indigo-925/20 backdrop-blur-xl transition-all duration-300`}
      >
        <div className="absolute inset-0 z-50 bg-gradient-to-br from-indigo-500/10 via-blue-500/10 to-cyan-500/10 dark:from-indigo-500/20 dark:via-blue-500/20 dark:to-cyan-400/20" />

        <img
          src={ChatLogo}
          alt="Chatverse logo"
          className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover"
        />
      </div>

      {/* Logo title */}
      <div className="flex flex-col leading-tight">
        <h2
          className={`font-poppins font-semibold tracking-tight text-slate-800 dark:text-white ${text}`}
        >
          Chatverse
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Real-Time messaging
        </p>
      </div>
    </div>
  );
}

export default Logo;

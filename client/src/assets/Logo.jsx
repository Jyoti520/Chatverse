import ChatLogo from "../assets/chatverse_logo.png";

function Logo({ className = "", text, showTitle = true }) {
  return (
    <div className={`flex items-center justify-center gap-1 select-none ${className}`}>
      {/* Logo icon */}
      <div className="flex shrink-0 items-center justify-center overflow-hidden transition-all duration-300">
        <img
          src={ChatLogo}
          alt="Chatverse logo"
          className="h-10 w-10 object-contain sm:h-12 sm:w-12"
        />
      </div>

      {/* Logo title */}
     {showTitle && <div className="flex flex-col items-start leading-tight">
        <h2
          className={`font-logo font-bold tracking-tighter text-indigo-700 dark:text-indigo-400 ${text}`}
        >
          Chatverse
        </h2>
      </div>}
    </div>
  );
}

export default Logo;
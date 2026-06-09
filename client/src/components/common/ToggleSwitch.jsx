function ToggleSwitch({ label, isEnabled, onToggle }) {
  return (
    <div className="flex justify-between items-center pt-2">
      <span className="text-sm sm:text-md text-gray-500 dark:text-gray-300">{label}</span>
      <button
        className={`relative inline-flex h-5 w-10 items-center rounded-full backdrop-blur-md  transition-all duration-300  ${
          isEnabled
            ? "bg-gradient-to-r from-blue-500 to-indigo-500  shadow-[0_0_0_2px_rgba(39,159,246,0.6)]"
            : "bg-gray-400 dark:bg-gray-500 shadow-none"
        }`} aria-pressed="true"
        onClick={() => onToggle(!isEnabled)}
      >
        <span
          className={`absolute w-5 h-5 rounded-full bg-white dark:bg-gray-100 backdrop-blur-sm py-1 transform transition-all duration-300 ${
            isEnabled ? "translate-x-5" : "translate-x-0"
          }`}
        ></span>
      </button>
    </div>
  );
}

export default ToggleSwitch;

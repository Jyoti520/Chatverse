import { useId } from "react";

function Input({ children, label, type = "text", className = "", ...props }) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          className="m-2 font-medium block text-sm dark:text-slate-400 
          text-slate-600 tracking-wide"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full max-w-full text-sm sm:text-base px-4 py-1 text-slate-800 dark:text-slate-200 outline-none focus:outline-none placeholder:text-slate-500 dark:placeholder:text-slate-500 transition-all duration-200 ${className}`}
        {...props}
        id={id}
        required
      />
    </div>
  );
}

export default Input;

import { useId } from "react";

function Input({ children, label, type = "text", className = "", ...props }) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          className="font-medium inline-block mb-2 pr-4 text-sm sm:text-base dark:text-slate-300 text-slate-700"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full max-w-full text-sm sm:text-base px-4 py-1 text-slate-800 dark:text-slate-200 outline-none focus:outline-none placeholder:text-slate-500 bg-transparent dark:placeholder:text-slate-500 transition-all duration-300 ${className}`}
        {...props}
        id={id}
        required
      />
    </div>
  );
}

export default Input;

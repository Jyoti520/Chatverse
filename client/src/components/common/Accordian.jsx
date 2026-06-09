import { useState } from "react";
import { ChevronUp } from "lucide-react";

function Accordian({ title, children }) {
  const [show, setShow] = useState(false);
  return (
    <div className={`border-b border-slate-200 dark:border-white/10 ${show? "bg-indigo-500/[0.03]":""}`}>
      <div className="space-y-2 flex-1 justify-center items-center px-4 py-3">
        <button
          className="w-full flex justify-between items-center text-left transition-colors hover:text-indigo-600 dark:hover:text-indigo-300 duration-300"
          onClick={() => setShow(!show)}
        >
          <span className="text-slate-700 dark:text-slate-200 text-sm font-medium">
            {title}
          </span>
          <ChevronUp
            className={`text-indigo-600 dark:text-slate-400 transform transition-transform ease-out duration-300 ${
              show ? "rotate-180" : "rotate-0"
            }`}
            size={16}
          />
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ease-out  ${
            show ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 py-1 text-sm leading-relaxed">
            <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
              {children}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accordian;

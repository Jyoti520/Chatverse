import { useRef, useState, useEffect } from "react";
import { Calendar, X } from "lucide-react";
import Input from "../../common/Input";
import { toast } from "react-toastify";
import { useChat } from "../../../hooks/useChat";
import { useMessage } from "../../../hooks/useMessage";

function MessageOptions({ isOpen, onClose }) {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [loading, setLoading] = useState(false);
  const menuRef = useRef(null);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const { selectedChat } = useChat();
  const {deleteMessagesByMonth} = useMessage();

  const handleChange=(e)=>{
    const value= e.target.value;
    const [month, year] =value.split("-");
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    if(Number(year) > currentYear ||  (Number(year)===currentYear && Number(month) > currentMonth)){
      toast.error("Future date is not allowed");
      return;
    }
    setSelectedMonth(value);
  }

  const handleDeleteMessages = async (e) => {
    e.preventDefault();
    if (!selectedChat?._id || !selectedMonth.includes("-")) return;
    const [year, month] = selectedMonth.split("-");
    
    const confirmDel = window.confirm(
      `Are you sure you want to delete all messages from  this ${month}/${year}?`,
    );
    if (!confirmDel) return;
    setLoading(true);
    try {
      await deleteMessagesByMonth(
        selectedChat._id,
        year,
        month,
      );
      onClose();
    } finally {
      setLoading(false);
    }
  };
  //default month / year
  useEffect(() => {
    if (!isOpen) return;
    const current = new Date();
    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, "0");
    setSelectedMonth(`${year}-${month}`);
  }, [isOpen]);

  // reset state
  useEffect(() => {
    if (!isOpen) {
      setShowMonthPicker(false);
      setLoading(false);
    }
  }, [isOpen]);

  //close outside on click
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)){
         onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  return (
    <div
      ref={menuRef}
      className={`min-w-[220px] p-2 top-32 right-6 absolute bg-white/80 dark:bg-slate-900/0 rounded-3xl flex justify-center shadow-xl backdrop-blur-xl border border-indigo-500/20 dark:border-white/10 transition-all duration-300 z-50 ${
        isOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-2 pointer-events-none"
      }`}
    >
      {!showMonthPicker && (
        <>
          <button
            className="flex gap-3 py-1 justify-center items-center text-slate-600 dark:text-slate-200 font-medium text-sm hover:bg-indigo-500/5 dark:hover:bg-white/5"
            onClick={() => setShowMonthPicker(true)}
          >
            <Calendar size={18} className="text-indigo-500" />
            Date by month
          </button>
        </>
      )}
      {showMonthPicker && (
        <div className="p-2 space-y-5">
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-slate-700 dark:text-slate-200 text-sm">
              Select month
            </h2>

            <button onClick={() => setShowMonthPicker(false)} className="rounded-xl p-1 hover:bg-red-500/10">
              <X size={18} className="text-red-500" />
            </button>
          </div>
          <div className="flex gap-2">
            <Input
              className="rounded-2xl border border-indigo-200/60 bg-indigo-500/5 px-3 py-2
                 backdrop-blur-xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20
                dark:border-white/10 dark:bg-white/[0.03]"
              type="month"
              value={selectedMonth}
              onChange={handleChange}
            />
            <button
              disabled={!selectedMonth || loading}
              className="flex justify-center text-white items-center text-sm gap-2 px-3 py-1 rounded-2xl   disabled:opacity-50 bg-red-500/90 disabled:cursor-not-allowed"
              onClick={handleDeleteMessages} aria-label="close month picker"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageOptions;



function Avatar({ children, className="" }) {
  return (
    <div className={`${className} h-10 w-10 sm:h-11 sm:w-11 flex justify-center shrink-0 select-none items-center text-white rounded-2xl bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400 font-semibold shadow-sm ring-1 ring-black/5 dark:ring-white/10 text-sm`}>
      {children}
    </div>
  );
}

export default Avatar;

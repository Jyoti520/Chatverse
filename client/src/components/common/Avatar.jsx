function Avatar({ children, className="" }) {
  return (
    <div className={`${className} h-9 w-9 sm:h-10 sm:w-10 flex justify-center shrink-0 select-none items-center text-white rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 font-medium shadow-sm ring-1 ring-black/5 dark:ring-white/10 text-sm`}>
      {children}
    </div>
  );
}

export default Avatar;

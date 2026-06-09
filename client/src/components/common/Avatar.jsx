function Avatar({ children, className="" }) {
  return (
    <div className={`${className} h-10 w-10 sm:h-11 sm:w-11 flex justify-center items-center text-white rounded-2xl bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400 font-semibold shadow-md shadow-indigo-500/20 text-sm`}>
      {children}
    </div>
  );
}

export default Avatar;

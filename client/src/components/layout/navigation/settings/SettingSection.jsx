function SettingSection({ icon: Icon, title, children }) {
  return (
    <section
      className="w-full min-w-0 rounded-2xl bg-white/60
         dark:bg-white/[0.03] border border-white/10
       backdrop-blur-xl shadow-sm dark:shadow-none overflow-hidden p-4 transition-all duration-300"
    >
      {/* Header */}
      <div
        className="
           flex items-center gap-3
           mb-4 pb-3
           border-b
           border-indigo-200/70
           dark:border-blue-500/20
           min-w-0
         "
      >
        <div
          className="w-11 h-11 shrink-0 flex justify-start items-center gap-3 p-3 rounded-2xl bg-gradient-to-br
             from-indigo-500/10
             via-blue-500/10
             to-cyan-400/10
             dark:from-indigo-500/15
             dark:via-blue-500/15
             dark:to-cyan-400/15 min-w-0 text-indigo-400 font-medium"
        >
          <Icon size={20} className="text-indigo-500 dark:text-indigo-300" />
          </div>
          <h2 className="truncate text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200">
            {title}
          </h2>
          </div>
        <div className="w-full min-w-0">{children}</div>
    </section>
  );
}

export default SettingSection;


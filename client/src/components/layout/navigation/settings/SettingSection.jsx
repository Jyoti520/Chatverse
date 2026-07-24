function SettingSection({ icon: Icon, title, description, action, children }) {
  return (
    <section className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm shadow-slate-900/5 transition-shadow duration-200 dark:border-white/10 dark:bg-slate-900 dark:shadow-black/20">
      {/* Header */}
      <div className="mb-4 flex min-w-0 items-start justify-between gap-3 border-b border-slate-100 pb-3 dark:border-white/5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-500/10 sm:h-10 sm:w-10">
            <Icon size={17} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold text-slate-700 dark:text-slate-200 sm:text-base">
              {title}
            </h2>
            {description && (
              <p className="truncate text-xs text-slate-400 dark:text-slate-500">
                {description}
              </p>
            )}
          </div>
        </div>

        {action && <div className="shrink-0">{action}</div>}
      </div>

      {/* Content */}
      <div className="w-full min-w-0">{children}</div>
    </section>
  );
}

export default SettingSection;
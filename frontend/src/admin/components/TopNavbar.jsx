
const TopNavbar = ({ pageTitle = "Dashboard" }) => {
  return (
    <header data-testid="admin-top-navbar" aria-label="Admin top navigation" className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
      <div className="px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-500 uppercase tracking-[0.2em]">Hello</p>
            <h1 className="text-3xl font-bold text-slate-900">Amanuel</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600 text-white text-lg font-bold">
              A
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-700">Administrator</p>
              <p data-testid="admin-current-page" className="text-xs text-slate-400">{pageTitle}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
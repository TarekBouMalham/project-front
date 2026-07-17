const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-800 to-slate-700 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col justify-center">
        <div className="rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-300">
                Welcome back
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-white">
                Your personal shopping hub
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
                Review your list, keep track of essentials, and jump right back
                into planning your next trip.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-5">
              <p className="text-sm text-slate-300">Current focus</p>
              <p className="mt-2 text-xl font-semibold text-white">
                Fresh picks and essentials
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Stay organized with a clean view of everything you need.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-5">
              <p className="text-sm text-slate-300">Quick action</p>
              <p className="mt-2 text-xl font-semibold text-white">
                One tap away
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Open your shopping list instantly and keep the next plan moving.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

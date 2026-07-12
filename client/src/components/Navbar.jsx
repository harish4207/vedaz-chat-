import { LogOut, MoonStar, SunMedium } from 'lucide-react';

export default function Navbar({ username, connected, darkMode, onToggleDarkMode, onLogout, onlineCount = 0 }) {
  return (
    <header className="glass flex flex-wrap items-center justify-between gap-4 rounded-[1.75rem] px-5 py-4 shadow-glow">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-600">PulseChat</p>
        <div className="mt-1 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold text-slate-900">{username || 'Guest'}</h1>
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${connected ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
            {connected ? '🟢 Connected' : '🔴 Reconnecting...'}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{onlineCount} Users Online</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onToggleDarkMode}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
        >
          {darkMode ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
          {darkMode ? 'Light' : 'Dark'}
        </button>
        <button
          onClick={onLogout}
          className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </header>
  );
}
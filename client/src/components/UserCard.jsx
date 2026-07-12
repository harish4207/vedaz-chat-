export default function UserCard({ username, online = true, me = false }) {
  const initials = username
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition hover:-translate-y-0.5 hover:shadow-sm">
      <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${me ? 'bg-brand-600 text-white' : 'bg-brand-50 text-brand-700'}`}>
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate font-medium text-slate-900">{username}</span>
          {me ? <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand-700">You</span> : null}
        </div>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
          <span className={`h-2 w-2 rounded-full ${online ? 'bg-emerald-500' : 'bg-slate-300'}`} />
          <span>{online ? 'Online' : 'Offline'}</span>
        </div>
      </div>
    </div>
  );
}
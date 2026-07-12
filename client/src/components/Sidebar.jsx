import UserCard from './UserCard';

export default function Sidebar({ users = [], currentUser }) {
  return (
    <aside className="glass rounded-[1.75rem] p-5 shadow-glow">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900">Online users</h2>
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">{users.length} online</span>
      </div>

      <div className="mt-4 space-y-3">
        {users.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">No users online yet.</p>
        ) : (
          users.map((user) => (
            <UserCard
              key={user._id || user.username}
              username={user.username}
              online={user.online}
              me={user.username === currentUser}
            />
          ))
        )}
      </div>
    </aside>
  );
}
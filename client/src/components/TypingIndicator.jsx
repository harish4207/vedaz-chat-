export default function TypingIndicator({ username }) {
  if (!username) return null;

  return <div className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-500">{username} is typing...</div>;
}
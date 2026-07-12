export default function TypingIndicator({ username }) {
  if (!username) return null;

  return (
    <div className="inline-flex items-center gap-3 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-500">
      <span>{username} is typing...</span>
      <span className="flex items-center gap-1 text-brand-600">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.2s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.1s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
      </span>
    </div>
  );
}
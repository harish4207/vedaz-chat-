import { formatTime } from '../utils/formatTime';

const avatarColors = [
  'bg-sky-500 text-white',
  'bg-emerald-500 text-white',
  'bg-amber-500 text-white',
  'bg-rose-500 text-white',
  'bg-violet-500 text-white'
];

function pickAvatarColor(name) {
  const value = String(name || '')
    .split('')
    .reduce((total, character) => total + character.charCodeAt(0), 0);

  return avatarColors[value % avatarColors.length];
}

export default function ChatBubble({ message }) {
  const statusText = message.mine ? (message.read ? '✓✓ Read' : message.delivered ? '✓ Delivered' : '✓ Sending') : null;
  const initials = String(message.sender || '?')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className={`flex items-end gap-3 ${message.mine ? 'justify-end' : 'justify-start'}`}>
      {!message.mine ? (
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${pickAvatarColor(message.sender)}`}>
          {initials}
        </div>
      ) : null}
      <div className={`max-w-[60%] rounded-[1.5rem] px-4 py-3 shadow-sm transition ${message.mine ? 'bg-brand-600 text-white' : 'bg-white text-slate-800'} animate-[fadeIn_200ms_ease-out]`}>
        <p className="text-sm leading-6">{message.text}</p>
        <div className={`mt-2 text-xs ${message.mine ? 'text-brand-100' : 'text-slate-400'}`}>
          <span>{message.sender}</span>
          <span className="mx-1">·</span>
          <span>{formatTime(message.createdAt)}</span>
          {statusText ? <span className="ml-2">· {statusText}</span> : null}
        </div>
      </div>
    </article>
  );
}
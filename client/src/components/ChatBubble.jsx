import { formatTime } from '../utils/formatTime';

export default function ChatBubble({ message }) {
  const statusText = message.mine ? (message.read ? '✓✓ Read' : message.delivered ? '✓ Delivered' : '✓ Sending') : null;

  return (
    <article className={`flex ${message.mine ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[min(32rem,90%)] rounded-[1.5rem] px-4 py-3 shadow-sm transition ${message.mine ? 'bg-brand-600 text-white' : 'bg-white text-slate-800'}`}>
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
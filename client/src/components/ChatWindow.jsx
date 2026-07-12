import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import EmptyState from './EmptyState';
import LoadingSpinner from './LoadingSpinner';
import TypingIndicator from './TypingIndicator';

export default function ChatWindow({ messages = [], loading = false, error = '', typingUser = '', message, setMessage, onSend }) {
  return (
    <section className="glass flex min-h-[72vh] flex-col rounded-[1.75rem] shadow-glow">
      <div className="flex-1 space-y-4 overflow-y-auto p-5 sm:p-6">
        {loading ? <LoadingSpinner /> : null}
        {error ? <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}
        {!loading && messages.length === 0 ? <EmptyState /> : null}
        {messages.map((item) => (
          <ChatBubble key={item.id} message={item} />
        ))}
        <TypingIndicator username={typingUser} />
      </div>

      <ChatInput value={message} onChange={setMessage} onSubmit={onSend} />
    </section>
  );
}
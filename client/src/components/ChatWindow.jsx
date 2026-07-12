import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import EmptyState from './EmptyState';
import LoadingSpinner from './LoadingSpinner';
import TypingIndicator from './TypingIndicator';

export default function ChatWindow({ messages = [], loading = false, error = '', typingUser = '', message, setMessage, onSend, onRetry, inputRef, sendDisabled = false }) {
  return (
    <section className="glass flex min-h-[72vh] flex-col rounded-[1.75rem] shadow-glow">
      <div className="flex-1 space-y-4 overflow-y-auto p-5 sm:p-6">
        {loading ? <LoadingSpinner /> : null}
        {error ? (
          <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
            <div className="font-semibold">Unable to connect</div>
            <div className="mt-1">{error}</div>
            {onRetry ? (
              <button type="button" onClick={onRetry} className="mt-3 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700">
                Retry
              </button>
            ) : null}
          </div>
        ) : null}
        {!loading && messages.length === 0 ? <EmptyState description="Start chatting" /> : null}
        {messages.map((item) => (
          <ChatBubble key={item.id} message={item} />
        ))}
       <div className="text-red-600 font-bold">
  Typing User: {typingUser || "NONE"}
</div>

<TypingIndicator username={typingUser} />
      </div>

      <ChatInput value={message} onChange={setMessage} onSubmit={onSend} inputRef={inputRef} disabled={sendDisabled} />
    </section>
  );
}
import { SendHorizontal } from 'lucide-react';

export default function ChatInput({ value, onChange, onSubmit, disabled = false, inputRef }) {
  return (
    <form onSubmit={onSubmit} className="border-t border-slate-200 p-4 sm:p-5">
      <div className="flex items-end gap-3 rounded-[1.4rem] border border-slate-200 bg-white p-3 shadow-sm focus-within:border-brand-300 focus-within:ring-4 focus-within:ring-brand-100">
        <textarea
          ref={inputRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={1}
          placeholder="Type a message..."
          maxLength={1000}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              event.currentTarget.form?.requestSubmit();
            }
          }}
          className="max-h-36 flex-1 resize-none border-0 bg-transparent px-1 py-2 text-sm outline-none"
        />
        <button
          type="submit"
          disabled={disabled}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-brand-400"
        >
          <SendHorizontal className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
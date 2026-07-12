import { MessageCircleMore } from 'lucide-react';

export default function EmptyState({ title = 'No messages yet', description = 'Start the conversation.' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-[2rem] border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center text-slate-500">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <MessageCircleMore className="h-7 w-7" />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
}
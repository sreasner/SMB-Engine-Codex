import { Sparkles, Send, PhoneCall } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useBuildStore } from '@/store/useBuildStore';
import { ask, isAvailable, type ChatTurn } from '@/lib/pathfinder';
import { BUNDLE } from '@/content/copy';

interface PathfinderChatProps {
  onScheduleCall: () => void;
}

export function PathfinderChat({ onScheduleCall }: PathfinderChatProps) {
  const state = useBuildStore();
  const [history, setHistory] = useState<ChatTurn[]>([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const available = isAvailable();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history.length, thinking]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || thinking) return;
    const next: ChatTurn[] = [...history, { role: 'user', text: trimmed }];
    setHistory(next);
    setInput('');
    setThinking(true);
    const reply = await ask({ business: state.business, services: state.services }, next, trimmed);
    setHistory([...next, { role: 'assistant', text: reply }]);
    setThinking(false);
  }

  if (!available) {
    return (
      <section className="card p-5 bg-primary-50 border-primary-200">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={16} className="text-primary" aria-hidden />
          <h3 className="fb-h4">{BUNDLE.chatPrompt}</h3>
        </div>
        <p className="fb-body text-neutral-700 mb-3">
          Chat is offline in this environment. Our advisors can walk through any question in 15 minutes.
        </p>
        <button type="button" onClick={onScheduleCall} className="btn btn-primary">
          <PhoneCall size={14} /> Schedule a call
        </button>
      </section>
    );
  }

  return (
    <section className="card p-5 bg-primary-50 border-primary-200">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles size={16} className="text-primary" aria-hidden />
        <h3 className="fb-h4">{BUNDLE.chatPrompt}</h3>
      </div>
      <p className="fb-caption mb-3">{BUNDLE.chatExamples}</p>

      <div className="bg-white rounded-md border border-neutral-200 p-3 max-h-80 overflow-y-auto space-y-3" aria-live="polite">
        {history.length === 0 && (
          <p className="fb-caption">Ask a question and I'll answer in 1–3 sentences.</p>
        )}
        {history.map((turn, i) => (
          <div key={i} className={turn.role === 'user' ? 'text-right' : ''}>
            <span
              className={`inline-block max-w-[85%] rounded-md px-3 py-2 text-sm ${
                turn.role === 'user' ? 'bg-secondary-50 text-neutral-900' : 'bg-neutral-50 text-neutral-900'
              }`}
            >
              {turn.text}
            </span>
          </div>
        ))}
        {thinking && (
          <div>
            <span className="inline-block rounded-md px-3 py-2 text-sm bg-neutral-50 text-neutral-500">
              Pathfinder is thinking…
            </span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form className="mt-3 flex gap-2" onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={BUNDLE.chatPlaceholder}
          className="input flex-1"
          disabled={thinking}
          aria-label="Ask the Pathfinder"
        />
        <button type="submit" disabled={!input.trim() || thinking} className="btn btn-primary">
          <Send size={14} /> Send
        </button>
      </form>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import ReactMarkdown from "react-markdown";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, MessageCircle, RotateCcw, Square, X } from "lucide-react";
import logo from "@/assets/tingis-logo.png";

const KEY = "tingis-chat";
const suggestions = ["Comment inscrire mon enfant ?", "Quels sont les horaires ?", "Proposez-vous le transport scolaire ?"];

function loadMessages(): UIMessage[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as UIMessage[];
  } catch {
    return [];
  }
}

export function ChatWidget() {
  const [ready, setReady] = useState(false);
  const [initial, setInitial] = useState<UIMessage[]>([]);
  useEffect(() => {
    setInitial(loadMessages());
    setReady(true);
  }, []);
  if (!ready) return null;
  return <Chat initial={initial} />;
}

function Chat({ initial }: { initial: UIMessage[] }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status, stop, setMessages } = useChat({
    id: "tingis",
    messages: initial,
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    onError: (e) => setError(e.message || "Connexion impossible. Réessayez."),
  });
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (status === "ready" || status === "error") localStorage.setItem(KEY, JSON.stringify(messages));
  }, [messages, status]);
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, status, open]);
  useEffect(() => {
    if (open && !busy) inputRef.current?.focus();
  }, [open, busy]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t || busy) return;
    setError(null);
    setInput("");
    void sendMessage({ text: t });
  };

  return (
    <div className="no-print fixed right-4 bottom-4 z-[55] md:right-6 md:bottom-6">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="mb-3 flex h-[min(34rem,calc(100vh-7rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[1.75rem] border border-line bg-paper shadow-lift"
            role="dialog"
            aria-label="Assistant Madariss Tingis"
          >
            <div className="flex items-center gap-3 bg-teal-900 px-4 py-3 text-white">
              <span className="grid size-10 place-items-center overflow-hidden rounded-full bg-white p-1">
                <img src={logo} alt="" className="h-full w-auto object-contain object-left" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-lg leading-tight">Assistant Tingis</p>
                <p className="text-xs text-white/70">Réponses instantanées pour les familles</p>
              </div>
              {messages.length > 0 ? (
                <button type="button" aria-label="Nouvelle conversation" onClick={() => { stop(); setMessages([]); localStorage.removeItem(KEY); }} className="grid size-9 place-items-center rounded-full hover:bg-white/15">
                  <RotateCcw className="size-4" />
                </button>
              ) : null}
              <button type="button" aria-label="Fermer" onClick={() => setOpen(false)} className="grid size-9 place-items-center rounded-full hover:bg-white/15">
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.length === 0 ? (
                <div>
                  <p className="text-ink-900">Bonjour 👋 Je réponds à vos questions sur l'école : inscriptions, cycles, horaires, services…</p>
                  <div className="mt-4 flex flex-col gap-2">
                    {suggestions.map((s) => (
                      <button key={s} type="button" onClick={() => send(s)} className="rounded-2xl border border-line bg-white px-3 py-2 text-left text-sm font-semibold text-teal-700 hover:border-coral-500 hover:text-coral-700">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
              {messages.map((m) => (
                <div key={m.id} className={m.role === "user" ? "flex justify-end" : ""}>
                  {m.role === "user" ? (
                    <p className="max-w-[85%] rounded-2xl rounded-br-md bg-coral-600 px-3.5 py-2 text-sm text-white">
                      {m.parts.map((p) => (p.type === "text" ? p.text : "")).join("")}
                    </p>
                  ) : (
                    <div className="prose prose-sm max-w-none text-sm text-ink-900 [&_a]:text-coral-700 [&_p]:my-1.5 [&_ul]:my-1.5 [&_ul]:list-disc [&_ul]:pl-5">
                      {m.parts.map((p, i) => (p.type === "text" ? <ReactMarkdown key={i}>{p.text}</ReactMarkdown> : null))}
                    </div>
                  )}
                </div>
              ))}
              {status === "submitted" ? (
                <div className="flex gap-1 py-2" aria-label="L'assistant écrit">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="size-2 animate-bounce rounded-full bg-teal-700" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              ) : null}
              {error ? <p className="rounded-xl bg-coral-50 px-3 py-2 text-sm text-coral-700">{error}</p> : null}
              <div ref={endRef} />
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-end gap-2 border-t border-line bg-white p-3"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
                rows={1}
                placeholder="Posez votre question…"
                className="max-h-28 min-h-10 flex-1 resize-none rounded-2xl bg-sand px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-700/30"
              />
              {busy ? (
                <button type="button" onClick={() => stop()} aria-label="Arrêter" className="grid size-10 shrink-0 place-items-center rounded-full bg-teal-900 text-white">
                  <Square className="size-4" />
                </button>
              ) : (
                <button type="submit" disabled={!input.trim()} aria-label="Envoyer" className="grid size-10 shrink-0 place-items-center rounded-full bg-coral-600 text-white disabled:opacity-40">
                  <ArrowUp className="size-5" />
                </button>
              )}
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Fermer l'assistant" : "Ouvrir l'assistant"}
          className="flex items-center gap-2 rounded-full bg-coral-600 px-5 py-3.5 font-bold text-white shadow-lift transition-transform hover:scale-105"
        >
          {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
          <span className="hidden sm:inline">{open ? "Fermer" : "Une question ?"}</span>
        </button>
      </div>
    </div>
  );
}

import { useState, useRef, useEffect, type FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import { Sparkles, Send, Bot, User } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { toast } from "sonner";
import { TestModeModal } from "./TestModeModal";

interface ChatMsg {
  role: "user" | "assistant";
  content: string;
}

export function AiChatbot() {

  const { t } = useI18n();
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    const userMsg: ChatMsg = { role: "user", content: trimmed };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setStreaming(true);

    // 1. Try local FAQ matching first
    const lower = trimmed.toLowerCase();
    const matchKey = Object.keys(t.chatbot).find(key => lower.includes(key.toLowerCase()));
    
    if (matchKey) {
      // Small delay to simulate "thinking"
      setTimeout(() => {
        setMessages([...nextMessages, { role: "assistant", content: t.chatbot[matchKey] }]);
        setStreaming(false);
      }, 600);
      return;
    }

    try {
      const resp = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "chat", messages: nextMessages }),
      });

      if (resp.status === 429) {
        toast.error("Rate limit exceeded — try again shortly.");
        setStreaming(false);
        setMessages(nextMessages);
        return;
      }
      if (resp.status === 402) {
        toast.error("AI credits exhausted. Add funds in Workspace settings.");
        setStreaming(false);
        return;
      }
      if (!resp.ok || !resp.body) {
        throw new Error(`HTTP ${resp.status}`);
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let assistantText = "";
      setMessages([...nextMessages, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });

        let idx: number;
        while ((idx = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, idx);
          buf = buf.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { buf = ""; break; }
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (delta) {
              assistantText += delta;
              setMessages((prev) => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: "assistant", content: assistantText };
                return copy;
              });
            }
          } catch {
            buf = line + "\n" + buf;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      setIsErrorOpen(true);
      setMessages((prev) => prev.filter((m) => m.content !== ""));
    } finally {
      setStreaming(false);
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    send(input);
  };

  const displayMessages: ChatMsg[] = messages.length
    ? messages
    : [{ role: "assistant", content: t.demo.chatGreeting }];

  return (
    <>
      <TestModeModal open={isErrorOpen} onOpenChange={setIsErrorOpen} />
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-hairline bg-glass-strong backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-hairline px-5 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-glow to-green-glow text-background">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">Verdiq AI Advisor</div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-green-glow">● Live · Powered by AI</div>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="max-h-[480px] space-y-4 overflow-y-auto px-5 py-5">
        {displayMessages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                m.role === "user"
                  ? "bg-foreground/10 text-foreground"
                  : "bg-gradient-to-br from-cyan-glow to-green-glow text-background"
              }`}
            >
              {m.role === "user" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
            </div>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                m.role === "user"
                  ? "bg-cyan-glow/10 text-foreground"
                  : "border border-hairline bg-foreground/[0.03] text-foreground/90"
              }`}
            >
              {m.role === "assistant" ? (
                <div className="prose prose-sm prose-invert max-w-none prose-p:my-1.5 prose-ul:my-1.5 prose-ol:my-1.5 prose-li:my-0 prose-strong:text-foreground">
                  <ReactMarkdown>{m.content || "…"}</ReactMarkdown>
                </div>
              ) : (
                m.content
              )}
            </div>
          </div>
        ))}
        {streaming && messages[messages.length - 1]?.content === "" && (
          <div className="flex gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-glow to-green-glow">
              <Bot className="h-3.5 w-3.5 text-background" />
            </div>
            <div className="flex items-center gap-1 rounded-2xl border border-hairline bg-foreground/[0.03] px-4 py-3">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-glow" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-glow" style={{ animationDelay: "150ms" }} />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-glow" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 border-t border-hairline bg-foreground/[0.02] px-5 py-3">
        {t.demo.chatSamples.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => send(q)}
            disabled={streaming}
            className="rounded-full border border-hairline bg-foreground/5 px-3 py-1 text-xs text-foreground/80 transition hover:border-cyan-glow/40 hover:text-cyan-glow disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="flex gap-2 border-t border-hairline px-5 py-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.demo.chatPlaceholder}
          disabled={streaming}
          className="flex-1 rounded-lg border border-hairline bg-background/40 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none focus:border-cyan-glow/50 focus:ring-2 focus:ring-cyan-glow/20 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={streaming || !input.trim()}
          className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-cyan-glow to-green-glow px-4 text-background transition hover:brightness-110 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
      </div>
    </>
  );
}

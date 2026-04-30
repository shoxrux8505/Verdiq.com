import { useState } from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { Sparkles, Loader2, RotateCcw, ArrowRight, TrendingUp, Leaf, Users, Building2 } from "lucide-react";
import { toast } from "sonner";
import { TestModeModal } from "./TestModeModal";

interface Recommendation {
  readonly title: string;
  readonly detail: string;
  readonly pillar: "E" | "S" | "G";
  readonly impact: "high" | "medium" | "low";
}

interface ScoreResult {
  readonly overall: number;
  readonly environmental: number;
  readonly social: number;
  readonly governance: number;
  readonly tier: string;
  readonly summary: string;
  readonly recommendations: readonly Recommendation[];
  readonly isDemo?: boolean;
}


type Stage = "intro" | "questions" | "loading" | "result";

export function EsgCalculator() {
  const { t, lang } = useI18n();
  const questions = t.demo.calcQs;
  const [stage, setStage] = useState<Stage>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>(() => Array(questions.length).fill(""));
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  const reset = () => {
    setStage("intro");
    setCurrent(0);
    setAnswers(Array(questions.length).fill(""));
    setResult(null);
  };

  const choose = (value: string) => {
    const next = [...answers];
    next[current] = value;
    setAnswers(next);
    if (current < questions.length - 1) {
      setTimeout(() => setCurrent(current + 1), 150);
    }
  };

  const submit = async () => {
    setStage("loading");
    try {
      const payload = {
        mode: "score" as const,
        lang,
        answers: questions.map((q, i) => ({ q: q.q, a: answers[i] })),
      };
      const resp = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.error || `HTTP ${resp.status}`);
      }
      const data = (await resp.json()) as ScoreResult;
      setResult(data);
      setStage("result");
    } catch (e) {
      console.error("AI Calculator failed, falling back to static demo:", e);
      setResult(t.demo.calcStatic);
      setStage("result");
      toast.info(t.demo.calcDemoToast);
    }
  };

  if (stage === "intro") {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-hairline bg-glass-strong p-8 text-center backdrop-blur-xl sm:p-12">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-glow to-green-glow shadow-glow-cyan">
          <Sparkles className="h-6 w-6 text-background" />
        </div>
        <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          <span className="text-gradient">{t.demo.calcTitle}</span>
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">{t.demo.calcSubtitle}</p>
        <button
          type="button"
          onClick={() => setStage("questions")}
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-glow to-green-glow px-6 py-3 text-sm font-semibold text-background shadow-glow-cyan transition hover:brightness-110"
        >
          {t.demo.calcStart}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (stage === "loading") {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-4 rounded-2xl border border-hairline bg-glass-strong p-16 backdrop-blur-xl">
        <Loader2 className="h-10 w-10 animate-spin text-cyan-glow" />
        <p className="text-sm text-muted-foreground">{t.demo.calcLoading}</p>
      </div>
    );
  }

  if (stage === "result" && result) {
    return <ResultView result={result} reset={reset} />;
  }

  // questions stage
  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;
  const allAnswered = answers.every((a) => a !== "");

  return (
    <>
      <TestModeModal open={isErrorOpen} onOpenChange={setIsErrorOpen} />
      <div className="mx-auto max-w-2xl rounded-2xl border border-hairline bg-glass-strong p-6 backdrop-blur-xl sm:p-8">
        <div className="mb-5 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-glow">
          {t.demo.calcQuestion} {current + 1} {t.demo.calcOf} {questions.length}
        </span>
        <div className="h-1 w-32 overflow-hidden rounded-full bg-foreground/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-glow to-green-glow transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <h4 className="text-lg font-semibold leading-snug text-foreground sm:text-xl">{q.q}</h4>
      <div className="mt-5 space-y-2.5">
        {q.opts.map((opt) => {
          const selected = answers[current] === opt.value;
          return (
            <button
              key={opt.label}
              type="button"
              onClick={() => choose(opt.value)}
              className={`group flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${
                selected
                  ? "border-cyan-glow/60 bg-cyan-glow/10 text-foreground"
                  : "border-hairline bg-foreground/[0.02] text-foreground/80 hover:border-cyan-glow/40 hover:bg-foreground/[0.04]"
              }`}
            >
              <span>{opt.label}</span>
              <span
                className={`h-4 w-4 shrink-0 rounded-full border-2 transition ${
                  selected ? "border-cyan-glow bg-cyan-glow" : "border-foreground/30"
                }`}
              />
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
          className="text-xs text-muted-foreground transition hover:text-foreground disabled:opacity-30"
        >
          ← Back
        </button>
        {current < questions.length - 1 ? (
          <button
            type="button"
            onClick={() => answers[current] && setCurrent(current + 1)}
            disabled={!answers[current]}
            className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-foreground/5 px-4 py-2 text-xs font-medium text-foreground transition hover:border-cyan-glow/40 disabled:opacity-30"
          >
            Next <ArrowRight className="h-3.5 w-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={!allAnswered}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-glow to-green-glow px-5 py-2 text-xs font-semibold text-background shadow-glow-cyan transition hover:brightness-110 disabled:opacity-40"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {t.demo.calcSubmit}
          </button>
        )}
      </div>
    </div>
    </>
  );
}

function ResultView({ result, reset }: { result: ScoreResult; reset: () => void }) {
  const { t } = useI18n();
  const tierColor =
    result.tier === "A+" || result.tier === "A"
      ? "from-green-glow to-cyan-glow"
      : result.tier === "B"
        ? "from-cyan-glow to-blue-glow"
        : result.tier === "C"
          ? "from-yellow-400 to-cyan-glow"
          : "from-destructive to-yellow-400";

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      {/* Overall */}
      <div className="relative overflow-hidden rounded-2xl border border-hairline bg-glass-strong p-7 backdrop-blur-xl sm:p-9">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-glow/15 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-green-glow/15 blur-3xl" />
        <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-cyan-glow">{t.demo.calcResultTitle}</div>
            <div className="mt-2 flex items-baseline gap-3">
              <span className={`bg-gradient-to-br ${tierColor} bg-clip-text text-6xl font-semibold tracking-tight text-transparent`}>
                {result.overall}
              </span>
              <span className="text-2xl text-muted-foreground">/ 100</span>
            </div>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">{result.summary}</p>
          </div>
          <div className={`shrink-0 rounded-2xl bg-gradient-to-br ${tierColor} px-6 py-4 text-center text-background shadow-glow-cyan`}>
            <div className="font-mono text-[10px] uppercase tracking-wider opacity-80">Tier</div>
            <div className="text-3xl font-bold">{result.tier}</div>
          </div>
        </div>

        <div className="relative mt-7 grid grid-cols-3 gap-3">
          <PillarCard icon={Leaf} label={t.demo.calcPillarE} score={result.environmental} />
          <PillarCard icon={Users} label={t.demo.calcPillarS} score={result.social} />
          <PillarCard icon={Building2} label={t.demo.calcPillarG} score={result.governance} />
        </div>
      </div>

      {/* Recommendations */}
      <div className="rounded-2xl border border-hairline bg-glass-strong p-6 backdrop-blur-xl sm:p-7">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-cyan-glow" />
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">{t.demo.calcRecs}</h4>
        </div>
        <div className="space-y-3">
          {result.recommendations.map((r, i) => (
            <div key={i} className="rounded-xl border border-hairline bg-foreground/[0.02] p-4 transition hover:border-cyan-glow/30">
              <div className="flex items-start gap-3">
                <span className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold ${
                  r.pillar === "E" ? "bg-green-glow/15 text-green-glow"
                  : r.pillar === "S" ? "bg-cyan-glow/15 text-cyan-glow"
                  : "bg-blue-glow/15 text-blue-glow"
                }`}>{r.pillar}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h5 className="text-sm font-semibold text-foreground">{r.title}</h5>
                    <span className={`rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${
                      r.impact === "high" ? "bg-destructive/15 text-destructive"
                      : r.impact === "medium" ? "bg-yellow-500/15 text-yellow-500"
                      : "bg-foreground/10 text-muted-foreground"
                    }`}>{r.impact}</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{r.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        {result.isDemo && (
          <div className="rounded-full bg-cyan-glow/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-cyan-glow border border-cyan-glow/20">
            {t.demo.calcDemoBadge}
          </div>
        )}
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-xl border border-hairline bg-foreground/5 px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-cyan-glow/40"
        >
          <RotateCcw className="h-4 w-4" />
          {t.demo.calcRestart}
        </button>
      </div>
    </div>
  );
}

function PillarCard({ icon: Icon, label, score }: { icon: React.ComponentType<{ className?: string }>; label: string; score: number }) {
  return (
    <div className="rounded-xl border border-hairline bg-foreground/[0.02] p-3 text-center">
      <Icon className="mx-auto mb-1 h-4 w-4 text-cyan-glow" />
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-foreground">{score}</div>
      <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-foreground/10">
        <div className="h-full rounded-full bg-gradient-to-r from-cyan-glow to-green-glow" style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

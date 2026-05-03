import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/verdiq/Navbar";
import { Footer } from "@/components/verdiq/Footer";
import { GradientBlobs } from "@/components/verdiq/GradientBlobs";
import { Section, SectionDivider } from "@/components/verdiq/Section";
import { Reveal } from "@/components/verdiq/Reveal";
import { EsgCalculator } from "@/components/verdiq/EsgCalculator";
import { AiChatbot } from "@/components/verdiq/AiChatbot";
import { useI18n } from "@/lib/i18n/I18nProvider";
import verdiqVideo from "@/assets/verdiqvd.mp4";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  Play, ExternalLink, Figma, Github, Code2,
  ArrowLeft, Mail, Sparkles, FileBarChart,
} from "lucide-react";

export const Route = createFileRoute("/demo")({
  component: DemoPage,
  head: () => ({
    meta: [
      { title: "Verdiq Demo — See ESG Intelligence in Action" },
      {
        name: "description",
        content:
          "Try the live ESG calculator, talk to the Verdiq AI advisor, and see how AI transforms sustainability evaluation.",
      },
      { property: "og:title", content: "Verdiq Demo — See ESG Intelligence in Action" },
      {
        property: "og:description",
        content: "Live ESG scoring + AI advisor — try the Verdiq prototype.",
      },
    ],
  }),
});

const PROTO_ICONS = [Play, FileBarChart, Figma, Code2, Github];

function DemoPage() {
  const { t } = useI18n();
  const [comingSoon, setComingSoon] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <GradientBlobs />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative px-4 pt-32 pb-12 sm:px-6 sm:pt-36 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Reveal>
              <span className="inline-block rounded-full border border-cyan-glow/30 bg-cyan-glow/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan-glow">
                Verdiq · Demo
              </span>
              <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                <span className="text-gradient">{t.demo.heroTitle}</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
                {t.demo.heroSubtitle}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ESG Calculator — front and center */}
        <Section eyebrow={t.demo.calcEyebrow} title={t.demo.calcTitle} subtitle={t.demo.calcSubtitle}>
          <Reveal>
            <EsgCalculator />
          </Reveal>
        </Section>

        <SectionDivider />

        {/* Video */}
        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-5 text-center text-xs font-semibold uppercase tracking-wider text-foreground/60">
                {t.demo.videoTitle}
              </h2>
              <div className="group relative overflow-hidden rounded-2xl border border-hairline bg-glass-strong p-1.5 shadow-elevated">
                <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-cyan-glow/15 via-transparent to-green-glow/15 blur-2xl" />
                <div className="aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br from-background via-surface to-background">
                  <video
                    src={verdiqVideo}
                    controls
                    className="h-full w-full object-cover"
                    preload="none"
                    playsInline
                  />
                </div>
              </div>
              <p className="mt-3 text-center text-xs text-muted-foreground">{t.demo.videoNote}</p>
            </div>
          </Reveal>
        </section>

        <SectionDivider />

        {/* About */}
        <Section eyebrow="About" title={t.demo.aboutTitle}>
          <Reveal>
            <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t.demo.aboutText}
            </p>
          </Reveal>
        </Section>

        <SectionDivider />

        {/* Prototype links */}
        <Section eyebrow="Access" title={t.demo.protoTitle}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.demo.protoLinks.map((p, i) => {
              const Icon = PROTO_ICONS[i] ?? ExternalLink;
              const isComingSoon = Icon === Figma || Icon === Github;
              return (
                <Reveal key={p.t} delay={i * 80}>
                  {p.href ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block h-full w-full overflow-hidden rounded-2xl border border-hairline bg-glass p-5 text-left backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-glow/30"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-glow/20 to-green-glow/20 text-cyan-glow ring-1 ring-cyan-glow/20">
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground transition group-hover:text-cyan-glow" />
                      </div>
                      <div className="mt-5 text-sm font-semibold text-foreground">{p.t}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{p.d}</div>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => isComingSoon && setComingSoon(p.t)}
                      className="group block h-full w-full overflow-hidden rounded-2xl border border-hairline bg-glass p-5 text-left backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-glow/30"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-glow/20 to-green-glow/20 text-cyan-glow ring-1 ring-cyan-glow/20">
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground transition group-hover:text-cyan-glow" />
                      </div>
                      <div className="mt-5 text-sm font-semibold text-foreground">{p.t}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{p.d}</div>
                    </button>
                  )}
                </Reveal>
              );
            })}
          </div>
        </Section>

        <SectionDivider />

        {/* AI Chatbot — real */}
        <Section eyebrow="AI Advisor" title={t.demo.chatTitle} subtitle={t.demo.chatSubtitle}>
          <Reveal>
            <AiChatbot />
          </Reveal>
        </Section>

        <SectionDivider />

        {/* API */}
        <Section eyebrow="API" title={t.demo.apiTitle} subtitle={t.demo.apiSubtitle}>
          <Reveal>
            <ApiBlock />
          </Reveal>
        </Section>

        {/* Final CTA */}
        <section className="relative px-4 py-24 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-cyan-glow/20 bg-gradient-to-br from-cyan-glow/[0.08] via-blue-glow/[0.05] to-green-glow/[0.08] p-10 text-center backdrop-blur-xl sm:p-14">
              <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-cyan-glow/30 blur-3xl" />
              <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-green-glow/30 blur-3xl" />
              <div className="relative">
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  <span className="text-gradient">{t.demo.finalTitle}</span>
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
                  {t.demo.finalSubtitle}
                </p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-hairline bg-foreground/5 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-md transition hover:border-cyan-glow/40 hover:bg-foreground/10"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    {t.cta.backHome}
                  </Link>
                  <a
                    href="mailto:hello@verdiq.ai"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-glow to-green-glow px-6 py-3 text-sm font-semibold text-background shadow-glow-cyan transition hover:brightness-110"
                  >
                    <Mail className="h-4 w-4" />
                    {t.cta.contactTeam}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />

      <Dialog open={comingSoon !== null} onOpenChange={(o) => !o && setComingSoon(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-glow/20 to-green-glow/20 text-cyan-glow ring-1 ring-cyan-glow/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <DialogTitle className="text-center text-xl">Coming soon</DialogTitle>
            <DialogDescription className="text-center">
              {comingSoon} is on the way. We'll share access shortly · stay tuned.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const ENDPOINTS = [
  {
    method: "POST",
    path: "/api/esg-score",
    desc: "Compute an ESG score from company data.",
    body: `{
  "company": "Acme Corp",
  "sector": "fintech",
  "answers": { ... }
}`,
  },
  {
    method: "GET",
    path: "/api/report",
    desc: "Fetch a generated investor-ready ESG report.",
    body: `{
  "report_id": "rep_2k3jx9",
  "format": "pdf"
}`,
  },
  {
    method: "GET",
    path: "/api/recommendations",
    desc: "AI-generated next-best ESG actions, ranked by impact.",
    body: `{
  "company_id": "cmp_a1b2c3"
}`,
  },
];

function ApiBlock() {
  return (
    <div className="mx-auto max-w-4xl space-y-4">
      {ENDPOINTS.map((e) => (
        <div
          key={e.path}
          className="overflow-hidden rounded-2xl border border-hairline bg-glass-strong backdrop-blur-xl"
        >
          <div className="flex items-center gap-3 border-b border-hairline px-5 py-3">
            <span
              className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold ${
                e.method === "POST"
                  ? "bg-green-glow/15 text-green-glow"
                  : "bg-cyan-glow/15 text-cyan-glow"
              }`}
            >
              {e.method}
            </span>
            <code className="font-mono text-sm text-foreground">{e.path}</code>
          </div>
          <div className="px-5 py-4">
            <p className="mb-3 text-xs text-muted-foreground">{e.desc}</p>
            <pre className="overflow-x-auto rounded-lg border border-hairline bg-background/60 p-4 font-mono text-xs leading-relaxed text-foreground/85">
              <code>{e.body}</code>
            </pre>
          </div>
        </div>
      ))}
    </div>
  );
}

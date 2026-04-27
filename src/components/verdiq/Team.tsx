import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { Github, Linkedin, Globe, Code, Layers, Rocket, Sparkles, Phone, GraduationCap, MapPin } from "lucide-react";
import founderImg from "@/assets/founder-shoxrux.jpg";

const STRENGTH_ICONS = [Code, Sparkles, Rocket, Layers];

export function Team() {
  const { t } = useI18n();

  return (
    <Section id="team" eyebrow="Team" title={t.team.title} subtitle={t.team.subtitle}>
      {/* Founder spotlight */}
      <Reveal>
        <div className="relative mb-14 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-glow/[0.06] via-transparent to-green-glow/[0.06] p-6 backdrop-blur-xl sm:p-8 lg:p-10">
          {/* glow accents */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-cyan-glow/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-green-glow/15 blur-3xl" />

          <div className="relative grid gap-8 sm:grid-cols-[auto,1fr] sm:items-center">
            {/* Photo */}
            <div className="relative mx-auto sm:mx-0">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-cyan-glow to-green-glow opacity-60 blur-md" />
              <img
                src={founderImg}
                alt="Abdullayev Shoxrux Izzatullayevich, Founder of Verdiq"
                loading="lazy"
                className="relative h-44 w-44 rounded-2xl object-cover ring-1 ring-white/15 sm:h-52 sm:w-52"
              />
            </div>

            {/* Info */}
            <div className="min-w-0 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-glow/30 bg-cyan-glow/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan-glow">
                <Sparkles className="h-3 w-3" /> Founder
              </div>
              <h3 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
                Abdullayev Shoxrux Izzatullayevich
              </h3>
              <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                Founder · Product &amp; Tech Lead — Verdiq
              </p>

              <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                <a
                  href="tel:+998939621361"
                  className="group inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-surface/40 px-3.5 py-2.5 text-sm text-foreground/90 transition hover:border-cyan-glow/40 hover:text-cyan-glow"
                >
                  <Phone className="h-4 w-4 text-cyan-glow" />
                  <span className="font-mono">+998 93 962 13 61</span>
                </a>
                <div className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-surface/40 px-3.5 py-2.5 text-sm text-foreground/90">
                  <GraduationCap className="h-4 w-4 text-green-glow" />
                  <span>TSUE — Tashkent State University of Economics</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground sm:justify-start">
                <MapPin className="h-3.5 w-3.5" />
                <span>Tashkent, Uzbekistan</span>
              </div>
            </div>
          </div>    
        </div>
      </Reveal>

      {/* Strengths */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.team.strengths.map((s, i) => {
          const Icon = STRENGTH_ICONS[i] ?? Code;
          return (
            <Reveal key={s.t} delay={i * 80}>
              <div className="glass-card h-full rounded-xl p-5 transition hover:border-cyan-glow/30">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-glow/20 to-green-glow/20 text-cyan-glow">
                  <Icon className="h-4 w-4" />
                </div>
                <h4 className="mt-4 text-sm font-semibold text-foreground">{s.t}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Core team */}
      <div className="mt-16">
        <Reveal>
          <h3 className="text-center text-xl font-semibold text-foreground sm:text-2xl">
            {t.team.coreTitle}
          </h3>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.team.roles.map((r, i) => (
            <Reveal key={r.role} delay={i * 60}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-surface/40 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-glow/25">
                <div className="flex items-center gap-4">
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-glow to-green-glow font-mono text-sm font-semibold text-background">
                    {r.role.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-glow to-green-glow opacity-0 blur-md transition-opacity group-hover:opacity-50" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-foreground">{r.role}</div>
                    <div className="text-xs text-muted-foreground">{r.name}</div>
                  </div>
                </div>

                <div className="mt-5 flex gap-2 border-t border-white/5 pt-4">
                  {[Github, Linkedin, Globe].map((Icon, k) => (
                    <a
                      key={k}
                      href="#"
                      aria-label="link"
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 text-muted-foreground transition hover:border-cyan-glow/40 hover:text-cyan-glow"
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

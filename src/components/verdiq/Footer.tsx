import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative border-t border-white/5 bg-background/60 backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-glow/40 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Logo imgClassName="h-14 sm:h-auto sm:w-40" />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            {t.footer.mission}
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground/60">
            {t.footer.links}
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="text-muted-foreground hover:text-foreground">{t.nav.home}</Link></li>
            <li><Link to="/demo" className="text-muted-foreground hover:text-foreground">{t.nav.demo}</Link></li>
            <li><a href="/#solution" className="text-muted-foreground hover:text-foreground">{t.nav.solution}</a></li>
            <li><a href="/#team" className="text-muted-foreground hover:text-foreground">{t.nav.team}</a></li>
            <li><a href="/#roadmap" className="text-muted-foreground hover:text-foreground">{t.nav.roadmap}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground/60">
            {t.footer.contact}
          </h4>
          <a
            href="mailto:t3859061@gmail.com"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <Mail className="h-4 w-4" />
            t3859061@gmail.com
          </a>

          <h4 className="mt-6 mb-4 text-xs font-semibold uppercase tracking-wider text-foreground/60">
            {t.footer.social}
          </h4>
          <div className="flex gap-3">
            {[Github, Linkedin, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground transition hover:border-cyan-glow/40 hover:text-cyan-glow"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Verdiq. {t.footer.rights}</span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-foreground/40">
            Intelligent ESG Analytics for the Future
          </span>
        </div>
      </div>
    </footer>
  );
}

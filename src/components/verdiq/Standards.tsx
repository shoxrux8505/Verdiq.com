import { Reveal } from "./Reveal";
import { useI18n } from "@/lib/i18n/I18nProvider";

import ifrsLogo from "@/assets/ifrs-logo.svg";
import griLogo from "@/assets/GRI_Master_Logo-solo.svg";
import sasbLogo from "@/assets/SASB_Logo_RGB-Reg-tm.jpg";
import tcfdLogo from "@/assets/TCFD.png";

const STANDARDS = [
  { name: "IFRS", logo: ifrsLogo, link: "https://www.ifrs.org/" },
  { name: "GRI", logo: griLogo, link: "https://www.globalreporting.org/" },
  { name: "SASB", logo: sasbLogo, link: "https://sasb.ifrs.org/archive/governance/" },
  { name: "TCFD", logo: tcfdLogo, link: "https://www.fsb-tcfd.org/" },
];

export function Standards() {
  const { t } = useI18n();

  // Double the standards for seamless loop
  const marqueeItems = [...STANDARDS, ...STANDARDS, ...STANDARDS, ...STANDARDS, ...STANDARDS, ...STANDARDS];

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            <span className="text-gradient">{t.standards.title}</span>
          </h2>
        </Reveal>
      </div>

      <Reveal>
        <div className="relative flex overflow-hidden py-14 bg-surface/30 border-y border-white/5 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-40 before:bg-gradient-to-r before:from-background before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-40 after:bg-gradient-to-l after:from-background after:to-transparent">
          <div className="animate-marquee flex items-center gap-24 md:gap-40">
            {marqueeItems.map((s, i) => (
              <a
                key={`${s.name}-${i}`}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 items-center justify-center transition-all duration-300 cursor-pointer"
              >
                <img
                  src={s.logo}
                  alt={s.name}
                  className={`h-12 w-auto object-contain opacity-60 transition-all hover:opacity-100 hover:scale-115 md:h-16 dark:brightness-0 dark:invert ${
                    s.name === "SASB" ? "rounded-full" : ""
                  }`}
                />
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

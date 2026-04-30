import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Reveal } from "./Reveal";
import { OrbitVector, DotsVector } from "./SectionVectors";
import showcase1 from "@/assets/showcase-1.webp";
import showcase2 from "@/assets/showcase-2.webp";

const slides = [
  { src: showcase1, alt: "Verdiq product overview" },
  { src: showcase2, alt: "From complexity to clarity" },
];

export function Showcase() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <OrbitVector className="-right-40 top-0 hidden opacity-60 lg:block" />
      <DotsVector className="bottom-10 left-6 hidden opacity-80 lg:block" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <Carousel opts={{ loop: true }} className="w-full">
            <CarouselContent>
              {slides.map((s, i) => (
                <CarouselItem key={i}>
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                    <img
                      src={s.src}
                      alt={s.alt}
                      className="h-auto w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 sm:-left-12" />
            <CarouselNext className="right-2 sm:-right-12" />
          </Carousel>
        </Reveal>

        <div className="mt-10 flex justify-center">
          <Link
            to="/demo"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-glow to-green-glow px-7 py-3.5 text-sm font-semibold text-background shadow-glow-cyan transition hover:brightness-110"
          >
            View Demo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

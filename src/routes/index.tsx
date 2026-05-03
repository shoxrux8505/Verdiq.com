import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/verdiq/Navbar";
import { Footer } from "@/components/verdiq/Footer";
import { GradientBlobs } from "@/components/verdiq/GradientBlobs";
import { Hero } from "@/components/verdiq/Hero";
import { SectionDivider } from "@/components/verdiq/Section";

const ProblemSolution = lazy(() => import("@/components/verdiq/ProblemSolution").then((m) => ({ default: m.ProblemSolution })));
const Product = lazy(() => import("@/components/verdiq/Product").then((m) => ({ default: m.Product })));
const Team = lazy(() => import("@/components/verdiq/Team").then((m) => ({ default: m.Team })));
const Stack = lazy(() => import("@/components/verdiq/Stack").then((m) => ({ default: m.Stack })));
const Roadmap = lazy(() => import("@/components/verdiq/Roadmap").then((m) => ({ default: m.Roadmap })));
const Plan = lazy(() => import("@/components/verdiq/Plan").then((m) => ({ default: m.Plan })));
const Value = lazy(() => import("@/components/verdiq/Value").then((m) => ({ default: m.Value })));
const Contact = lazy(() => import("@/components/verdiq/Contact").then((m) => ({ default: m.Contact })));
const FinalCTA = lazy(() => import("@/components/verdiq/FinalCTA").then((m) => ({ default: m.FinalCTA })));
const Showcase = lazy(() => import("@/components/verdiq/Showcase").then((m) => ({ default: m.Showcase })));
const Standards = lazy(() => import("@/components/verdiq/Standards").then((m) => ({ default: m.Standards })));
const FloatingChatbot = lazy(() => import("@/components/verdiq/FloatingChatbot").then((m) => ({ default: m.FloatingChatbot })));

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Verdiq — AI-Powered ESG Intelligence Platform" },
      {
        name: "description",
        content:
          "Verdiq is the AI-native ESG platform helping startups and investors measure ESG readiness, detect risks, and generate actionable sustainability insights.",
      },
      { property: "og:title", content: "Verdiq — AI-Powered ESG Intelligence Platform" },
      {
        property: "og:description",
        content:
          "Measure ESG readiness, detect risks, and generate actionable sustainability insights with AI.",
      },
    ],
  }),
});

function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <GradientBlobs />
      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <Suspense fallback={<div className="h-96 w-full animate-pulse bg-background/50" />}>
          <ProblemSolution />
          <SectionDivider />
          <Product />
          <SectionDivider />
          <Team />
          <SectionDivider />
          <Stack />
          <SectionDivider />
          <Standards />
          <SectionDivider />
          <Roadmap />
          <SectionDivider />
          <Plan />
          <SectionDivider />
          <Value />
          <SectionDivider />
          <Contact />
          <FinalCTA />
          <Showcase />
        </Suspense>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <FloatingChatbot />
      </Suspense>
    </div>
  );
}

import { Outlet, createRootRoute, HeadContent, Scripts, Link } from "@tanstack/react-router";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import { ThemeProvider, useTheme } from "@/lib/theme/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Verdiq — Intelligent ESG Analytics for the Future" },
      {
        name: "description",
        content:
          "Verdiq is the AI-native ESG intelligence platform. Measure ESG readiness, detect risks, and generate actionable sustainability insights for founders and investors.",
      },
      { name: "author", content: "Verdiq" },
      { property: "og:title", content: "Verdiq — Intelligent ESG Analytics for the Future" },
      {
        property: "og:description",
        content: "AI-powered ESG intelligence for smarter investment decisions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Verdiq — Intelligent ESG Analytics for the Future" },
      {
        name: "twitter:description",
        content: "AI-powered ESG intelligence for smarter investment decisions.",
      },
      { name: "description", content: "A real-time inventory management app for businesses to track stock, orders, and suppliers." },
      { property: "og:description", content: "A real-time inventory management app for businesses to track stock, orders, and suppliers." },
      { name: "twitter:description", content: "A real-time inventory management app for businesses to track stock, orders, and suppliers." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9d9acf66-4038-4122-8a6e-631b9ec7e86f/id-preview-124f1188--02fa2373-1b3e-44b8-8ed0-7f1f079d1e16.lovable.app-1776867624472.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9d9acf66-4038-4122-8a6e-631b9ec7e86f/id-preview-124f1188--02fa2373-1b3e-44b8-8ed0-7f1f079d1e16.lovable.app-1776867624472.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }} suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('verdiq-theme');if(t!=='light'&&t!=='dark')t='dark';document.documentElement.classList.remove('light','dark');document.documentElement.classList.add(t);document.documentElement.style.colorScheme=t;}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <Outlet />
        <ThemedToaster />
      </I18nProvider>
    </ThemeProvider>
  );
}

function ThemedToaster() {
  const { theme } = useTheme();
  return <Toaster position="bottom-right" richColors theme={theme} />;
}

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
      <div>
        <p className="text-sm font-medium text-cyan-glow">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you were looking for doesn't exist or has moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-glow to-green-glow px-5 py-2.5 text-sm font-semibold text-background"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

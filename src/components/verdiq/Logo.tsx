import { Link } from "@tanstack/react-router";
import logoUrl from "@/assets/verdiq-logo.webp";

export function Logo({ className = "", imgClassName = "h-16 sm:h-20" }: { className?: string, imgClassName?: string }) {
  return (
    <Link to="/" className={`group flex items-center ${className}`} aria-label="Verdiq home">
      <img
        src={logoUrl}
        alt="Verdiq"
        className={`${imgClassName} w-auto transition-opacity group-hover:opacity-90`}
      />
    </Link>
  );
}

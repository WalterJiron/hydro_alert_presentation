"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground relative overflow-hidden px-6 py-12">
      {/* Ambient background glows */}
      <div className="absolute -top-40 -left-40 w-140 h-140 bg-danger/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-140 h-140 bg-danger/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-95 h-95 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl w-full gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="relative select-none flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center text-[160px] sm:text-[200px] font-black text-danger/8 blur-2xl pointer-events-none">
            ⚠
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-[160px] sm:text-[200px] font-black text-danger/15 blur-sm pointer-events-none">
            ⚠
          </div>
          <span className="relative text-[120px] sm:text-[160px] leading-none bg-linear-to-b from-danger/80 via-danger/50 to-danger/10 bg-clip-text text-transparent">
            ⚠
          </span>
        </div>

        <div className="space-y-4 -mt-4">
          <h1 className="text-2xl sm:text-4xl font-semibold text-foreground tracking-tight">
            Ocurrió un error inesperado
          </h1>
          <p className="text-base text-muted leading-relaxed max-w-md mx-auto">
            Se produjo un inconveniente al cargar HydroAlert.
          </p>
          {error?.message && (
            <div className="mt-2 px-4 py-3 rounded-xl bg-surface-secondary border border-border/60 text-xs font-mono text-muted max-w-sm mx-auto text-left truncate">
              {error.message}
            </div>
          )}
        </div>

        <div className="w-24 h-px bg-linear-to-r from-transparent via-danger/50 to-transparent" />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm">
          <button
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-accent text-accent-foreground font-semibold text-sm shadow-lg hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
            onClick={() => reset()}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            Reintentar
          </button>
          <Link
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-surface-secondary text-foreground font-semibold text-sm border border-border hover:bg-surface-tertiary hover:border-accent/30 active:scale-[0.98] transition-all duration-150"
            href={"/"}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            Ir al home
          </Link>
        </div>
      </div>
    </div>
  );
}

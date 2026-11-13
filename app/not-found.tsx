"use client";

import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground relative overflow-hidden px-6 py-12">
      {/* Ambient background glows */}
      <div className="absolute -top-40 -left-40 w-150 h-150 bg-accent/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-150 h-150 bg-accent/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-100 h-100 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl w-full gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="relative select-none leading-none">
          <span className="absolute inset-0 flex items-center justify-center text-[180px] sm:text-[220px] md:text-[280px] font-black text-accent/8 blur-2xl pointer-events-none">
            404
          </span>
          <span className="absolute inset-0 flex items-center justify-center text-[180px] sm:text-[220px] md:text-[280px] font-black text-accent/15 blur-sm pointer-events-none">
            404
          </span>
          <h1 className="relative text-[180px] sm:text-[220px] md:text-[280px] font-black tracking-tighter bg-linear-to-b from-foreground/90 via-foreground/50 to-foreground/10 bg-clip-text text-transparent">
            404
          </h1>
        </div>

        <div className="space-y-4 -mt-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Página no encontrada
          </h2>
          <p className="text-base text-muted leading-relaxed max-w-md mx-auto">
            La dirección URL a la que intentas acceder no existe en el sistema
            HydroAlert, ha sido modificada o no está disponible temporalmente.
          </p>
        </div>

        {/* Divider accent line */}
        <div className="w-24 h-px bg-linear-to-r from-transparent via-accent/60 to-transparent" />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm">
          <button
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-xl bg-surface-secondary text-foreground font-semibold text-sm border border-border hover:bg-surface-tertiary hover:border-accent/30 active:scale-[0.98] transition-all duration-150"
            onClick={() => window.history.back()}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            Volver atrás
          </button>
        </div>
      </div>
    </div>
  );
}

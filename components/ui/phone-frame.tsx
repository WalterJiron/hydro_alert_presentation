import * as React from "react";
import clsx from "clsx";

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
  glow?: "cyan" | "orange" | "none";
  theme?: "dark" | "light";
  /** Las capturas reales ya traen su propia barra de estado e indicador. */
  showStatusBar?: boolean;
}

export function PhoneFrame({
  children,
  className,
  label,
  glow = "cyan",
  theme = "light",
  showStatusBar = true,
}: PhoneFrameProps) {
  const isLight = theme === "light";

  return (
    <div className={clsx("relative", className)}>
      {glow !== "none" ? (
        <div
          aria-hidden="true"
          className={clsx(
            "absolute -inset-10 -z-10 rounded-full blur-3xl",
            glow === "cyan" ? "bg-cyan-400/15" : "bg-orange-500/15",
          )}
        />
      ) : null}

      <div className="relative rounded-2xl border border-white/15 bg-[#04090f] p-3.5 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.12)]">
        <div className="absolute -left-0.5 top-24 h-12 w-0.5 rounded-full bg-white/15" />
        <div className="absolute -left-0.5 top-40 h-16 w-0.5 rounded-full bg-white/10" />
        <div className="absolute -right-0.5 top-32 h-20 w-0.5 rounded-full bg-white/15" />

        <div
          className={clsx(
            "relative flex aspect-9/20 w-68 flex-col overflow-hidden rounded-2xl sm:w-72",
            isLight ? "bg-[#f7f8fa] text-[#151a21]" : "bg-[#04101b] text-white",
          )}
        >
          <div className="pointer-events-none absolute left-1/2 top-2 z-40 h-6 w-22 -translate-x-1/2 rounded-full bg-black" />

          {showStatusBar ? (
            <div
              className={clsx(
                "z-30 flex items-center justify-between px-5 pb-1 pt-2 font-serif text-[9px] font-semibold tracking-wide",
                isLight ? "text-[#202631]" : "text-white/90",
              )}
            >
              <span>10:00</span>
              <div className="flex items-center gap-1.5">
                <svg
                  aria-hidden
                  fill="none"
                  height="9"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.1"
                  viewBox="0 0 12 12"
                  width="9"
                >
                  <circle cx="6" cy="6.5" r="4" />
                  <path d="M6 4.5v2l1.4 1M3.2 2.2 2 1M8.8 2.2 10 1" />
                </svg>
                <svg
                  aria-hidden
                  fill="none"
                  height="9"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.1"
                  viewBox="0 0 12 12"
                  width="9"
                >
                  <path d="M9.4 5.4c0 2.9 1 3.4 1 3.4H3.1s.7-.3 1-1.2" />
                  <path d="M3.4 4.8A3 3 0 0 1 8.7 3M5.7 10.2a1 1 0 0 0 1.6 0" />
                  <path d="m2.2 2.2 7.6 7.6" />
                </svg>
                <svg
                  aria-hidden
                  fill="none"
                  height="9"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  viewBox="0 0 12 9"
                  width="11"
                >
                  <path d="M1 3.2a7 7 0 0 1 10 0M3 5.5a4 4 0 0 1 6 0" />
                  <circle
                    cx="6"
                    cy="8"
                    fill="currentColor"
                    r=".8"
                    stroke="none"
                  />
                </svg>
                <svg
                  aria-hidden
                  fill="currentColor"
                  height="9"
                  viewBox="0 0 12 9"
                  width="11"
                >
                  <rect height="3" opacity=".5" rx=".5" width="2" x="0" y="6" />
                  <rect height="5" opacity=".7" rx=".5" width="2" x="3" y="4" />
                  <rect height="7" opacity=".9" rx=".5" width="2" x="6" y="2" />
                  <rect height="9" rx=".5" width="2" x="9" y="0" />
                </svg>
                <svg aria-hidden height="10" viewBox="0 0 21 10" width="21">
                  <rect
                    fill="#e5c547"
                    height="9"
                    rx="2"
                    width="17"
                    x=".5"
                    y=".5"
                  />
                  <path
                    d="M18.6 3.2v3.6"
                    stroke="#e5c547"
                    strokeLinecap="round"
                    strokeWidth="1.6"
                  />
                  <text
                    fill="#3f3400"
                    fontFamily="Georgia, serif"
                    fontSize="5.6"
                    fontWeight="700"
                    textAnchor="middle"
                    x="9"
                    y="6.9"
                  >
                    100
                  </text>
                </svg>
              </div>
            </div>
          ) : null}

          <div className="relative z-10 flex min-h-0 flex-1 flex-col">
            {children}
          </div>

          {showStatusBar ? (
            <div
              className={clsx(
                "pointer-events-none absolute bottom-1.5 left-1/2 z-40 h-0.75 w-24 -translate-x-1/2 rounded-full",
                isLight ? "bg-black/20" : "bg-white/35",
              )}
            />
          ) : null}
        </div>
      </div>

      {label ? (
        <p className="mt-4 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
          {label}
        </p>
      ) : null}
    </div>
  );
}

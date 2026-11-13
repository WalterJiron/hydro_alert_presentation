"use client";

import * as React from "react";
import { animate } from "animejs";

import { cn } from "@/lib/cn";

interface AnimatedCounterProps {
  className?: string;
  decimals?: number;
  delay?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  value: number;
}

export function AnimatedCounter({
  className,
  decimals = 0,
  delay = 100,
  duration = 1400,
  prefix = "",
  suffix = "",
  value,
}: AnimatedCounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = React.useState<string>(
    `${prefix}${decimals > 0 ? (0).toFixed(decimals) : 0}${suffix}`,
  );

  React.useEffect(() => {
    const node = ref.current;

    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayed(
        `${prefix}${decimals > 0 ? value.toFixed(decimals) : value}${suffix}`,
      );

      return;
    }

    const state = { current: 0 };
    let animation: ReturnType<typeof animate> | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry?.isIntersecting) return;

        animation = animate(state, {
          current: value,
          delay,
          duration,
          ease: "outExpo",
          onUpdate: () => {
            const formatted =
              decimals > 0
                ? state.current.toFixed(decimals)
                : Math.round(state.current).toString();

            setDisplayed(`${prefix}${formatted}${suffix}`);
          },
        });

        observer.disconnect();
      },
      { threshold: 0.15 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      animation?.pause();
    };
  }, [decimals, delay, duration, prefix, suffix, value]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {displayed}
    </span>
  );
}

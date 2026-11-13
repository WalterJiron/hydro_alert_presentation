"use client";

import * as React from "react";
import { animate } from "animejs";
import clsx from "clsx";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  duration?: number;
  once?: boolean;
}

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 26,
  duration = 850,
  once = true,
  ...props
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const node = ref.current;

    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    node.style.opacity = "0";
    node.style.transform = `translate3d(0, ${distance}px, 0)`;

    let animation: ReturnType<typeof animate> | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry?.isIntersecting) return;

        animation = animate(node, {
          opacity: [0, 1],
          translateY: [distance, 0],
          duration,
          delay,
          ease: "outExpo",
        });

        if (once) observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      animation?.pause();
      node.style.opacity = "";
      node.style.transform = "";
    };
  }, [delay, distance, duration, once]);

  return (
    <div ref={ref} className={clsx(className)} {...props}>
      {children}
    </div>
  );
}

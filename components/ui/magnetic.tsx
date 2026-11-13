"use client";

import * as React from "react";
import { animate } from "animejs";

import { cn } from "@/lib/cn";

interface MagneticProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  strength?: number;
}

/**
 * Envoltorio magnético que atrae suavemente el elemento hacia el cursor
 * con física elástica usando Anime.js.
 */
export function Magnetic({
  children,
  className,
  strength = 0.28,
  ...props
}: MagneticProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const node = ref.current;

    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let anim: ReturnType<typeof animate> | null = null;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (event.clientX - centerX) * strength;
      const deltaY = (event.clientY - centerY) * strength;

      anim?.pause();
      anim = animate(node, {
        translateX: deltaX,
        translateY: deltaY,
        duration: 350,
        ease: "outQuad",
      });
    };

    const handleMouseLeave = () => {
      anim?.pause();
      anim = animate(node, {
        translateX: 0,
        translateY: 0,
        duration: 800,
        ease: "outElastic(1, .5)",
      });
    };

    node.addEventListener("mousemove", handleMouseMove);
    node.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      node.removeEventListener("mousemove", handleMouseMove);
      node.removeEventListener("mouseleave", handleMouseLeave);
      anim?.pause();
    };
  }, [strength]);

  return (
    <div ref={ref} className={cn("inline-block", className)} {...props}>
      {children}
    </div>
  );
}

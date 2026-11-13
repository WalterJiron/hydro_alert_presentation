"use client";

import * as React from "react";
import Image from "next/image";
import clsx from "clsx";

/* ------------------------------------------------------------------ */
/*  HoloCard — API compatible con @heroui-pro/react                    */
/*  Tilt 3D con springs, glare holográfico y capas de parallax.        */
/* ------------------------------------------------------------------ */

export interface HoloCardSpring {
  damping?: number;
  mass?: number;
  stiffness?: number;
}

export interface HoloCardProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /** CSS background para la superficie de la tarjeta. */
  gradient?: string;
  /** Textura para las capas Pattern y Shine. */
  patternSrc?: string;
  /** background-size de las texturas. */
  patternSize?: string;
  /** La tarjeta permanece plana hasta que el mouse entra. */
  activateOnHover?: boolean;
  /** Permite que punteros táctiles inclinen la tarjeta. */
  tiltOnTouch?: boolean;
  isInteractive?: boolean;
  isDisabled?: boolean;
  maxTilt?: number;
  hoverScale?: number;
  shineOpacity?: number;
  parallaxStrength?: number;
  spring?: HoloCardSpring;
  settleSpring?: HoloCardSpring;
  children?: React.ReactNode;
}

type SpringState = {
  rx: number;
  ry: number;
  vx: number;
  vy: number;
  scale: number;
};

const DEFAULT_SPRING: Required<HoloCardSpring> = {
  damping: 28,
  mass: 1,
  stiffness: 180,
};

const DEFAULT_SETTLE_SPRING: Required<HoloCardSpring> = {
  damping: 22,
  mass: 1,
  stiffness: 120,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function HoloCardRoot({
  gradient,
  patternSrc,
  patternSize,
  activateOnHover = false,
  tiltOnTouch = true,
  isInteractive = true,
  isDisabled = false,
  maxTilt = 14.29,
  hoverScale = 1.05,
  shineOpacity = 1,
  parallaxStrength = 10,
  spring,
  settleSpring,
  children,
  className,
  style,
  ...props
}: HoloCardProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const frameRef = React.useRef<number | null>(null);
  const hoveredRef = React.useRef(false);
  const stateRef = React.useRef<SpringState>({
    rx: 0,
    ry: 0,
    vx: 0,
    vy: 0,
    scale: 1,
  });
  const targetRef = React.useRef({ rx: 0, ry: 0, scale: 1 });
  const lastTimeRef = React.useRef(0);
  const reducedMotionRef = React.useRef(false);

  const enabled = isInteractive && !isDisabled;
  const [active, setActive] = React.useState(enabled && !activateOnHover);

  const springConfig = React.useMemo(
    () => ({ ...DEFAULT_SPRING, ...spring }),
    [spring],
  );
  const settleConfig = React.useMemo(
    () => ({ ...DEFAULT_SETTLE_SPRING, ...settleSpring }),
    [settleSpring],
  );

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    reducedMotionRef.current = media.matches;
    const onChange = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches;
    };

    media.addEventListener("change", onChange);

    return () => media.removeEventListener("change", onChange);
  }, []);

  const applyVariables = React.useCallback(
    (variables: Record<string, string>) => {
      const node = rootRef.current;

      if (!node) return;
      for (const [key, value] of Object.entries(variables)) {
        node.style.setProperty(key, value);
      }
    },
    [],
  );

  const runFrame = React.useCallback(
    (time: number) => {
      const node = rootRef.current;

      if (!node) {
        frameRef.current = null;

        return;
      }

      const state = stateRef.current;
      const target = targetRef.current;
      const dt = Math.min(
        Math.max((time - (lastTimeRef.current || time)) / 1000, 0.001),
        1 / 30,
      );

      lastTimeRef.current = time;

      const config = hoveredRef.current ? springConfig : settleConfig;
      const stiffness = config.stiffness;
      const damping = config.damping;
      const mass = config.mass;

      const ax =
        (-stiffness * (state.rx - target.rx) - damping * state.vx) / mass;
      const ay =
        (-stiffness * (state.ry - target.ry) - damping * state.vy) / mass;

      state.vx += ax * dt;
      state.vy += ay * dt;
      state.rx += state.vx * dt;
      state.ry += state.vy * dt;
      state.scale += (target.scale - state.scale) * Math.min(dt * 12, 1);

      const parallaxX =
        (state.ry / Math.max(maxTilt, 0.001)) * parallaxStrength;
      const parallaxY =
        (-state.rx / Math.max(maxTilt, 0.001)) * parallaxStrength;

      applyVariables({
        "--holo-card-rx": `${state.rx.toFixed(3)}deg`,
        "--holo-card-ry": `${state.ry.toFixed(3)}deg`,
        "--holo-card-scale": state.scale.toFixed(4),
        "--holo-card-parallax-x": parallaxX.toFixed(3),
        "--holo-card-parallax-y": parallaxY.toFixed(3),
        "--holo-card-glow": hoveredRef.current ? "1" : "0",
      });

      const settled =
        !hoveredRef.current &&
        Math.abs(state.rx) < 0.03 &&
        Math.abs(state.ry) < 0.03 &&
        Math.abs(state.vx) < 0.03 &&
        Math.abs(state.vy) < 0.03 &&
        Math.abs(state.scale - 1) < 0.001;

      if (settled) {
        state.rx = 0;
        state.ry = 0;
        state.vx = 0;
        state.vy = 0;
        state.scale = 1;
        lastTimeRef.current = 0;
        frameRef.current = null;
        applyVariables({
          "--holo-card-rx": "0deg",
          "--holo-card-ry": "0deg",
          "--holo-card-scale": "1",
          "--holo-card-parallax-x": "0",
          "--holo-card-parallax-y": "0",
        });
        if (activateOnHover) setActive(false);

        return;
      }

      frameRef.current = requestAnimationFrame(runFrame);
    },
    [
      activateOnHover,
      applyVariables,
      maxTilt,
      parallaxStrength,
      settleConfig,
      springConfig,
    ],
  );

  const startLoop = React.useCallback(() => {
    if (frameRef.current !== null || reducedMotionRef.current) return;
    lastTimeRef.current = 0;
    frameRef.current = requestAnimationFrame(runFrame);
  }, [runFrame]);

  React.useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled || reducedMotionRef.current) return;
    if (activateOnHover && event.pointerType !== "mouse") return;

    hoveredRef.current = true;
    targetRef.current.scale = hoverScale;
    setActive(true);
    startLoop();
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled || reducedMotionRef.current) return;
    if (!tiltOnTouch && event.pointerType !== "mouse") return;
    if (activateOnHover && event.pointerType !== "mouse") return;

    const node = rootRef.current;

    if (!node) return;

    if (!hoveredRef.current) {
      hoveredRef.current = true;
      targetRef.current.scale = hoverScale;
      setActive(true);
    }

    const rect = node.getBoundingClientRect();
    const x = clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100);
    const y = clamp(((event.clientY - rect.top) / rect.height) * 100, 0, 100);
    const nx = (x - 50) / 50;
    const ny = (y - 50) / 50;

    targetRef.current.ry = nx * maxTilt;
    targetRef.current.rx = -ny * maxTilt;

    applyVariables({
      "--holo-card-pointer-x": x.toFixed(2),
      "--holo-card-pointer-y": y.toFixed(2),
    });

    startLoop();
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" && !tiltOnTouch) return;

    hoveredRef.current = false;
    targetRef.current.rx = 0;
    targetRef.current.ry = 0;
    targetRef.current.scale = 1;
    startLoop();
  };

  const handlePointerUp = () => {
    if (!tiltOnTouch) return;
    hoveredRef.current = false;
    targetRef.current.rx = 0;
    targetRef.current.ry = 0;
    targetRef.current.scale = 1;
    startLoop();
  };

  const rootStyle = {
    ...style,
    ...(gradient ? { "--holo-card-gradient": gradient } : null),
    ...(patternSrc ? { "--holo-card-pattern": `url("${patternSrc}")` } : null),
    ...(patternSize ? { "--holo-card-pattern-size": patternSize } : null),
    "--holo-card-shine-opacity": shineOpacity,
  } as React.CSSProperties;

  return (
    <div
      ref={rootRef}
      className={clsx("holo-card", className)}
      data-active={active ? "true" : "false"}
      data-disabled={isDisabled ? "true" : "false"}
      data-texture={patternSrc ? "custom" : "default"}
      data-tilt-on-touch={tiltOnTouch ? "true" : "false"}
      style={{
        ...rootStyle,
        touchAction: tiltOnTouch ? "pan-y" : "auto",
      }}
      onPointerDown={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      {...props}
    >
      {children}
    </div>
  );
}

function HoloCardRotator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("holo-card__rotator", className)} {...props} />;
}

function HoloCardFrame({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("holo-card__frame", className)} {...props} />;
}

function HoloCardSurface({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("holo-card__surface", className)} {...props} />;
}

interface HoloCardImageProps extends Omit<
  React.ComponentProps<typeof Image>,
  "alt"
> {
  alt: string;
}

function HoloCardImage({ className, alt, ...props }: HoloCardImageProps) {
  return (
    <Image
      fill
      alt={alt}
      className={clsx("holo-card__image", className)}
      draggable={false}
      sizes="(max-width: 768px) 80vw, 420px"
      {...props}
    />
  );
}

function HoloCardInset({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("holo-card__inset", className)} {...props} />;
}

function HoloCardPattern({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("holo-card__pattern", className)} {...props} />;
}

interface HoloCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  parallax?: boolean;
}

function HoloCardContent({
  className,
  parallax = true,
  style,
  ...props
}: HoloCardContentProps) {
  return (
    <div
      className={clsx("holo-card__content", className)}
      style={parallax ? style : { transform: "none", ...style }}
      {...props}
    />
  );
}

function HoloCardShine({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx("holo-card__shine", className)} {...props}>
      {children ?? <HoloCardShinePattern />}
    </div>
  );
}

function HoloCardShinePattern({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx("holo-card__shine-pattern", className)} {...props} />
  );
}

export const HoloCard = Object.assign(HoloCardRoot, {
  Rotator: HoloCardRotator,
  Frame: HoloCardFrame,
  Surface: HoloCardSurface,
  Image: HoloCardImage,
  Inset: HoloCardInset,
  Pattern: HoloCardPattern,
  Content: HoloCardContent,
  Shine: HoloCardShine,
  ShinePattern: HoloCardShinePattern,
});

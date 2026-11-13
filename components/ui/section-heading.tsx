import * as React from "react";
import clsx from "clsx";

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      <span className="eyebrow">
        <span className="h-px w-8 bg-cyan-400/70" />
        {eyebrow}
      </span>
      <h2 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p
          className={clsx(
            "max-w-2xl text-sm leading-relaxed text-muted sm:text-base",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

"use client";

import * as React from "react";
import Image from "next/image";
import NextLink from "next/link";
import clsx from "clsx";

import { CloseIcon, DownloadIcon, MenuIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState<string>("");
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;

      setScrolled(top > 24);
      setProgress(height > 0 ? Math.min(top / height, 1) : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const sections = siteConfig.navItems
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => Boolean(section));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActive(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.05, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  React.useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setIsMenuOpen(false);
    };

    desktop.addEventListener("change", closeOnDesktop);

    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/8 bg-[#030812]/85 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <nav
        aria-label="Navegación principal"
        className="container-hydro flex h-[72px] items-center justify-between gap-6"
      >
        <NextLink
          aria-label="HydroAlert — inicio"
          className="group flex shrink-0 items-center gap-2.5"
          href="#top"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="relative grid h-10 w-10 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-400/8">
            <Image
              priority
              alt="Logo de HydroAlert"
              className="h-7 w-7 object-contain"
              height={30}
              src="/images/logo_mark.png"
              width={30}
            />
            <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[17px] font-semibold tracking-tight text-white">
              Hydro<span className="text-orange-400">Alert</span>
            </span>
            <span className="mt-1 text-[7px] font-medium uppercase tracking-[0.28em] text-cyan-300/60">
              Early warning
            </span>
          </span>
        </NextLink>

        <ul className="hidden items-center gap-1 lg:flex">
          {siteConfig.navItems.map((item) => (
            <li key={item.href}>
              <a
                aria-current={active === item.href ? "true" : undefined}
                className={clsx(
                  "relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors",
                  active === item.href
                    ? "text-cyan-300"
                    : "text-white/60 hover:text-white",
                )}
                href={item.href}
              >
                {active === item.href ? (
                  <span className="absolute inset-0 rounded-full border border-cyan-300/15 bg-cyan-400/8" />
                ) : null}
                <span className="relative">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 sm:flex">
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-white/35 xl:inline">
            APK · {siteConfig.apk.size}
          </span>
          <a
            className="group inline-flex h-10 items-center gap-2 rounded-full bg-cyan-400 px-5 text-[13px] font-semibold text-[#02141b] shadow-[0_0_28px_-6px_rgba(34,211,238,0.65)] transition-all hover:bg-cyan-300 hover:shadow-[0_0_34px_-4px_rgba(34,211,238,0.8)]"
            download={siteConfig.apk.filename}
            href={siteConfig.apk.href}
          >
            <DownloadIcon
              className="transition-transform group-hover:translate-y-0.5"
              size={15}
            />
            Descargar APK
          </a>
        </div>

        <button
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/80 lg:hidden"
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
        </button>
      </nav>

      <div
        aria-hidden="true"
        className="h-px origin-left bg-gradient-to-r from-cyan-400 via-cyan-300 to-orange-400 transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
      />

      {isMenuOpen ? (
        <div className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto overscroll-contain border-t border-white/8 bg-[#030812]/98 backdrop-blur-2xl lg:hidden">
          <div className="container-hydro flex min-h-full flex-col gap-1 py-5">
            {siteConfig.navItems.map((item, index) => (
              <a
                key={item.href}
                className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-white/75 transition-colors hover:bg-white/5 hover:text-white"
                href={item.href}
                style={{ transitionDelay: `${index * 15}ms` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
                <span className="font-mono text-[10px] text-white/25">
                  0{index + 1}
                </span>
              </a>
            ))}
            <a
              className="mt-3 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-cyan-400 text-sm font-semibold text-[#02141b]"
              download={siteConfig.apk.filename}
              href={siteConfig.apk.href}
              onClick={() => setIsMenuOpen(false)}
            >
              <DownloadIcon size={16} />
              Descargar APK · {siteConfig.apk.size}
            </a>

            <div className="mt-auto pt-10">
              <div className="hairline mb-4" />
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/25">
                Prevención · Monitoreo · Respuesta
              </p>
              <p className="mt-2 text-[11px] text-white/35">
                APK universal para Android · Sin registro para consultar.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

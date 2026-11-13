"use client";

import dynamic from "next/dynamic";

import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { DownloadIcon, RadarIcon, WavesIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { techStack } from "@/config/content";

const SeismicWaves = dynamic(() => import("@/components/ui/seismic-waves"), {
  ssr: false,
});

export function Cta() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="container-hydro">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-cyan-300/15 bg-[#04101b] p-7 shadow-hydro sm:p-10 lg:p-14">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(80%_120%_at_15%_0%,rgba(34,211,238,0.16),transparent_55%),radial-gradient(60%_80%_at_95%_100%,rgba(255,106,19,0.13),transparent_60%)]"
            />
            <div
              aria-hidden="true"
              className="hydro-grid absolute inset-0 opacity-40"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 top-1/2 hidden h-128 w-lg -translate-y-1/2 overflow-hidden rounded-full lg:block"
            >
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.14),transparent_65%)] blur-2xl" />
              <SeismicWaves className="opacity-80" />
              <div className="absolute inset-0 rounded-full border border-cyan-300/20" />
              <div className="absolute inset-12 rounded-full border border-cyan-300/10" />
            </div>

            <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <span className="eyebrow">
                  <span className="h-px w-8 bg-orange-400/80" />
                  Empieza ahora
                </span>
                <h2 className="mt-4 max-w-xl text-balance text-3xl font-semibold leading-[1.02] tracking-tight text-white sm:text-4xl lg:text-5xl">
                  La información salva vidas.
                  <br />
                  <span className="text-gradient-hydro">Tenla a mano.</span>
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/50">
                  Descarga HydroAlert y consulta sismos, lluvias y reportes de
                  tu comunidad sin registrarte. La prevención empieza por saber
                  qué está pasando.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Magnetic>
                    <a
                      className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 text-sm font-semibold text-[#02141b] shadow-[0_0_38px_-10px_rgba(34,211,238,0.8)] transition-all hover:bg-cyan-300"
                      download={siteConfig.apk.filename}
                      href={siteConfig.apk.href}
                    >
                      <DownloadIcon
                        className="transition-transform group-hover:translate-y-0.5"
                        size={16}
                      />
                      Descargar APK
                    </a>
                  </Magnetic>
                  <Magnetic>
                    <a
                      className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/4 px-6 text-sm font-medium text-white/70 transition-colors hover:border-cyan-300/30 hover:text-white"
                      href="#instalacion"
                    >
                      <RadarIcon size={15} />
                      Ver guía de instalación
                    </a>
                  </Magnetic>
                </div>

                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
                  {siteConfig.apk.format} · {siteConfig.apk.size} · Android
                  universal · Sin registro
                </p>
              </div>

              <div className="flex flex-col gap-2 rounded-2xl border border-white/8 bg-black/20 p-5 backdrop-blur">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                    Stack en producción
                  </p>
                  <WavesIcon className="text-cyan-400/50" size={14} />
                </div>
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-2">
                  {techStack.map((tech, index) => (
                    <span key={tech} className="flex items-center gap-2">
                      <span className="text-[11px] text-white/60">{tech}</span>
                      {index < techStack.length - 1 ? (
                        <span className="h-1 w-1 rounded-full bg-cyan-400/40" />
                      ) : null}
                    </span>
                  ))}
                </div>
                <div className="mt-4 h-px bg-linear-to-r from-transparent via-white/15 to-transparent" />
                <div className="mt-2 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.14em] text-emerald-300/70">
                    <span className="h-1 w-1 rounded-full bg-emerald-300 animate-hydro-blink" />
                    Monitoreo activo
                  </span>
                  <span className="font-mono text-[9px] text-white/25">
                    {siteConfig.apk.channel} · Android
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

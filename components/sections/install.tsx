"use client";

import * as React from "react";
import Image from "next/image";

import { HoloCard } from "@/components/ui/holo-card";
import { AppIcon } from "@/components/ui/icon-map";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { installSteps } from "@/config/content";
import { siteConfig } from "@/config/site";
import {
  AlertTriangleIcon,
  AndroidIcon,
  CheckIcon,
  DownloadIcon,
  LockIcon,
  ShieldIcon,
} from "@/components/icons";

const requirements = [
  { icon: AndroidIcon, label: "Android" },
  { icon: LockIcon, label: "Orígenes desconocidos" },
  { icon: ShieldIcon, label: "APK firmado" },
];

export function Install() {
  return (
    <section
      className="relative overflow-hidden py-24 sm:py-28"
      id="instalacion"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(55%_55%_at_75%_30%,rgba(34,211,238,0.09),transparent_65%),radial-gradient(45%_45%_at_15%_75%,rgba(255,106,19,0.06),transparent_65%)]"
      />

      <div className="container-hydro relative">
        <div className="grid gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <div>
            <SectionHeading
              description="HydroAlert se distribuye directamente como APK. Descárgala, permite la instalación y empieza a consultar sin crear una cuenta."
              eyebrow="Instalación"
              title={
                <>
                  Llévala contigo.
                  <br />
                  <span className="text-gradient-cyan">
                    Está lista en minutos.
                  </span>
                </>
              }
            />

            <Reveal className="mt-8" delay={80}>
              <div className="rounded-2xl border border-cyan-300/18 bg-[#06131f]/80 p-5 shadow-hydro">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-300/60">
                      Descarga directa
                    </p>
                    <p className="mt-1 text-lg font-semibold tracking-tight text-white">
                      HydroAlert para Android
                    </p>
                    <p className="mt-1 text-xs text-white/40">
                      {siteConfig.apk.format} · {siteConfig.apk.size} ·{" "}
                      {siteConfig.apk.channel}
                    </p>
                  </div>
                  <a
                    className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 text-sm font-semibold text-[#02141b] shadow-[0_0_34px_-8px_rgba(34,211,238,0.8)] transition-all hover:bg-cyan-300"
                    download={siteConfig.apk.filename}
                    href={siteConfig.apk.href}
                  >
                    <DownloadIcon
                      className="transition-transform group-hover:translate-y-0.5"
                      size={17}
                    />
                    Descargar APK
                  </a>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/7 pt-4">
                  {requirements.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 rounded-lg bg-white/3 px-2.5 py-2"
                    >
                      <item.icon
                        className="shrink-0 text-cyan-300/80"
                        size={13}
                      />
                      <span className="text-[10px] leading-tight text-white/50">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="mt-8 flex flex-col">
              {installSteps.map((step, index) => (
                <Reveal key={step.number} delay={index * 90}>
                  <div className="relative flex gap-4 pb-7 last:pb-0">
                    {index < installSteps.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className="absolute left-[19px] top-11 h-[calc(100%-2.5rem)] w-px bg-gradient-to-b from-cyan-400/25 to-transparent"
                      />
                    ) : null}
                    <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-cyan-300/20 bg-[#051523] font-mono text-[11px] font-semibold text-cyan-300">
                      {step.number}
                    </span>
                    <div className="pt-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-white">
                          {step.title}
                        </h3>
                        <AppIcon
                          className="text-white/25"
                          name={step.icon}
                          size={13}
                        />
                      </div>
                      <p className="mt-1 max-w-md text-xs leading-relaxed text-white/45">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={120}>
              <div className="mt-4 flex items-start gap-3 rounded-xl border border-orange-400/20 bg-orange-500/[0.055] p-4">
                <AlertTriangleIcon
                  className="mt-0.5 shrink-0 text-orange-300"
                  size={16}
                />
                <p className="text-[11px] leading-relaxed text-orange-100/60">
                  <span className="font-semibold text-orange-200/85">
                    Instalación fuera de una tienda:
                  </span>{" "}
                  Android te pedirá habilitar la instalación desde orígenes
                  desconocidos. Concédelo solo para este archivo y descarga el
                  APK únicamente desde este sitio oficial de presentación.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col items-center justify-start gap-10 lg:pt-6">
            <Reveal className="w-full max-w-[450px]">
              <div className="flex justify-center">
                <HoloCard
                  className="mx-auto w-full"
                  gradient="radial-gradient(100% 90% at 10% 0%, #0b4f6b 0%, transparent 55%), radial-gradient(80% 80% at 95% 100%, #4a1c05 0%, transparent 55%), linear-gradient(150deg, #071b2c, #030b14 65%, #071d2a)"
                  hoverScale={1.03}
                  maxTilt={9}
                  patternSize="18px 18px"
                  shineOpacity={0.85}
                  style={
                    {
                      "--holo-card-width": "100%",
                      "--holo-card-height": "268px",
                      "--holo-card-radius": "24px",
                      "--holo-card-bleed": "26px",
                    } as React.CSSProperties
                  }
                >
                  <HoloCard.Rotator>
                    <HoloCard.Frame>
                      <HoloCard.Surface>
                        <HoloCard.Pattern />
                        <HoloCard.Inset />
                        <HoloCard.Content className="flex-col justify-between p-5 sm:p-6">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                              <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-black/20">
                                <Image
                                  alt="Símbolo de HydroAlert"
                                  className="h-6 w-6 object-contain"
                                  height={24}
                                  src="/images/logo_mark.png"
                                  width={24}
                                />
                              </span>
                              <div>
                                <p className="text-[12px] font-semibold tracking-tight text-white">
                                  Hydro
                                  <span className="text-orange-400">
                                    Alert
                                  </span>{" "}
                                  Mobile
                                </p>
                                <p className="text-[7px] uppercase tracking-[0.2em] text-white/35">
                                  Android access pass
                                </p>
                              </div>
                            </div>
                            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/25 bg-emerald-400/10 px-2 py-0.5 text-[7px] font-bold uppercase tracking-[0.12em] text-emerald-300">
                              <span className="h-1 w-1 rounded-full bg-emerald-300" />
                              Release
                            </span>
                          </div>

                          <div className="flex items-end justify-between gap-4">
                            <div>
                              <p className="text-[8px] uppercase tracking-[0.2em] text-white/30">
                                Aplicación
                              </p>
                              <p className="mt-1 text-2xl font-semibold leading-none tracking-tight text-white">
                                APK
                                <span className="ml-2 align-middle text-[10px] font-medium uppercase tracking-[0.16em] text-cyan-300/80">
                                  Universal
                                </span>
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-[8px] uppercase tracking-[0.2em] text-white/30">
                                Tamaño
                              </p>
                              <p className="mt-1 text-sm font-semibold text-white/85">
                                {siteConfig.apk.size}
                              </p>
                            </div>
                          </div>

                          <div>
                            <div className="grid grid-cols-3 gap-2">
                              {[
                                { label: "Canal", value: "Release" },
                                { label: "ABIs", value: "3" },
                                { label: "Acceso", value: "Libre" },
                              ].map((item) => (
                                <div
                                  key={item.label}
                                  className="rounded-md border border-white/8 bg-black/15 px-2 py-1.5"
                                >
                                  <p className="text-[6px] uppercase tracking-[0.18em] text-white/25">
                                    {item.label}
                                  </p>
                                  <p className="mt-0.5 text-[9px] font-semibold text-white/80">
                                    {item.value}
                                  </p>
                                </div>
                              ))}
                            </div>
                            <div className="mt-3 flex items-center justify-between gap-3">
                              <div
                                aria-hidden="true"
                                className="h-4 flex-1 opacity-35 [background-image:repeating-linear-gradient(90deg,rgba(255,255,255,0.9)_0_1px,transparent_1px_3px,rgba(255,255,255,0.5)_3px_4px,transparent_4px_8px)]"
                              />
                              <p className="font-mono text-[6px] uppercase tracking-[0.22em] text-white/25">
                                HA-APK-2026
                              </p>
                            </div>
                          </div>
                        </HoloCard.Content>
                        <HoloCard.Shine />
                      </HoloCard.Surface>
                    </HoloCard.Frame>
                  </HoloCard.Rotator>
                </HoloCard>
              </div>
            </Reveal>

            <Reveal className="w-full max-w-[450px]" delay={120}>
              <div className="rounded-2xl border border-white/8 bg-[#06131f]/70 p-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                  Compatibilidad verificada
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {siteConfig.apk.abis.map((abi) => (
                    <span
                      key={abi}
                      className="rounded-md border border-white/8 bg-white/4 px-2 py-1 font-mono text-[9px] text-cyan-200/70"
                    >
                      {abi}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex flex-col gap-2 border-t border-white/7 pt-4">
                  {[
                    "Consulta como invitado, sin correo ni contraseña",
                    "Notificaciones para sismos de magnitud ≥ 5.0",
                    "Reportes con foto, GPS y validación comunitaria",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-400/10 text-emerald-300">
                        <CheckIcon size={9} strokeWidth={2.4} />
                      </span>
                      <span className="text-[11px] leading-relaxed text-white/50">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

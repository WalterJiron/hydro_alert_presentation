"use client";

import * as React from "react";
import clsx from "clsx";

import { HoloCard } from "@/components/ui/holo-card";
import { AppIcon } from "@/components/ui/icon-map";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { features } from "@/config/content";
import { MapPinIcon, SosIcon, WavesIcon } from "@/components/icons";

const spans = [
  "md:col-span-4",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-4",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-2",
];

function FeatureVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="mt-6 grid grid-cols-3 gap-2">
        {[
          { label: "Sismo", value: "M 5.2", tone: "orange" },
          { label: "Radar", value: "Lluvia", tone: "cyan" },
          { label: "Comunidad", value: "1 reporte", tone: "emerald" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-white/7 bg-white/[0.025] px-2.5 py-2"
          >
            <p className="font-mono text-[7px] uppercase tracking-[0.18em] text-white/30">
              {item.label}
            </p>
            <p
              className={clsx(
                "mt-1 text-[11px] font-semibold",
                item.tone === "orange" && "text-orange-300",
                item.tone === "cyan" && "text-cyan-300",
                item.tone === "emerald" && "text-emerald-300",
              )}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="pointer-events-none absolute -bottom-10 -right-8 h-40 w-40">
        <div className="absolute inset-0 rounded-full border border-cyan-400/10" />
        <div className="absolute inset-6 rounded-full border border-cyan-400/15" />
        <div className="absolute inset-12 rounded-full border border-cyan-400/20" />
        <div className="absolute inset-0 animate-hydro-radar rounded-full bg-[conic-gradient(from_0deg,rgba(34,211,238,0.18),transparent_60%)]" />
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="pointer-events-none absolute -bottom-14 -right-10 h-44 w-44">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.18),transparent_65%)]" />
        <div className="absolute inset-8 rounded-full border border-cyan-300/20" />
        <div className="absolute inset-16 rounded-full border border-cyan-300/25" />
        <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
      </div>
    );
  }

  if (index === 4) {
    return (
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 opacity-70 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:24px_24px]">
        <span className="absolute bottom-8 left-[22%] h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_12px_rgba(251,146,60,0.9)]" />
        <span className="absolute bottom-14 left-[48%] h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
        <span className="absolute bottom-6 left-[70%] h-2 w-2 rounded-full bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.9)]" />
        <span className="absolute bottom-[52%] left-[62%] h-8 w-8 rounded-full border border-cyan-300/20" />
      </div>
    );
  }

  if (index === 5) {
    return (
      <div className="mt-6 flex gap-1.5">
        {["Antes", "Durante", "Después"].map((step, stepIndex) => (
          <span
            key={step}
            className={clsx(
              "flex-1 rounded-md border py-1.5 text-center text-[9px] font-medium",
              stepIndex === 1
                ? "border-orange-400/25 bg-orange-500/10 text-orange-300"
                : "border-white/8 bg-white/3 text-white/40",
            )}
          >
            {step}
          </span>
        ))}
      </div>
    );
  }

  return null;
}

function ReportHoloCard() {
  return (
    <div className="h-full min-h-[280px]">
      <HoloCard
        activateOnHover
        className="h-full w-full"
        gradient="radial-gradient(100% 80% at 10% 0%, #0b4a63 0%, transparent 55%), radial-gradient(80% 70% at 90% 100%, #3b1604 0%, transparent 55%), linear-gradient(150deg, #061b2a, #030b14 70%)"
        hoverScale={1.015}
        maxTilt={5}
        patternSize="20px 20px"
        shineOpacity={0.7}
        style={
          {
            "--holo-card-width": "100%",
            "--holo-card-height": "100%",
            "--holo-card-bleed": "0px",
          } as React.CSSProperties
        }
      >
        <HoloCard.Rotator>
          <HoloCard.Frame>
            <HoloCard.Surface>
              <HoloCard.Pattern />
              <HoloCard.Inset />
              <HoloCard.Content className="flex-col justify-between p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-300">
                    <AppIcon name="users" size={19} />
                  </div>
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-400/8 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-cyan-200/80">
                    Colaborativa
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-white">
                    Red ciudadana colaborativa
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/55">
                    Inundaciones, derrumbes o postes caídos reportados con
                    coordenadas GPS y fotografías verificables alojadas en la
                    nube.
                  </p>

                  <div className="mt-4 flex items-center gap-2 rounded-lg border border-white/8 bg-black/20 p-2">
                    <div className="h-9 w-12 rounded bg-gradient-to-br from-[#1b5a72] to-[#0a2636]" />
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-1 text-[9px] font-semibold text-white/85">
                        <MapPinIcon className="text-rose-300" size={9} />
                        Calle anegada · San Judas
                      </p>
                      <p className="text-[7px] text-white/40">
                        GPS + foto · hace 12 min
                      </p>
                    </div>
                    <span className="rounded bg-emerald-400/15 px-1.5 py-0.5 text-[7px] font-bold uppercase text-emerald-300">
                      Verificado
                    </span>
                  </div>
                </div>
              </HoloCard.Content>
              <HoloCard.Shine />
            </HoloCard.Surface>
          </HoloCard.Frame>
        </HoloCard.Rotator>
      </HoloCard>
    </div>
  );
}

function SosHoloCard() {
  return (
    <div className="h-full min-h-[280px]">
      <HoloCard
        activateOnHover
        className="h-full w-full"
        gradient="radial-gradient(90% 80% at 50% 0%, #5a2307 0%, transparent 60%), linear-gradient(160deg, #1a0c05, #0a0709 60%, #120701)"
        hoverScale={1.02}
        maxTilt={7}
        patternSize="16px 16px"
        shineOpacity={0.75}
        style={
          {
            "--holo-card-width": "100%",
            "--holo-card-height": "100%",
            "--holo-card-bleed": "0px",
          } as React.CSSProperties
        }
      >
        <HoloCard.Rotator>
          <HoloCard.Frame>
            <HoloCard.Surface>
              <HoloCard.Pattern />
              <HoloCard.Inset />
              <HoloCard.Content className="flex-col justify-between p-6">
                <div className="flex items-start justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-xl border border-orange-400/30 bg-orange-500/15 text-orange-300">
                    <SosIcon size={19} />
                  </div>
                  <span className="rounded-full border border-orange-400/25 bg-orange-500/10 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-orange-200/80">
                    Auxilio
                  </span>
                </div>

                <div>
                  <div className="relative mb-4 h-20">
                    <div className="absolute left-0 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full border border-orange-400/20" />
                    <div className="absolute left-3 top-1/2 h-14 w-14 -translate-y-1/2 rounded-full border border-orange-400/30" />
                    <div className="animate-hydro-sos absolute left-7 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-orange-500 text-[10px] font-black text-black shadow-[0_0_30px_rgba(255,106,19,0.7)]">
                      SOS
                    </div>
                    <WavesIcon
                      className="absolute bottom-1 right-2 text-orange-400/30"
                      size={28}
                    />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-white">
                    Modo SOS visual
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    Señal a pantalla completa con destello estroboscópico de
                    alta visibilidad para rescate en la oscuridad o bajo lluvia
                    intensa.
                  </p>
                </div>
              </HoloCard.Content>
              <HoloCard.Shine />
            </HoloCard.Surface>
          </HoloCard.Frame>
        </HoloCard.Rotator>
      </HoloCard>
    </div>
  );
}

export function Features() {
  return (
    <section className="relative py-24 sm:py-28" id="funciones">
      <div className="container-hydro">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            description="Cada función responde a una necesidad real durante una emergencia: ver rápido, entender sin tecnicismos y actuar con evidencia."
            eyebrow="Funciones"
            title={
              <>
                Todo lo crítico,{" "}
                <span className="text-gradient-cyan">sin ruido.</span>
              </>
            }
          />
          <div className="flex items-center gap-2 self-start rounded-full border border-white/8 bg-white/4 px-3 py-1.5 lg:self-end">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-hydro-blink" />
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
              7 módulos activos
            </span>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-6">
          {features.map((feature, index) => {
            const isReport = index === 3;
            const isSos = index === 6;

            return (
              <Reveal
                key={feature.title}
                className={clsx(
                  spans[index],
                  isReport || isSos ? "min-h-[280px]" : "",
                )}
                delay={(index % 3) * 90}
              >
                {isReport ? (
                  <ReportHoloCard />
                ) : isSos ? (
                  <SosHoloCard />
                ) : (
                  <article className="group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#06131f]/75 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/22 hover:bg-[#071827]">
                    <div className="flex items-start justify-between gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-cyan-300">
                        <AppIcon name={feature.icon} size={18} />
                      </div>
                      <span className="rounded-full border border-white/8 bg-white/4 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-white/35">
                        {feature.tag}
                      </span>
                    </div>

                    <div className="relative z-10 mt-5">
                      <h3 className="text-base font-semibold tracking-tight text-white sm:text-lg">
                        {feature.title}
                      </h3>
                      <p className="mt-2 max-w-md text-[13px] leading-relaxed text-white/45">
                        {feature.description}
                      </p>
                    </div>

                    <FeatureVisual index={index} />

                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-300/25 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </article>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

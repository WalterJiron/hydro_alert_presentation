import { AppIcon } from "@/components/ui/icon-map";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { pillars, solutions } from "@/config/content";
import { CheckIcon } from "@/components/icons";

export function Solution() {
  return (
    <section
      className="relative overflow-hidden border-y border-white/6 bg-[#040d17] py-24 sm:py-28"
      id="solucion"
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(34,211,238,0.09),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="hydro-grid absolute inset-0 opacity-30"
      />

      <div className="container-hydro relative">
        <SectionHeading
          align="center"
          className="mx-auto"
          description="HydroAlert centraliza todo el ciclo de conciencia situacional: desde el dato científico hasta la acción comunitaria. En una sola app, sin fricción."
          eyebrow="La solución"
          title={
            <>
              Una sola app.{" "}
              <span className="text-gradient-cyan">Todo el ciclo.</span>
            </>
          }
        />

        <div className="relative mt-14 grid gap-4 md:grid-cols-3">
          <div
            aria-hidden="true"
            className="absolute left-[16%] right-[16%] top-9 hidden h-px bg-gradient-to-r from-cyan-400/10 via-cyan-400/45 to-orange-400/30 md:block"
          />

          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 120}>
              <article className="group relative h-full rounded-2xl border border-white/9 bg-[#06131f]/85 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/25">
                <div className="relative flex items-center justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-300/15 bg-[#04101b] text-cyan-300 shadow-[0_0_24px_-6px_rgba(34,211,238,0.5)]">
                    <AppIcon name={pillar.icon} size={19} />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">
                    Paso {pillar.step}
                  </span>
                </div>

                <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300/60">
                  {pillar.kicker}
                </p>
                <h3 className="mt-1 text-2xl font-semibold tracking-tight text-white">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {pillar.description}
                </p>

                <ul className="mt-5 flex flex-col gap-2 border-t border-white/6 pt-4">
                  {pillar.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2 text-xs text-white/55"
                    >
                      <span className="grid h-4 w-4 place-items-center rounded-full bg-cyan-400/10 text-cyan-300">
                        <CheckIcon size={9} strokeWidth={2.4} />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6" delay={120}>
          <div className="grid overflow-hidden rounded-2xl border border-white/8 bg-[#06131f]/60 md:grid-cols-3 md:divide-x md:divide-white/6">
            {solutions.map((solution) => (
              <div
                key={solution.title}
                className="flex items-start gap-3 border-b border-white/6 p-5 last:border-b-0 md:border-b-0"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/5 text-orange-300">
                  <AppIcon name={solution.icon} size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {solution.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-white/45">
                    {solution.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

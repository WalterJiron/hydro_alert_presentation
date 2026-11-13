import { AppIcon } from "@/components/ui/icon-map";
import { Reveal } from "@/components/ui/reveal";
import { SeismographTrace } from "@/components/ui/seismograph-trace";
import { contextStats } from "@/config/content";

export function Context() {
  return (
    <section className="relative border-y border-white/6 bg-[#040d17] py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(70%_80%_at_10%_20%,rgba(34,211,238,0.07),transparent_60%),radial-gradient(50%_60%_at_95%_80%,rgba(255,106,19,0.05),transparent_65%)]"
      />

      <div className="container-hydro relative">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-8 bg-orange-400/80" />
              El contexto
            </span>
            <h2 className="mt-4 max-w-md text-balance text-3xl font-semibold leading-[1.05] tracking-tight text-white sm:text-4xl">
              Nicaragua vive en el{" "}
              <span className="text-gradient-cyan">epicentro</span>.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              Sismos, inundaciones repentinas y lluvias torrenciales no son
              anomalías: son eventos recurrentes que amenazan a las familias, la
              infraestructura y la continuidad de las comunidades.
            </p>
            <div className="mt-6 max-w-md">
              <SeismographTrace
                magnitude="M 5.2"
                source="Red Sísmica Nacional · INETER"
              />
            </div>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-3">
            {contextStats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 110}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-white/[0.035] p-5 transition-colors hover:border-cyan-300/25 hover:bg-white/[0.05]">
                  <div className="absolute right-3 top-2 font-mono text-4xl font-semibold text-white/[0.04]">
                    0{index + 1}
                  </div>
                  <div className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-300/15 bg-cyan-400/8 text-cyan-300">
                    <AppIcon name={stat.icon} size={18} />
                  </div>
                  <p className="mt-4 text-sm font-semibold tracking-tight text-white">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300/60">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-white/45">
                    {stat.detail}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

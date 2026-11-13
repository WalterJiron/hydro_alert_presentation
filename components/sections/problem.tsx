import { AppIcon } from "@/components/ui/icon-map";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { problems } from "@/config/content";

export function Problem() {
  return (
    <section className="relative py-24 sm:py-28" id="problema">
      <div className="container-hydro">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            description="Antes de HydroAlert, saber qué estaba pasando exigía saltar entre portales, apps extranjeras y redes sociales saturadas de rumores."
            eyebrow="El problema"
            title={
              <>
                La información existe.
                <br />
                <span className="text-white/35">
                  El problema es cómo llega.
                </span>
              </>
            }
          />

          <Reveal className="max-w-xs" delay={150}>
            <div className="corner-frame rounded-xl border border-orange-400/20 bg-orange-500/[0.045] p-4">
              <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-orange-300/80">
                Antes de HydroAlert
              </p>
              <p className="mt-2 text-sm leading-snug text-white/65">
                Cuatro fuentes. Cero contexto. Segundos que se pierden justo
                cuando más importan.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {problems.map((problem, index) => (
            <Reveal key={problem.id} delay={index * 100}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-[#06131f]/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/25 hover:bg-[#071827] sm:p-7">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                />
                <div
                  aria-hidden="true"
                  className="absolute -right-2 -top-6 text-[5.5rem] font-semibold leading-none tracking-tighter text-white/[0.035]"
                >
                  {problem.id}
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div
                    className={
                      problem.accent === "orange"
                        ? "grid h-11 w-11 place-items-center rounded-xl border border-orange-400/20 bg-orange-500/10 text-orange-300"
                        : "grid h-11 w-11 place-items-center rounded-xl border border-cyan-300/15 bg-cyan-400/8 text-cyan-300"
                    }
                  >
                    <AppIcon name={problem.icon} size={19} />
                  </div>
                  <span className="rounded-full border border-white/8 bg-white/4 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-white/30">
                    Falla {problem.id}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">
                  {problem.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/50">
                  {problem.description}
                </p>

                <div className="mt-6 flex items-center gap-2">
                  <span
                    className={
                      problem.accent === "orange"
                        ? "h-1 w-6 rounded-full bg-orange-400/70"
                        : "h-1 w-6 rounded-full bg-cyan-400/70"
                    }
                  />
                  <span className="h-px flex-1 bg-white/6" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

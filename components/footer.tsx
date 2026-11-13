import Image from "next/image";
import NextLink from "next/link";

import { ExternalLinkIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/8 bg-[#030a12]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      <div className="container-hydro py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr_0.6fr_0.9fr]">
          <div className="max-w-sm">
            <NextLink className="flex items-center gap-2.5" href="#top">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-400/8">
                <Image
                  alt="Logo de HydroAlert"
                  className="h-7 w-7 object-contain"
                  height={28}
                  src="/images/logo_mark.png"
                  width={28}
                />
              </span>
              <span className="text-[17px] font-semibold tracking-tight text-white">
                Hydro<span className="text-orange-400">Alert</span>
              </span>
            </NextLink>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Información que protege en tiempo real. Monitoreo sísmico, radar
              de lluvias y una red ciudadana para actuar antes de la emergencia.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Sin registro", "INETER + USGS", "Acceso abierto"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/8 bg-white/4 px-2.5 py-1 text-[10px] font-medium text-white/50"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
              Plataforma
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {siteConfig.navItems.slice(0, 4).map((item) => (
                <li key={item.href}>
                  <a
                    className="text-sm text-white/60 transition-colors hover:text-cyan-300"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
              Recursos
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <a
                  className="inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-cyan-300"
                  href={siteConfig.links.ineter}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  INETER <ExternalLinkIcon size={12} />
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-cyan-300"
                  href={siteConfig.links.usgs}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  USGS <ExternalLinkIcon size={12} />
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-cyan-300"
                  href={siteConfig.links.sinapred}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  SINAPRED <ExternalLinkIcon size={12} />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
              Descarga
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/55">
              APK universal para Android. Instalación directa, sin tiendas.
            </p>
            <a
              className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 text-sm font-semibold text-cyan-200 transition-colors hover:bg-cyan-400/15"
              download={siteConfig.apk.filename}
              href={siteConfig.apk.href}
            >
              Descargar APK
            </a>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/30">
              {siteConfig.apk.format} · {siteConfig.apk.size}
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-xl border border-orange-400/15 bg-orange-500/5 px-4 py-3">
          <p className="text-[11px] leading-relaxed text-orange-100/60">
            <span className="font-semibold text-orange-300/80">Aviso:</span>{" "}
            HydroAlert es una herramienta de conciencia situacional y alerta
            temprana. No sustituye a las autoridades. Ante una emergencia sigue
            las instrucciones de SINAPRED, INETER y los cuerpos de socorro.
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { Accordion } from "@heroui/react";

import {
  ChevronDownIcon,
  ExternalLinkIcon,
  ShieldIcon,
} from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/config/content";
import { siteConfig } from "@/config/site";

export function Faq() {
  return (
    <section
      className="relative border-t border-white/6 py-24 sm:py-28"
      id="faq"
    >
      <div className="container-hydro">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              description="Lo esencial sobre privacidad, acceso, fuentes de datos y uso responsable de la app."
              eyebrow="Preguntas frecuentes"
              title={
                <>
                  Lo que necesitas
                  <br />
                  <span className="text-white/35">
                    saber antes de instalar.
                  </span>
                </>
              }
            />

            <Reveal className="mt-8" delay={100}>
              <div className="rounded-2xl border border-white/8 bg-[#06131f]/70 p-5">
                <div className="flex items-center gap-2 text-cyan-300">
                  <ShieldIcon size={16} />
                  <p className="text-sm font-semibold text-white">
                    Uso responsable
                  </p>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-white/45">
                  HydroAlert complementa a las instituciones. Ante una
                  emergencia real, sigue siempre las instrucciones de las
                  autoridades.
                </p>
                <div className="mt-4 flex flex-col gap-2 border-t border-white/7 pt-4">
                  <a
                    className="inline-flex items-center justify-between gap-3 text-[11px] text-white/50 transition-colors hover:text-cyan-300"
                    href={siteConfig.links.sinapred}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    SINAPRED · Gestión de riesgo
                    <ExternalLinkIcon size={12} />
                  </a>
                  <a
                    className="inline-flex items-center justify-between gap-3 text-[11px] text-white/50 transition-colors hover:text-cyan-300"
                    href={siteConfig.links.ineter}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    INETER · Monitoreo sísmico
                    <ExternalLinkIcon size={12} />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={60}>
            <Accordion
              className="overflow-hidden rounded-2xl border border-white/8 bg-[#06131f]/70 px-5"
              hideSeparator={false}
            >
              {faqs.map((faq, index) => (
                <Accordion.Item key={faq.question} id={`faq-${index}`}>
                  <Accordion.Heading>
                    <Accordion.Trigger className="py-5 text-left text-sm font-medium text-white/85 transition-colors hover:text-white">
                      <span className="flex items-center justify-between gap-4">
                        <span className="flex items-baseline gap-3">
                          <span className="font-mono text-[9px] text-cyan-300/50">
                            0{index + 1}
                          </span>
                          {faq.question}
                        </span>
                        <Accordion.Indicator className="shrink-0 text-cyan-300/70">
                          <ChevronDownIcon size={16} />
                        </Accordion.Indicator>
                      </span>
                    </Accordion.Trigger>
                  </Accordion.Heading>
                  <Accordion.Panel>
                    <Accordion.Body className="pb-5 pl-7 text-[13px] leading-relaxed text-white/50">
                      {faq.answer}
                    </Accordion.Body>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

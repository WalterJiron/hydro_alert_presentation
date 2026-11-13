export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "HydroAlert",
  tagline: "Información que protege en tiempo real",
  description:
    "Monitoreo sísmico, radar de lluvias y reportes comunitarios en una sola app. Prevención, monitoreo y respuesta ante desastres naturales en Nicaragua.",
  navItems: [
    { label: "Problema", href: "#problema" },
    { label: "Solución", href: "#solucion" },
    { label: "Funciones", href: "#funciones" },
    { label: "La app", href: "#app" },
    { label: "Instalación", href: "#instalacion" },
    { label: "FAQ", href: "#faq" },
  ],
  apk: {
    href: "/app/app-release.apk",
    filename: "hydroalert-app-release.apk",
    size: "58.29 MB",
    sizeBytes: 61118615,
    format: "APK",
    channel: "Release",
    abis: ["arm64-v8a", "armeabi-v7a", "x86_64"],
  },
  links: {
    ineter: "https://www.ineter.gob.ni/",
    usgs: "https://earthquake.usgs.gov/earthquakes/map/",
    sinapred: "https://www.sinapred.gob.ni/",
  },
} as const;

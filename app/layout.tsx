import type { Metadata, Viewport } from "next";

import "@/styles/globals.css";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "HydroAlert",
    "Nicaragua",
    "sismos",
    "INETER",
    "USGS",
    "alertas tempranas",
    "inundaciones",
    "radar de lluvias",
    "reportes comunitarios",
    "gestión de riesgo",
    "SINAPRED",
  ],
  authors: [{ name: "HydroAlert" }],
  creator: "HydroAlert",
  openGraph: {
    type: "website",
    locale: "es_NI",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/logo.png",
        width: 600,
        height: 400,
        alt: "HydroAlert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/images/logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon/app_icon_foreground.png", type: "image/png" },
    ],
    apple: "/icon/app_icon_foreground.png",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#030812",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning className="dark" lang="es">
      <body className="bg-background font-sans text-foreground antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import * as React from "react";

import { IconSvgProps } from "@/types";

const base = ({ size = 24, width, height, ...props }: IconSvgProps) => ({
  "aria-hidden": true,
  fill: "none",
  focusable: false,
  height: height ?? size,
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 1.7,
  viewBox: "0 0 24 24",
  width: width ?? size,
  ...props,
});

export const EarthquakeIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="M2 12h3l2-7 3 14 2.5-9 2 4H22" />
  </svg>
);

export const RadarIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <circle cx="12" cy="12" opacity=".35" r="9" />
    <circle cx="12" cy="12" opacity=".55" r="5" />
    <path d="M12 12 19 6" />
    <circle cx="12" cy="12" fill="currentColor" r="1.2" stroke="none" />
    <path d="M12 3a9 9 0 0 1 9 9" opacity=".9" />
  </svg>
);

export const WavesIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="M2 8c2.2 0 2.8-2 5-2s2.8 2 5 2 2.8-2 5-2 2.8 2 5 2" />
    <path d="M2 13c2.2 0 2.8-2 5-2s2.8 2 5 2 2.8-2 5-2 2.8 2 5 2" />
    <path d="M2 18c2.2 0 2.8-2 5-2s2.8 2 5 2 2.8-2 5-2 2.8 2 5 2" />
  </svg>
);

export const BellIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 8h18s-3-1-3-8" />
    <path d="M13.7 21a2 2 0 0 1-3.4 0" />
  </svg>
);

export const ShieldIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const UsersIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const MapPinIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const CloudRainIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="M4 14.9A4.5 4.5 0 0 1 5.6 6 6 6 0 0 1 17 7.2a4 4 0 0 1 2.5 7.4" />
    <path d="M8 18v2M12 17v3M16 18v2" />
  </svg>
);

export const CameraIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="M14.5 4h-5L8 6H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4l-1.5-2Z" />
    <circle cx="12" cy="13" r="3.4" />
  </svg>
);

export const SosIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="4" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
  </svg>
);

export const DownloadIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="m7 10 5 5 5-5M12 15V3" />
  </svg>
);

export const ArrowRightIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);

export const ArrowUpRightIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const MenuIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const CheckIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="m4 12.5 5 5L20 6.5" />
  </svg>
);

export const AlertTriangleIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
    <path d="M12 9v4M12 17h.01" />
  </svg>
);

export const ClockIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const LayersIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="m12 2 9 5-9 5-9-5 9-5Z" />
    <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
  </svg>
);

export const WifiIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="M2 8.8a16 16 0 0 1 20 0M5 12.7a11 11 0 0 1 14 0M8.5 16.6a6 6 0 0 1 7 0" />
    <circle cx="12" cy="20" fill="currentColor" r="1" stroke="none" />
  </svg>
);

export const AndroidIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="M5 11a7 7 0 0 1 14 0v5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-5Z" />
    <path d="m7 5 1.5 2M17 5l-1.5 2M9 14h.01M15 14h.01" />
  </svg>
);

export const LockIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <rect height="11" rx="2" width="16" x="4" y="10" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);

export const SparkIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
  </svg>
);

export const SendIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="m22 2-7 20-4-9-9-4 20-7Z" />
    <path d="M22 2 11 13" />
  </svg>
);

export const CompassIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <circle cx="12" cy="12" r="9" />
    <path d="m16 8-2.4 5.6L8 16l2.4-5.6L16 8Z" />
  </svg>
);

export const SignalIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="M4 20v-5M9 20V9M14 20V5M19 20v-9" />
  </svg>
);

export const BoltIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
  </svg>
);

export const ExternalLinkIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="M15 3h6v6M21 3l-9 9" />
    <path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" />
  </svg>
);

export const HomeIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="m3 10 9-7 9 7v10a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 20V10Z" />
    <path d="M9 21v-7h6v7" />
  </svg>
);

export const BookIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5a2.5 2.5 0 0 0 0 5H20" />
    <path d="M4 4.5v17" />
  </svg>
);

export const MapIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="m9 4-6 2v14l6-2 6 2 6-2V4l-6 2-6-2Z" />
    <path d="M9 4v14M15 6v14" />
  </svg>
);

export const ClipboardIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="M9 4h6v3H9z" />
    <path d="M9 4H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2" />
    <path d="M9 11h6M9 15h4" />
  </svg>
);

export const UserIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
  </svg>
);

export const ThermometerIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0Z" />
    <path d="M12 9v6" />
  </svg>
);

export const DropletIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="M12 2.7 6.5 9.2a7 7 0 1 0 11 0L12 2.7Z" />
  </svg>
);

export const SirenIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="M5 18v-3a7 7 0 0 1 14 0v3" />
    <path d="M3 18h18M12 2v2M5.6 5.6 7 7M18.4 5.6 17 7" />
  </svg>
);

export const InfoIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </svg>
);

export const RefreshIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="M20 11a8 8 0 1 0-2.3 6.3" />
    <path d="M20 4v7h-7" />
  </svg>
);

export const MinusIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="M5 12h14" />
  </svg>
);

export const PlusIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const FlameIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="M12 22c4 0 7-2.7 7-6.6 0-4.3-4.1-7.4-4.1-11.4-2.7 1.4-4 3.8-4 6.2-1-.5-1.8-1.6-2-2.8C6.9 9.5 5 12 5 15.4 5 19.3 8 22 12 22Z" />
  </svg>
);

export const GlobeIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
  </svg>
);

export const GithubIcon: React.FC<IconSvgProps> = (props) => (
  <svg {...base(props)}>
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  </svg>
);

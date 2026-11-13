import type { IconName } from "@/config/content";
import type { IconSvgProps } from "@/types";

import * as React from "react";

import {
  AlertTriangleIcon,
  AndroidIcon,
  BellIcon,
  BoltIcon,
  BookIcon,
  CameraIcon,
  ClockIcon,
  CloudRainIcon,
  DownloadIcon,
  EarthquakeIcon,
  FlameIcon,
  GlobeIcon,
  LayersIcon,
  LockIcon,
  MapPinIcon,
  RadarIcon,
  ShieldIcon,
  SignalIcon,
  SosIcon,
  UsersIcon,
  WavesIcon,
} from "@/components/icons";

const iconMap: Record<IconName, React.FC<IconSvgProps>> = {
  earthquake: EarthquakeIcon,
  radar: RadarIcon,
  waves: WavesIcon,
  bell: BellIcon,
  shield: ShieldIcon,
  users: UsersIcon,
  mapPin: MapPinIcon,
  rain: CloudRainIcon,
  camera: CameraIcon,
  sos: SosIcon,
  layers: LayersIcon,
  book: BookIcon,
  bolt: BoltIcon,
  clock: ClockIcon,
  signal: SignalIcon,
  globe: GlobeIcon,
  flame: FlameIcon,
  download: DownloadIcon,
  android: AndroidIcon,
  lock: LockIcon,
};

export function AppIcon({ name, ...props }: IconSvgProps & { name: IconName }) {
  const Component = iconMap[name] ?? AlertTriangleIcon;

  return <Component {...props} />;
}

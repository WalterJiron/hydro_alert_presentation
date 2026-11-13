export type IconName =
  | "earthquake"
  | "radar"
  | "waves"
  | "bell"
  | "shield"
  | "users"
  | "mapPin"
  | "rain"
  | "camera"
  | "sos"
  | "layers"
  | "book"
  | "bolt"
  | "clock"
  | "signal"
  | "globe"
  | "flame"
  | "download"
  | "android"
  | "lock";

export const contextStats = [
  {
    value: "Cinturón de Fuego",
    label: "Actividad tectónica",
    detail:
      "Nicaragua se ubica en una de las zonas sísmicas más activas del planeta.",
    icon: "globe" as IconName,
  },
  {
    value: "Ruta de huracanes",
    label: "Lluvias extremas",
    detail:
      "Las tormentas tropicales y las crecidas repentinas son eventos recurrentes.",
    icon: "rain" as IconName,
  },
  {
    value: "Comunidades",
    label: "Riesgo directo",
    detail:
      "Familias, carreteras y servicios esenciales quedan expuestos cada temporada.",
    icon: "users" as IconName,
  },
];

export const problems = [
  {
    id: "01",
    title: "Información fragmentada",
    description:
      "Sismos en portales gubernamentales, clima en apps extranjeras e inundaciones en redes sociales. El usuario salta entre fuentes mientras cada segundo cuenta.",
    icon: "layers" as IconName,
    accent: "cyan" as const,
  },
  {
    id: "02",
    title: "Rumores y pánico",
    description:
      "Durante un temblor, WhatsApp y Facebook se saturan de datos inflados, imágenes de eventos pasados y noticias falsas que generan alarma innecesaria.",
    icon: "bell" as IconName,
    accent: "orange" as const,
  },
  {
    id: "03",
    title: "Comunicación unidireccional",
    description:
      "Las instituciones informan hacia la población, pero no existe un canal rápido para reportar un puente cortado, un río desbordado o una calle anegada.",
    icon: "signal" as IconName,
    accent: "cyan" as const,
  },
  {
    id: "04",
    title: "Fricción en la emergencia",
    description:
      "Registros obligatorios, correos y contraseñas antes de ver una alerta. En una emergencia, cada paso extra puede costar vidas.",
    icon: "lock" as IconName,
    accent: "orange" as const,
  },
];

export const pillars = [
  {
    step: "01",
    title: "Detectar",
    kicker: "Fuentes científicas",
    description:
      "Monitoreo sísmico de INETER con respaldo de USGS y radar de precipitación satelital en vivo. Datos oficiales, unificados y sin ruido.",
    icon: "earthquake" as IconName,
    points: ["INETER + USGS", "Radar de lluvias", "Actualización continua"],
  },
  {
    step: "02",
    title: "Entender",
    kicker: "Conciencia situacional",
    description:
      "Mapa interactivo con simbología por gravedad, pines que no se obstruyen y capas satelitales para prever la llegada de lluvias intensas.",
    icon: "mapPin" as IconName,
    points: ["Mapa con clustering", "Capas satelitales", "Alertas claras"],
  },
  {
    step: "03",
    title: "Actuar",
    kicker: "Respuesta comunitaria",
    description:
      "Reportes georreferenciados con foto, protocolos paso a paso y un modo SOS visual de pantalla completa para pedir auxilio.",
    icon: "shield" as IconName,
    points: ["Reportes con GPS", "Protocolos de actuación", "Modo SOS visual"],
  },
];

export const features = [
  {
    title: "Monitoreo multivariable",
    description:
      "Sismos con epicentro, profundidad, magnitud y hora exacta. Clima local y radar interactivo de nubes y lluvias en la misma pantalla.",
    icon: "earthquake" as IconName,
    tag: "Todo en uno",
    size: "wide" as const,
  },
  {
    title: "Alertas inmediatas",
    description:
      "Notificaciones automáticas ante sismos de magnitud significativa (≥ 5.0) y eventos actualizados por WebSockets, sin recargar.",
    icon: "bell" as IconName,
    tag: "≥ 5.0",
    size: "default" as const,
  },
  {
    title: "Radar de lluvias en vivo",
    description:
      "Capa satelital para ver la precipitación acercándose a tu ubicación antes de que llegue.",
    icon: "rain" as IconName,
    tag: "Satélite",
    size: "default" as const,
  },
  {
    title: "Red ciudadana colaborativa",
    description:
      "Inundaciones, derrumbes o postes caídos reportados con coordenadas GPS y fotografías verificables alojadas en la nube.",
    icon: "users" as IconName,
    tag: "Colaborativa",
    size: "wide" as const,
  },
  {
    title: "Mapa geoespacial inteligente",
    description:
      "Simbología por gravedad y dispersión de pines para ver incidentes cercanos sin que se tapen entre sí.",
    icon: "mapPin" as IconName,
    tag: "Geo",
    size: "default" as const,
  },
  {
    title: "Protocolos de actuación",
    description:
      "Guías claras sobre qué hacer antes, durante y después de sismos, inundaciones e incendios.",
    icon: "book" as IconName,
    tag: "Prevención",
    size: "default" as const,
  },
  {
    title: "Modo SOS visual",
    description:
      "Señal de auxilio a pantalla completa con destello estroboscópico de alta visibilidad para rescate en la oscuridad o bajo lluvia intensa.",
    icon: "sos" as IconName,
    tag: "Auxilio",
    size: "default" as const,
  },
];

export const solutions = [
  {
    title: "Fuentes oficiales unificadas",
    description:
      "Integra el monitoreo sísmico de INETER (con respaldo de USGS) y radares de precipitación satelital en vivo.",
    icon: "earthquake" as IconName,
  },
  {
    title: "Comunidad empoderada",
    description:
      "Los usuarios se convierten en una red de alerta temprana colaborativa con coordenadas y fotografías verificables.",
    icon: "users" as IconName,
  },
  {
    title: "Acceso sin fricción",
    description:
      "Mapa, clima, alertas y reportes disponibles al instante. El registro solo aparece al publicar un reporte.",
    icon: "bolt" as IconName,
  },
];

export const installSteps = [
  {
    number: "01",
    title: "Descarga el APK",
    description:
      "Toca el botón de descarga y guarda el archivo en tu teléfono Android.",
    icon: "download" as IconName,
  },
  {
    number: "02",
    title: "Permite la instalación",
    description:
      "Al abrir el archivo, Android pedirá habilitar la instalación desde orígenes desconocidos. Concédelo solo para este APK.",
    icon: "shield" as IconName,
  },
  {
    number: "03",
    title: "Instala y abre",
    description:
      "Confirma la instalación, abre HydroAlert y acepta los permisos de ubicación y notificaciones.",
    icon: "android" as IconName,
  },
  {
    number: "04",
    title: "Explora sin registrarte",
    description:
      "Consulta sismos, radar y reportes como invitado. Crea tu cuenta únicamente cuando quieras publicar.",
    icon: "bolt" as IconName,
  },
];

export const faqs = [
  {
    question: "¿HydroAlert es gratis?",
    answer:
      "Sí. La consulta del mapa, las alertas sísmicas, el clima y los reportes comunitarios es libre y gratuita. No hay planes de pago ni funciones bloqueadas.",
  },
  {
    question: "¿Necesito crear una cuenta para usarla?",
    answer:
      "No. Puedes entrar como invitado y ver toda la información vital de inmediato. El registro solo se solicita cuando quieres publicar un reporte comunitario, para darle trazabilidad a la información.",
  },
  {
    question: "¿De dónde vienen los datos?",
    answer:
      "Del monitoreo sísmico oficial de INETER, con respaldo internacional de USGS, de radares de precipitación satelital y de los reportes georreferenciados que envía la propia comunidad.",
  },
  {
    question: "¿Cómo se valida un reporte comunitario?",
    answer:
      "Cada reporte se registra con coordenadas GPS y una fotografía alojada en la nube. La ubicación y la evidencia permiten a la comunidad y a las autoridades verificar la veracidad del incidente.",
  },
  {
    question: "¿Funciona sin conexión a internet?",
    answer:
      "El monitoreo sísmico, el radar y los reportes se actualizan en línea. Las guías de actuación ya cargadas pueden consultarse aunque pierdas la conexión. Para recibir alertas en tiempo real necesitas datos o Wi-Fi.",
  },
  {
    question: "¿HydroAlert sustituye a las autoridades?",
    answer:
      "No. Es una herramienta de conciencia situacional y alerta temprana que complementa a las instituciones. Ante una emergencia, sigue siempre las instrucciones de SINAPRED, INETER y los cuerpos de socorro.",
  },
  {
    question: "¿En qué dispositivos puedo instalarla?",
    answer:
      "El APK es un build universal para Android con soporte para arm64-v8a, armeabi-v7a y x86_64. Descárgalo desde este sitio e instálalo manualmente.",
  },
];

export const techStack = [
  "Flutter",
  "INETER",
  "USGS",
  "WebSockets",
  "Google Maps",
  "Radar satelital",
  "Notificaciones push",
];

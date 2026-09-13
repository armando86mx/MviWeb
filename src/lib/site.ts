/**
 * Constantes globales del sitio.
 *
 * Datos pendientes de confirmar (dirección exacta, teléfonos, redes):
 * se dejan VACÍOS y con flags `confirmed: false`. Los componentes solo
 * los muestran cuando existen — nunca se renderiza texto provisional
 * al público. Al confirmar un dato: rellenar el campo y poner el flag
 * en true.
 */

export const SITE = {
  url: 'https://amorygraciapuebla.org',
  name: 'MVI Amor y Gracia',
  shortName: 'Amor y Gracia',
  alternateNames: [
    'Iglesia Amor y Gracia',
    'Amor y Gracia Puebla',
    'MVI Amor y Gracia Puebla',
  ],
  tagline: 'Somos iglesia · Hacemos iglesia · Hacemos familia',
  description:
    'Iglesia cristiana evangélica en Amozoc, Puebla. Estudio bíblico profundo, comunión, doctrina, oraciones y partir el pan. Bajo cobertura de Ministerios Visión Internacional (MVI).',
  locale: 'es-MX',
  language: 'es',
  email: 'contacto@amorygraciapuebla.org',
  parentOrganization: {
    name: 'Ministerios Visión Internacional',
    url: 'https://www.visioninternacional.org/',
  },
  pastors: {
    daniel: 'Pastor Daniel Chávez',
    rocio: 'Pastora Rocío Chávez',
  },
  sedes: {
    amozoc: {
      city: 'Amozoc de Mota',
      region: 'Puebla',
      country: 'MX',
      // Dirección oficial confirmada — escribir SIEMPRE tal cual:
      streetAddress: 'C. 4 Nte. 207, Barrio, San Antonio',
      postalCode: '72980',
      addressConfirmed: true,
      /** Dirección completa para mostrar, en una línea, tal como debe escribirse */
      fullAddress: 'C. 4 Nte. 207, Barrio, San Antonio, 72980 Amozoc de Mota, Pue.',
      mapsUrl: 'https://maps.app.goo.gl/TabBHcDNXSXWVzmy9',
      // Coordenadas del lugar "MVI Amor y Gracia Puebla" en Google Maps
      // (extraídas del propio mapsUrl de la iglesia)
      latitude: 19.0453686,
      longitude: -98.0425348,
      geoConfirmed: true,
      phone: '+52 238 385 6790',
    },
    tehuacan: {
      city: 'Tehuacán',
      region: 'Puebla',
      country: 'MX',
      streetAddress: '',
      postalCode: '',
      addressConfirmed: false,
      latitude: 18.4621, // aproximado al centro de Tehuacán — NO usar para navegación
      longitude: -97.3923,
      geoConfirmed: false,
      phone: '',
    },
  },
  social: {
    // El Footer y Contacto solo muestran las redes con URL real.
    facebook: 'https://www.facebook.com/IglesiaAmoryGraciaVIA',
    instagram: 'https://www.instagram.com/mviamorygracia/',
    youtube: 'https://www.youtube.com/@mviamorygracia',
    whatsapp: 'https://wa.me/522383856790',
  },
  /** Prédicas y podcast. Vacío = las secciones de medios no se renderizan.
      Al confirmar las cuentas: llenar y todo se enciende solo. */
  media: {
    youtubeChannel: 'https://www.youtube.com/@mviamorygracia',
    /** ID del canal — habilita la fila de videos recientes vía RSS en build */
    youtubeChannelId: 'UCea89IOZi5iiik80tBnq_Ew',
    spotifyShow: 'https://open.spotify.com/show/6RLEHzFr7slbjGvofrVMTn',
  },
  founded: '2014-03-01',
  ogImage: '/og-default.png',
} as const;

export const NAV_PRIMARY = [
  { label: 'Inicio',         href: '/' },
  { label: 'Nosotros',       href: '/nosotros' },
  { label: 'Lo que creemos', href: '/lo-que-creemos' },
  { label: 'Reuniones',      href: '/como-nos-reunimos' },
  { label: 'Recursos',       href: '/recursos' },
  { label: 'Blog',           href: '/blog' },
] as const;

/** CTA destacado del header. Contacto absorbe a la antigua /visitanos
    (qué esperar, lo que no somos y FAQ viven al final de /contacto). */
export const NAV_CTA = { label: 'Contacto', href: '/contacto' } as const;

export const NAV_FOOTER_CONOCE = [
  { label: 'Inicio',         href: '/' },
  { label: 'Nosotros',       href: '/nosotros' },
  { label: 'Lo que creemos', href: '/lo-que-creemos' },
  { label: 'Reuniones',      href: '/como-nos-reunimos' },
  { label: 'Contacto',       href: '/contacto' },
] as const;

export const NAV_FOOTER_EXPLORA = [
  { label: 'Iglesia en Puebla', href: '/puebla' },
  { label: 'Sede Amozoc',       href: '/sedes/amozoc' },
  { label: 'Sede Tehuacán',     href: '/sedes/tehuacan' },
  { label: 'Recursos',          href: '/recursos' },
  { label: 'Blog',              href: '/blog' },
  { label: 'Ofrendas',          href: '/ofrendas' },
] as const;

export const NAV_FOOTER_LEGAL = [
  { label: 'Aviso de privacidad', href: '/aviso-de-privacidad' },
  { label: 'Términos de uso',     href: '/terminos' },
] as const;

/** Palabra Rhema del año: dos versículos en dos columnas bajo el hero de la home
    (izquierda → derecha, tal como los dictó el dueño). Texto RVR1960. */
export const PALABRA_RHEMA = {
  title: 'Palabra Rhema 2026',
  verses: [
    {
      text: 'Y perseveraban en la doctrina de los apóstoles, en la comunión unos con otros, en el partimiento del pan y en las oraciones.',
      reference: 'Hechos 2:42',
    },
    {
      text: 'Y todos los días, en el templo y por las casas, no cesaban de enseñar y predicar a Jesucristo.',
      reference: 'Hechos 5:42',
    },
  ],
} as const;

export const PASTORAL_QUOTE = {
  text: 'Somos enseñables. Y seguimos aprendiendo día con día buscando a Dios.',
  attribution: 'Pastores Daniel y Rocío Chávez',
} as const;

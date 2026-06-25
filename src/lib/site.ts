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
    'Iglesia cristiana evangélica en Amozoc, Puebla. Estudio bíblico profundo, intimidad en adoración, comunión, oración y partimiento del pan. Bajo cobertura de Ministerios Visión Internacional (MVI).',
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
      city: 'Amozoc',
      region: 'Puebla',
      country: 'MX',
      // Dirección exacta pendiente de confirmar — vacío hasta entonces
      streetAddress: '',
      postalCode: '',
      addressConfirmed: false,
      latitude: 19.0414, // aproximado al centro de Amozoc — NO usar para navegación
      longitude: -98.0386,
      geoConfirmed: false,
      phone: '',
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
    // Vacíos hasta que las cuentas estén confirmadas; el Footer y
    // Contacto solo muestran las redes con URL real.
    facebook: '',
    instagram: '',
    youtube: '',
    whatsapp: '',
  },
  founded: '2014-03-01',
  ogImage: '/og-default.png',
} as const;

export const NAV_PRIMARY = [
  { label: 'Nosotros',       href: '/nosotros' },
  { label: 'Lo que creemos', href: '/lo-que-creemos' },
  { label: 'Reuniones',      href: '/como-nos-reunimos' },
  { label: 'Recursos',       href: '/recursos' },
  { label: 'Blog',           href: '/blog' },
  { label: 'Contacto',       href: '/contacto' },
] as const;

/** CTA destacado del header: la página con mayor intención de visita. */
export const NAV_CTA = { label: 'Visítanos', href: '/visitanos' } as const;

export const NAV_FOOTER_CONOCE = [
  { label: 'Inicio',            href: '/' },
  { label: 'Nosotros',          href: '/nosotros' },
  { label: 'Lo que creemos',    href: '/lo-que-creemos' },
  { label: 'Cómo nos reunimos', href: '/como-nos-reunimos' },
  { label: 'Visítanos',         href: '/visitanos' },
] as const;

export const NAV_FOOTER_EXPLORA = [
  { label: 'Iglesia en Puebla', href: '/puebla' },
  { label: 'Sede Amozoc',       href: '/sedes/amozoc' },
  { label: 'Sede Tehuacán',     href: '/sedes/tehuacan' },
  { label: 'Recursos',          href: '/recursos' },
  { label: 'Blog',              href: '/blog' },
  { label: 'Podcast',           href: '/podcast' },
  { label: 'Ofrendas',          href: '/ofrendas' },
] as const;

export const NAV_FOOTER_LEGAL = [
  { label: 'Aviso de privacidad', href: '/aviso-de-privacidad' },
  { label: 'Términos de uso',     href: '/terminos' },
] as const;

export const SCRIPTURE_HERO = {
  // Versículo provisional alineado al énfasis escatológico.
  // Los pastores eligen el definitivo entre Mateo 24:42,
  // Apocalipsis 22:20 o Tito 2:13. Solo se muestra en la home.
  text: 'Velad, pues, porque no sabéis a qué hora ha de venir vuestro Señor.',
  reference: 'Mateo 24:42',
} as const;

export const PASTORAL_QUOTE = {
  text: 'Somos enseñables. Y seguimos aprendiendo día con día buscando a Dios.',
  attribution: 'Pastores Daniel y Rocío Chávez',
} as const;

/**
 * Constantes globales del sitio.
 * PLACEHOLDERS están marcados con [PLACEHOLDER:...] y deben reemplazarse
 * con datos reales antes del lanzamiento.
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
      streetAddress: '[PLACEHOLDER: Calle y número, Amozoc, Puebla]',
      postalCode: '[PLACEHOLDER: CP]',
      latitude: 19.0414, // PLACEHOLDER aproximado de Amozoc
      longitude: -98.0386,
      phone: '[PLACEHOLDER: +52 222 XXX XXXX]',
    },
    tehuacan: {
      city: 'Tehuacán',
      region: 'Puebla',
      country: 'MX',
      streetAddress: '[PLACEHOLDER: Calle y número, Tehuacán, Puebla]',
      postalCode: '[PLACEHOLDER: CP]',
      latitude: 18.4621, // PLACEHOLDER aproximado de Tehuacán
      longitude: -97.3923,
      phone: '[PLACEHOLDER: +52 238 XXX XXXX]',
    },
  },
  social: {
    facebook: '[PLACEHOLDER: https://www.facebook.com/amorygraciapuebla]',
    instagram: '[PLACEHOLDER: https://www.instagram.com/amorygraciapuebla]',
    youtube: '[PLACEHOLDER: https://www.youtube.com/@amorygraciapuebla]',
    whatsapp: '[PLACEHOLDER: https://wa.me/52XXXXXXXXXX]',
  },
  founded: '2014-03-01',
  ogImage: '/og-default.svg',
} as const;

export const NAV_PRIMARY = [
  { label: 'Nosotros',       href: '/nosotros' },
  { label: 'Lo que creemos', href: '/lo-que-creemos' },
  { label: 'Reuniones',      href: '/como-nos-reunimos' },
  { label: 'Recursos',       href: '/recursos' },
  { label: 'Blog',           href: '/blog' },
  { label: 'Contacto',       href: '/contacto' },
] as const;

export const NAV_FOOTER_SITE = [
  { label: 'Inicio',           href: '/' },
  { label: 'Nosotros',         href: '/nosotros' },
  { label: 'Lo que creemos',   href: '/lo-que-creemos' },
  { label: 'Cómo nos reunimos',href: '/como-nos-reunimos' },
  { label: 'Visítanos',        href: '/visitanos' },
  { label: 'Puebla',           href: '/puebla' },
  { label: 'Sede Amozoc',      href: '/sedes/amozoc' },
  { label: 'Sede Tehuacán',    href: '/sedes/tehuacan' },
  { label: 'Recursos',         href: '/recursos' },
  { label: 'Blog',             href: '/blog' },
  { label: 'Podcast',          href: '/podcast' },
  { label: 'Contacto',         href: '/contacto' },
  { label: 'Ofrendas',         href: '/ofrendas' },
] as const;

export const NAV_FOOTER_LEGAL = [
  { label: 'Aviso de privacidad', href: '/aviso-de-privacidad' },
  { label: 'Términos de uso',     href: '/terminos' },
] as const;

export const SCRIPTURE_HERO = {
  // Versículo escogido como provisional alineado al énfasis escatológico.
  // PLACEHOLDER: los pastores eligen final entre Mateo 24:42, Apocalipsis 22:20 o Tito 2:13.
  text: 'Velad, pues, porque no sabéis a qué hora ha de venir vuestro Señor.',
  reference: 'Mateo 24:42',
} as const;

export const PASTORAL_QUOTE = {
  text: 'Somos enseñables. Nosotros no lo sabemos todo. Y seguimos aprendiendo día con día buscando a Dios.',
  attribution: 'Pastores Daniel y Rocío Chávez',
} as const;

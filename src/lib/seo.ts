import { SITE } from './site';

export function buildCanonical(path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE.url}${clean === '/' ? '' : clean}`.replace(/\/+$/, '') || SITE.url;
}

/** Sufija la marca corta solo si el título no la trae ya: evita el doble
    branding "· Amor y Gracia · MVI Amor y Gracia" que pasaba los 60ch. */
export function buildPageTitle(title: string): string {
  if (title.includes(SITE.shortName)) return title;
  return `${title} · ${SITE.shortName}`;
}

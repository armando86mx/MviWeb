import { SITE } from './site';

export interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: readonly string[];
}

export function buildCanonical(path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE.url}${clean === '/' ? '' : clean}`.replace(/\/+$/, '') || SITE.url;
}

export function buildPageTitle(title: string): string {
  if (title.includes(SITE.name)) return title;
  if (title === SITE.shortName) return `${SITE.name} · Iglesia Cristiana Evangélica en Puebla`;
  return `${title} · ${SITE.name}`;
}

export function fmtDateISO(d: string | Date): string {
  return new Date(d).toISOString();
}

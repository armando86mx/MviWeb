import { SITE } from './site';

export interface VideoItem {
  id: string;
  title: string;
}

const UA = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
  'Accept-Language': 'es-MX,es;q=0.9',
};

const decode = (s: string) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

/** Vía 1: RSS oficial del canal. OJO (verificado): exige host SIN "www"
    y User-Agent de navegador; aun así a veces responde 404 → hay fallback. */
async function viaRss(limit: number): Promise<VideoItem[]> {
  const channelId = SITE.media.youtubeChannelId;
  if (!channelId) return [];
  const res = await fetch(`https://youtube.com/feeds/videos.xml?channel_id=${channelId}`, { headers: UA });
  if (!res.ok) return [];
  const xml = await res.text();
  return [...xml.matchAll(/<entry>[\s\S]*?<\/entry>/g)]
    .slice(0, limit)
    .map((m) => ({
      id: m[0].match(/<yt:videoId>([^<]+)/)?.[1] ?? '',
      title: decode(m[0].match(/<title>([^<]+)/)?.[1] ?? ''),
    }))
    .filter((v) => v.id);
}

/** Vía 2: IDs en orden (más reciente primero) desde la página pública del
    canal + títulos vía oEmbed (API estable, sin key). Prueba /videos y,
    si el canal solo tiene transmisiones, /streams. */
async function viaPagina(limit: number): Promise<VideoItem[]> {
  const handle = SITE.media.youtubeChannel.split('@')[1];
  if (!handle) return [];
  let ids: string[] = [];
  for (const tab of ['videos', 'streams']) {
    const res = await fetch(`https://www.youtube.com/@${handle}/${tab}`, { headers: UA });
    if (!res.ok) continue;
    const html = await res.text();
    const vistos = new Set<string>();
    for (const m of html.matchAll(/"videoId":"([\w-]{11})"/g)) {
      if (!vistos.has(m[1])) vistos.add(m[1]);
      if (vistos.size >= limit) break;
    }
    ids = [...vistos];
    if (ids.length) break;
  }
  return Promise.all(
    ids.map(async (id) => {
      try {
        const r = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`);
        return { id, title: r.ok ? (await r.json()).title ?? '' : '' };
      } catch {
        return { id, title: '' };
      }
    }),
  );
}

/**
 * Últimos videos del canal, en build. Sin API key. Si el canal no está
 * configurado o ambas vías fallan, devuelve [] y el sitio construye igual
 * (las secciones de medios simplemente no pintan videos).
 */
export async function fetchLatestVideos(limit = 4): Promise<VideoItem[]> {
  if (!SITE.media.youtubeChannel && !SITE.media.youtubeChannelId) return [];
  try {
    const porRss = await viaRss(limit);
    if (porRss.length) return porRss;
  } catch { /* sigue el fallback */ }
  try {
    return await viaPagina(limit);
  } catch {
    return [];
  }
}

/** URL de embed de Spotify a partir de la URL pública del show. */
export function spotifyEmbedUrl(showUrl: string): string {
  return showUrl.replace('open.spotify.com/show/', 'open.spotify.com/embed/show/');
}

export interface EpisodeItem {
  id: string;
  title: string;
  cover: string;
}

/**
 * Últimos episodios del podcast, en build y sin API key: los IDs salen de
 * la página pública del show (orden: más reciente primero) y título +
 * portada del oEmbed oficial de Spotify. Si algo falla, [] y el build sigue.
 */
export async function fetchLatestEpisodes(limit = 4): Promise<EpisodeItem[]> {
  const showUrl = SITE.media.spotifyShow;
  if (!showUrl) return [];
  try {
    const res = await fetch(showUrl, { headers: UA });
    if (!res.ok) return [];
    const html = await res.text();
    const vistos = new Set<string>();
    for (const m of html.matchAll(/href="\/episode\/([A-Za-z0-9]{22})"/g)) {
      if (!vistos.has(m[1])) vistos.add(m[1]);
      if (vistos.size >= limit) break;
    }
    const eps = await Promise.all(
      [...vistos].map(async (id) => {
        try {
          const r = await fetch(`https://open.spotify.com/oembed?url=https://open.spotify.com/episode/${id}`);
          if (!r.ok) return { id, title: '', cover: '' };
          const j = await r.json();
          return { id, title: j.title ?? '', cover: j.thumbnail_url ?? '' };
        } catch {
          return { id, title: '', cover: '' };
        }
      }),
    );
    return eps.filter((e) => e.cover);
  } catch {
    return [];
  }
}

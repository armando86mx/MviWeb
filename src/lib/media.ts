import { SITE } from './site';

export interface VideoItem {
  id: string;
  title: string;
  published: string;
}

/**
 * Últimos videos del canal vía el RSS público de YouTube, en build.
 * Sin API key. Si el canal no está configurado o el feed falla,
 * devuelve [] y el sitio construye igual (las secciones no se pintan).
 */
export async function fetchLatestVideos(limit = 4): Promise<VideoItem[]> {
  const channelId = SITE.media.youtubeChannelId;
  if (!channelId) return [];
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`);
    if (!res.ok) return [];
    const xml = await res.text();
    return [...xml.matchAll(/<entry>[\s\S]*?<\/entry>/g)]
      .slice(0, limit)
      .map((m) => ({
        id: m[0].match(/<yt:videoId>([^<]+)/)?.[1] ?? '',
        title: m[0].match(/<title>([^<]+)/)?.[1] ?? '',
        published: m[0].match(/<published>([^<]+)/)?.[1] ?? '',
      }))
      .filter((v) => v.id);
  } catch {
    return [];
  }
}

/** URL de embed de Spotify a partir de la URL pública del show. */
export function spotifyEmbedUrl(showUrl: string): string {
  return showUrl.replace('open.spotify.com/show/', 'open.spotify.com/embed/show/');
}

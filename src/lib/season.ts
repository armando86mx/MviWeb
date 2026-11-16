/**
 * Temporada editorial del sitio. Cambia enabled a false para volver al diseño
 * habitual; los artículos no dependen de este ajuste y permanecen en el blog.
 * SITE_SEASON=none permite comprobar ese estado sin editar este archivo.
 */
export const seasonSettings = {
  enabled: true,
  current: 'el-celo-por-tu-casa',
} as const;

const seasons = {
  'el-celo-por-tu-casa': {
    id: 'el-celo-por-tu-casa',
    title: 'El celo por tu casa',
    description: 'Un corazón que anhela la presencia de Dios.',
    scripture: 'Salmo 84',
    meetingLabel: 'Domingos, 11:00 AM',
    articleSlug: 'el-celo-por-tu-casa',
    articleLabel: 'Del blog · Salmo 84',
  },
} as const;

const selected = import.meta.env.SITE_SEASON ?? seasonSettings.current;

export const activeSeason = seasonSettings.enabled && Object.hasOwn(seasons, selected)
  ? seasons[selected as keyof typeof seasons]
  : null;

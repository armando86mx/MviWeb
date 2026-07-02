#!/usr/bin/env node
// Guard de publicación: el home debe salir con sus 4 prédicas y 4 episodios.
// Si YouTube/Spotify no respondieron durante el build, MediosRow degrada en
// silencio — este guard evita PUBLICAR esa versión degradada (el sitio en
// línea se queda como estaba y el siguiente build lo reintenta).
import { readFileSync } from 'node:fs';

// Escotilla de emergencia: MIN_MEDIOS=0 publica aunque falten medios
// (en Actions: Run workflow → "saltar_guard"; en local: MIN_MEDIOS=0 ./scripts/deploy.sh).
const MIN = Number(process.env.MIN_MEDIOS ?? 4);

const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
const videos = (html.match(/data-video-id="/g) ?? []).length;
const episodios = (html.match(/data-episode-id="/g) ?? []).length;

if (videos < MIN || episodios < MIN) {
  console.error(`✗ Medios incompletos en el home: ${videos}/${MIN} videos, ${episodios}/${MIN} episodios.`);
  console.error('  YouTube/Spotify no respondieron durante el build. NO se publica.');
  process.exit(1);
}
console.log(`✓ Medios del home completos: ${videos} videos, ${episodios} episodios.`);

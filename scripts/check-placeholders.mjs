#!/usr/bin/env node
/**
 * Guard de build: falla si algún "[PLACEHOLDER" llega al HTML construido.
 * Evita que texto provisional vuelva a publicarse por accidente.
 *
 * Uso: node scripts/check-placeholders.mjs   (tras `astro build`)
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// fileURLToPath y no .pathname: la ruta del proyecto contiene espacios
const DIST = fileURLToPath(new URL('../dist', import.meta.url));
const NEEDLE = '[PLACEHOLDER';
const offenders = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p);
    else if (/\.(html|xml|json|webmanifest|txt)$/i.test(name)) {
      const content = readFileSync(p, 'utf8');
      if (content.includes(NEEDLE)) {
        const count = content.split(NEEDLE).length - 1;
        offenders.push(`${p.replace(DIST + '/', '')} (${count})`);
      }
    }
  }
}

try {
  walk(DIST);
} catch {
  console.error('check-placeholders: no existe dist/ — corre `pnpm build` primero.');
  process.exit(2);
}

if (offenders.length > 0) {
  console.error('\n✗ Hay placeholders visibles en el build:\n');
  for (const o of offenders) console.error('  · ' + o);
  console.error('\nReemplaza el dato real u oculta la sección antes de publicar.\n');
  process.exit(1);
}

console.log('✓ check-placeholders: dist/ limpio, sin "[PLACEHOLDER".');

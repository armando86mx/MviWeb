#!/usr/bin/env bash
# MVI Amor y Gracia — publica el sitio construido en la rama `deploy`.
#
#   ./scripts/deploy.sh
#
# Hostinger (hPanel → Git) apunta a esa rama y despliega su contenido
# tal cual en public_html — por eso la rama contiene SOLO el sitio ya
# construido (dist/), nunca el código fuente. Con el webhook configurado
# (ver DEPLOY.md), Hostinger publica solo cada vez que este script corre.
#
# El build corre AQUÍ (con los guards de placeholders/contraste y los
# medios frescos de YouTube/Spotify) — Hostinger no necesita Node.

set -euo pipefail
cd "$(dirname "$0")/.."

RAMA_DEPLOY="deploy"
# DEPLOY_PUSH_URL: lo usa GitHub Actions para autenticar el push; en local no hace falta.
ORIGEN=${DEPLOY_PUSH_URL:-$(git remote get-url origin)}
COMMIT_FUENTE=$(git rev-parse --short HEAD)

echo "── Build…"
pnpm build
node scripts/check-medios.mjs

echo "── Publicando dist/ como rama '$RAMA_DEPLOY'…"
cd dist
rm -rf .git
git init -q -b "$RAMA_DEPLOY"

# Encadenar al historial ya publicado: el push sale fast-forward (más amable
# con el pull de Hostinger) y permite saltar publicaciones idénticas
# (los builds programados sin video nuevo terminan aquí).
if git fetch -q --depth 1 "$ORIGEN" "$RAMA_DEPLOY" 2>/dev/null; then
  git reset -q --soft FETCH_HEAD
fi
git add -A
if git rev-parse -q --verify HEAD >/dev/null 2>&1 && git diff --cached --quiet; then
  echo "✓ Sin cambios respecto a lo ya publicado — no se sube nada."
  rm -rf .git
  exit 0
fi
git commit -q -m "Deploy $(date '+%Y-%m-%d %H:%M') desde $COMMIT_FUENTE"

# Push con reintentos (la red a GitHub a veces parpadea)
for i in 1 2 3 4 5 6; do
  if git push -f "$ORIGEN" "$RAMA_DEPLOY:$RAMA_DEPLOY" 2>&1; then
    ok=1; break
  fi
  echo "   reintento $i…"; sleep 5
done
rm -rf .git
[ "${ok:-0}" = "1" ] || { echo "✗ No se pudo subir la rama deploy" >&2; exit 1; }

echo "✓ Rama '$RAMA_DEPLOY' actualizada en GitHub."
echo "  Si el webhook de Hostinger está configurado, el sitio se publica solo"
echo "  en unos segundos; si no, hPanel → Git → Desplegar."

# Si el sitio ya está en línea, verificación rápida
if curl -s -o /dev/null --max-time 10 https://amorygraciapuebla.org/ 2>/dev/null; then
  sleep 8
  code=$(curl -s -o /dev/null -w "%{http_code}" https://amorygraciapuebla.org/ || echo "000")
  echo "  Sitio en línea: HTTP $code"
fi

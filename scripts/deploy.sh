#!/usr/bin/env bash
# MVI Amor y Gracia — deploy a Hostinger en un comando.
#
#   ./scripts/deploy.sh
#
# Construye el sitio EN ESTA MÁQUINA (no requiere Node en el servidor)
# y sube dist/ por rsync sobre SSH. La config del deploy vive en .env:
#
#   DEPLOY_SSH="u123456789@123.45.67.89"   ← usuario y host SSH de Hostinger
#   DEPLOY_PORT="65002"                    ← puerto SSH (Hostinger usa 65002)
#   DEPLOY_PATH="~/public_html/"           ← carpeta pública del hosting
#
# Seguro por diseño: .htaccess y api/descarga.php viajan DENTRO de dist/,
# y amorygracia-config.php vive fuera de public_html — el --delete no
# puede tocarla.

set -euo pipefail
cd "$(dirname "$0")/.."

# Cargar variables desde .env
if [ ! -f .env ]; then
  echo "✗ No existe .env — copia .env.example a .env y rellena DEPLOY_SSH." >&2
  exit 1
fi
set -a; source .env; set +a

: "${DEPLOY_SSH:?✗ Falta DEPLOY_SSH en .env (ej. u123456789@123.45.67.89)}"
DEPLOY_PORT="${DEPLOY_PORT:-65002}"
DEPLOY_PATH="${DEPLOY_PATH:-~/public_html/}"

echo "── Build (con guards de placeholders y contraste + medios frescos de YouTube/Spotify)…"
pnpm build

echo "── Subiendo dist/ a $DEPLOY_SSH:$DEPLOY_PATH (puerto $DEPLOY_PORT)…"
rsync -av --delete -e "ssh -p $DEPLOY_PORT" dist/ "$DEPLOY_SSH:$DEPLOY_PATH"

echo "── Verificando el sitio en línea…"
sleep 2
code=$(curl -s -o /dev/null -w "%{http_code}" https://amorygraciapuebla.org/ || echo "000")
redir=$(curl -s -o /dev/null -w "%{http_code}" https://amorygraciapuebla.org/visitanos || echo "000")
echo "   home: $code · /visitanos: $redir (301 esperado)"

echo "✓ Deploy completo. Recuerda: los videos/episodios del home se"
echo "  refrescan con cada deploy — corre este script tras publicar"
echo "  prédicas nuevas (o prográmalo semanal)."

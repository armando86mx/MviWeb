# Publicar el sitio en Hostinger — guía del día D

Todo el código ya está listo: el build genera un `dist/` completo que incluye
`.htaccess` (HTTPS + sin www + 301 de /visitanos + caché) y `api/descarga.php`
(el formulario de la serie Crecer). Esta guía es lo único que sigues.

**Tiempo estimado: 30-45 minutos** (más la espera de DNS si aplica).

---

## Antes de empezar (una sola vez)

1. **Buzones de correo** (hPanel → Correos electrónicos):
   - Crear **noreply@amorygraciapuebla.org** — apunta su contraseña, la usarás en el paso 3.
   - Confirmar que **web@amorygraciapuebla.org** existe (ahí llegan las notificaciones de descargas).

2. **Publicación automática por FTP** — GitHub Actions construye el sitio y
   lo sube DIRECTO a public_html; el Git de hPanel no se necesita para nada:
   - hPanel → Archivos → **Cuentas FTP** → crear una cuenta nueva cuyo
     **directorio** sea el `public_html` del dominio (así esa cuenta no puede
     tocar nada fuera — tu `amorygracia-config.php` queda intocable).
     Apunta el host (el dominio, sin `ftp://`), el usuario y la contraseña.
   - GitHub: repo `MviWeb` → Settings → Secrets and variables → **Actions** →
     "New repository secret", tres veces: `FTP_HOST`, `FTP_USER` y `FTP_PASS`
     con los datos de esa cuenta.
   - Con eso, `.github/workflows/publicar.yml` publica solo: cada 3 horas
     (medios frescos de YouTube/Spotify) y en cada push a `main`. **Las
     prédicas y episodios nuevos aparecen en el home sin que hagas nada.**
   - *(Opcional, respaldo)* El Git de hPanel (URL SSH + deploy key + rama
     `deploy`, directorio vacío) sigue sirviendo para publicar a mano con su
     botón "Desplegar" — sin configurar su webhook, que de todos modos falla.
     Si algún día usas ese botón: después borra de public_html el archivo
     `.ftp-deploy-sync-state.json` y la carpeta `.git` que deja el clon — el
     siguiente run del workflow resube todo limpio (son 2.5 MB, segundos).

3. En esta Mac: si haces el `.env` desde cero, `cp .env.example .env`
   (las llaves de GA4 y Clarity ya vienen con sus valores).

---

## El día de publicación

### 0. Confirmar la publicación automática (2 min)

En GitHub: repo → **Actions** → debe aparecer "Publicar sitio" (si no, el
workflow aún no llegó a `main` con el merge de release). Botón **Run
workflow** → esperar el ✓ verde y ver en el log "Medios del home completos:
4 videos, 4 episodios" — esa es la prueba de que YouTube/Spotify responden
también desde GitHub. Si fallara repetido ahí (y en local sí funciona),
avísale a Claude: el plan B es usar la API oficial de YouTube.

Con los secrets FTP del punto 2 ya creados, **ese mismo run publica el
sitio**: al ✓ verde, https://amorygraciapuebla.org ya está en línea.

**Antes del primer run**: hPanel → Administrador de archivos → en
public_html borra **solo** el `index.php` de "Próximamente" y `logo.png`.
**NO toques la carpeta `app/`** (el subdominio de la app de finanzas) ni
nada más: el deploy por FTP solo administra sus propios archivos — nunca
borra ni pisa lo ajeno, así que `app/` convive en paz con el sitio.

### 1. Config del formulario en el servidor (5 min)

La forma más fácil sin SSH: hPanel → **Administrador de archivos** →
sube `docs/amorygracia-config.example.php` a la carpeta **raíz** del
hosting (la de ARRIBA de public_html), renómbralo a
`amorygracia-config.php`, edítalo ahí mismo y pon la contraseña real de
noreply@ en `NOREPLY_PASS`. Permisos: 600 (clic derecho → Permissions).
**Queda FUERA de public_html a propósito** — ningún deploy lo toca.

### 2. Deploy

Nada que correr: el Run workflow del paso 0 ya publicó todo por FTP. Para
publicar a mano cualquier otro día: repo → Actions → "Publicar sitio" →
Run workflow (o simplemente espera al siguiente run automático).

Respaldo local si GitHub Actions no estuviera disponible:
`./scripts/deploy.sh` construye aquí y empuja la rama `deploy`; luego
hPanel → GIT → botón "Desplegar".

### 3. Smoke test (5 min)

- [ ] https://amorygraciapuebla.org carga con candado (y http:// redirige a https).
- [ ] https://www.amorygraciapuebla.org redirige a la versión sin www.
- [ ] /visitanos → redirige a /contacto.
- [ ] El home muestra 4 prédicas de YouTube y 4 episodios de Spotify.
- [ ] Banner de cookies aparece; al aceptar, en GA4 (Tiempo real) aparece tu visita.
- [ ] **La prueba de fuego**: llena el formulario en /recursos/descargar con tu
      correo personal → debe llegarte el correo con los 3 PDFs (revisa spam la
      primera vez) y la notificación a web@.
- [ ] Página inexistente (ej. /hola) muestra la 404 personalizada.

### 4. Google, la misma semana

1. **Search Console** (search.google.com/search-console): propiedad de dominio
   `amorygraciapuebla.org` (verificación por registro TXT en el DNS de
   Hostinger) → Sitemaps → enviar `https://amorygraciapuebla.org/sitemap-index.xml`.
2. **Google Business Profile**: en Google Maps, busca el lugar
   **"MVI Amor y Gracia Puebla"** (tú lo creaste) → "¿Eres el propietario?" →
   reclamar. Categoría principal: *Iglesia evangélica*. Añade horarios
   (dom 10:30-12:30, jue 19:30-21:00), el sitio web, y las fotos (mínimo 20 el
   primer mes). **No crear un GBP en Puebla capital** (penaliza).
3. **Bing Webmaster Tools**: importa desde Search Console con un clic.

### 5. Cloudflare (cuando todo lleve unos días estable)

Cuenta free → añadir dominio → **copiar TODOS los registros DNS actuales
(críticos: los MX del correo)** → cambiar nameservers (propaga en 24-48 h) →
SSL "Full (Strict)" + Always Use HTTPS + Web Analytics.

---

## Rutina de mantenimiento

| Cuándo | Qué |
|---|---|
| Publicaron prédica/episodio nuevo | **Nada** — GitHub Actions reconstruye y publica cada 3 horas; aparece solo. (¿Prisa? repo → Actions → "Publicar sitio" → Run workflow) |
| Post nuevo del blog | escribir el `.md` en `src/content/blog/` → push a `main` → se publica solo |
| Publicar los posts 3 y 4 (tras revisión pastoral) | cambiar `draft: true` → `false` en LOS DOS archivos (se enlazan entre sí) → push a `main` |
| reCAPTCHA (opcional, si llega spam) | crear llaves v3 en google.com/recaptcha → site key a **`.env.example`** (es pública; los builds automáticos construyen desde ahí — un valor solo en tu `.env` local se borra del sitio en el siguiente build) → secret al config del servidor → push a `main` |

## Si algo sale mal

- **No llega el correo del formulario**: revisa `~/amorygracia-config.php`
  (contraseña de noreply@, chmod 600). El formulario mientras tanto degrada
  amable: ofrece la descarga directa.
- **El home salió sin videos**: ya no puede pasar — `check-medios.mjs` aborta
  el deploy si el build no trae los 4 videos y 4 episodios; el sitio en línea
  se queda como estaba y el siguiente run (máx. 3 h) lo reintenta.
- **Deshacer un deploy**: `git log` → `git checkout <commit-anterior>` →
  `./scripts/deploy.sh` → `git checkout main`.

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

2. **Conectar Hostinger con GitHub** (hPanel → Avanzado → **GIT**):
   - Como el repo es privado, hPanel te muestra una **clave SSH** — cópiala
     y pégala en GitHub: repo `MviWeb` → Settings → **Deploy keys** →
     "Add deploy key" (solo lectura es suficiente).
   - En hPanel → GIT → "Crear repositorio":
     · **URL**: `git@github.com:armando86mx/MviWeb.git` (la forma SSH, no la HTTPS)
     · **Rama**: `deploy`  ← ¡importante! esta rama contiene el sitio YA
       construido; `main` tiene el código fuente y NO funcionaría
     · **Directorio**: dejar vacío (= public_html). La primera vez,
       public_html debe estar vacío: borra el archivo de bienvenida de
       Hostinger si existe.
   - **Auto-publicación**: en la misma pantalla de GIT, copia la URL del
     **webhook** que te da Hostinger y pégala en GitHub: repo → Settings →
     Webhooks → "Add webhook" (solo eventos push). Con esto, cada vez que
     corras `./scripts/deploy.sh` el sitio se actualiza solo.

3. En esta Mac: si haces el `.env` desde cero, `cp .env.example .env`
   (las llaves de GA4 y Clarity ya vienen con sus valores).

---

## El día de publicación

### 1. Config del formulario en el servidor (5 min)

La forma más fácil sin SSH: hPanel → **Administrador de archivos** →
sube `docs/amorygracia-config.example.php` a la carpeta **raíz** del
hosting (la de ARRIBA de public_html), renómbralo a
`amorygracia-config.php`, edítalo ahí mismo y pon la contraseña real de
noreply@ en `NOREPLY_PASS`. Permisos: 600 (clic derecho → Permissions).
**Queda FUERA de public_html a propósito** — ningún deploy lo toca.

### 2. Deploy (1 comando)

```bash
./scripts/deploy.sh
```

Construye el sitio aquí (con los guards y los medios frescos de
YouTube/Spotify) y empuja el resultado a la rama `deploy` de GitHub.
Hostinger la jala solo (webhook) o con el botón "Desplegar" de hPanel → GIT.

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
| Publicaron prédica/episodio nuevo | `./scripts/deploy.sh` (los medios del home se hornean en cada build) |
| Post nuevo del blog | escribir el `.md` en `src/content/blog/` → deploy |
| Publicar los posts 3 y 4 (tras revisión pastoral) | cambiar `draft: true` → `false` en LOS DOS archivos (se enlazan entre sí) → deploy |
| reCAPTCHA (opcional, si llega spam) | crear llaves v3 en google.com/recaptcha → site key al `.env`, secret al config del servidor → deploy |

## Si algo sale mal

- **No llega el correo del formulario**: revisa `~/amorygracia-config.php`
  (contraseña de noreply@, chmod 600). El formulario mientras tanto degrada
  amable: ofrece la descarga directa.
- **El home salió sin videos**: YouTube no respondió durante el build (pasa a
  veces) — vuelve a correr `./scripts/deploy.sh`.
- **Deshacer un deploy**: `git log` → `git checkout <commit-anterior>` →
  `./scripts/deploy.sh` → `git checkout main`.

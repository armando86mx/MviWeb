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

2. **Acceso SSH** (hPanel → Avanzado → SSH): activa el acceso y apunta
   usuario (`u…`), IP y puerto (normalmente **65002**).

3. En esta Mac, completa el `.env` del proyecto con los datos del paso 2:

   ```
   DEPLOY_SSH=u123456789@123.45.67.89
   DEPLOY_PORT=65002
   DEPLOY_PATH=~/public_html/
   ```

   (Las llaves de GA4 y Clarity ya están en `.env.example` — si haces el
   `.env` desde cero, cópialo de ahí: `cp .env.example .env` y añade las
   líneas DEPLOY_*.)

---

## El día de publicación

### 1. Config del formulario en el servidor (5 min)

```bash
# Desde la carpeta del proyecto:
scp -P 65002 docs/amorygracia-config.example.php u123456789@IP:~/amorygracia-config.php
ssh -p 65002 u123456789@IP "chmod 600 ~/amorygracia-config.php"
```

Luego edítalo en el servidor (`ssh` + `nano ~/amorygracia-config.php`) y pon
la contraseña real de noreply@ en `NOREPLY_PASS`. **Queda FUERA de
public_html a propósito** — ningún deploy lo toca.

### 2. Deploy (1 comando)

```bash
./scripts/deploy.sh
```

Construye el sitio aquí (con los guards y los medios frescos de
YouTube/Spotify) y sube `dist/` por rsync. Al final verifica solo que el
home responda 200 y /visitanos dé 301.

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

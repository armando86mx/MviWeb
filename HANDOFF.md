# HANDOFF — Sitio MVI Amor y Gracia
**Fecha:** 2 de julio de 2026 (noche) · **Para:** la siguiente sesión de trabajo
**Estado global: 🚀 EN PRODUCCIÓN.** https://amorygraciapuebla.org publicado, verificado
(smoke test completo) y con publicación automática funcionando. Formulario de
descargas operativo con reCAPTCHA v3 (probado con correo real hasta Hotmail).

---

## 1. Cómo se publica (flujo actual — NO es el Git de Hostinger)

**GitHub Actions publica solo** (`.github/workflows/publicar.yml`):
- **Cada 3 horas** (cron): reconstruye el sitio → medios frescos de YouTube/Spotify
  → sube por **FTP directo** a public_html. Videos/episodios nuevos aparecen sin
  tocar nada (el dueño sube 1-2 videos/semana).
- **En cada push a `main`**: lo mismo, para cambios de código/contenido.
- El paso FTP usa 3 secrets del repo: `FTP_HOST` (IP pelona o dominio, SIN ftp://),
  `FTP_USER`, `FTP_PASS` — cuenta FTP acotada a public_html. Sube SOLO diferencias
  (estado en `.ftp-deploy-sync-state.json`, bloqueado por .htaccess).
- **Guard**: `scripts/check-medios.mjs` exige 4 videos + 4 episodios en el build;
  si YouTube/Spotify no responden, NO se publica y el siguiente run reintenta.
  Escotilla de emergencia: Run workflow con "saltar_guard" (o `MIN_MEDIOS=0` local).
- El **Git de hPanel NO se usa** (su auto-deploy falla, dicho por el dueño). La rama
  `deploy` se mantiene como respaldo del botón "Desplegar" manual; si algún día se
  usa, borrar después `.ftp-deploy-sync-state.json` y `.git` de public_html.
- Respaldo local: `./scripts/deploy.sh` (build + guard + push a rama deploy).

Ramas: `main` = release (el robot construye SIEMPRE desde main) · `test-ux` = trabajo
· `deploy` = sitio construido (historial encadenado, push fast-forward).

## 2. ⚠️ El hosting se COMPARTE — cuidado

- `public_html/app/` = **subdominio con la app de finanzas del dueño** (su parte
  privada está en `mvi app privado/` FUERA de public_html). **NUNCA borrar ni
  "vaciar public_html"**. El deploy FTP no la toca (solo administra sus archivos).
- El `.htaccess` del sitio se hereda a las carpetas de subdominios → la redirección
  canónica está condicionada a `^(www\.)?amorygraciapuebla\.org$`. Mantener así.

## 3. Correo y formulario (operativos)

- SPF + DKIM (hostingermail-a) + DMARC correctos en el dominio (verificado con dig).
- `amorygracia-config.php` en la RAÍZ del hosting (fuera de public_html, chmod 600):
  contraseña de noreply@ + `RECAPTCHA_SECRET` — ambos YA puestos por el dueño.
- reCAPTCHA v3 activo: site key real en `.env.example` (pública, viaja en cada build
  automático — **cualquier PUBLIC_ nueva debe ir a .env.example, no solo al .env**).
  El backend es fail-closed: si se rota la llave, publicar la site key ANTES de
  cambiar la secret del servidor.
- Notificaciones de descargas llegan a web@; la primera cayó en spam del propio
  webmail de Hostinger (filtro de contenido, no de autenticación) — remedio: marcar
  "No es spam" + noreply@ a Contactos (dicho al dueño).

## 4. Pendientes (SOLO contenido, todos del dueño)

1. Search Console: enviar `https://amorygraciapuebla.org/sitemap-index.xml` (en curso).
2. Fotos reales (fachada, interior, Tiempos de Mesa) → GBP y /sedes/amozoc.
3. Testimonios: 2-3 citas con consentimiento (/puebla y /contacto).
4. Posts 3 y 4 (`draft: true` en src/content/blog/2026-07-01-*): publicar ~9 de julio
   (decisión SEO: espaciar), cambiando draft:false EN LOS DOS a la vez → push a main.
5. Tehuacán: dirección/horario cuando el dueño los confirme.

## 5. Decisiones que NO se deshacen sin el dueño

- Fila de YouTube del home: 4 más recientes **sin Shorts** (filtro en lib/media.ts:
  /shorts/ID → 200 = Short, 303 = video; verificado). Videos no-prédica sí entran.
- Un solo CTA de YouTube: "Ver el canal en YouTube" con `?sub_confirmation=1`
  (YouTube ofrece la suscripción al abrir; copy elegido con el dueño). Spotify no
  tiene equivalente (investigado: no existe) — su CTA queda como está.
- Colores de marca en titulares (YouTube #C21807 / Spotify #159743), hover de
  tarjetas sin translateY, subrayado ámbar del nav, sin tel: — todo igual que antes
  (ver docs/auditoria-ux-ui-2026-07-01.md y el sistema de diseño).

## 6. Trampas técnicas (además de las de siempre)

- **El PAT de git en keychain NO tiene scope `workflow`**: cualquier push que toque
  `.github/workflows/` se rechaza por HTTPS → empujar por SSH
  (`git push git@github.com:armando86mx/MviWeb.git RAMA`; la llave ~/.ssh/id_ed25519
  autentica como armando86mx).
- Cert FTP de Hostinger = `*.hstgr.io` → el paso FTP usa `security` default (loose);
  NUNCA endurecer a strict.
- RSS de YouTube intermitente (fallbacks en media.ts); Astro no escopa clases
  condicionales; Spotify da 30s de preview sin sesión; guards de build
  (placeholders/contraste/medios) tumban el build si fallan; preview de Claude:
  PORT por env, transform trick para screenshots.
- `docs/kynoz-reference/kynoz-config.php` tiene contraseñas reales, gitignored — no tocar.

## 7. Cómo retomar

```bash
pnpm dev             # desarrollo (preview: amorygracia-dev)
pnpm build           # build + guards
# publicar: normalmente NADA (el robot solo); a mano: GitHub → Actions → Run workflow
```
- Memoria persistente de Claude: se carga sola (MEMORY.md + mvi-*.md).
- Docs: DEPLOY.md (flujo FTP + respaldos), ARCHITECTURE.md, SEO-STRATEGY.md,
  design_handoff_calidez_equilibrio/SISTEMA_DE_DISENO.md (leer antes de tocar estilos).

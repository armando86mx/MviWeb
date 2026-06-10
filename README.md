# MVI Amor y Gracia — Sitio Web

Sitio web oficial de **MVI Amor y Gracia**, iglesia cristiana evangélica con sede en Amozoc, Puebla, e iglesia hija en Tehuacán.

> *"Somos enseñables. Nosotros no lo sabemos todo. Y seguimos aprendiendo día con día buscando a Dios."*
> — Pastores Daniel y Rocío Chávez

> *Somos iglesia · Hacemos iglesia · Hacemos familia*

**Dominio:** [amorygraciapuebla.org](https://amorygraciapuebla.org)

---

## Sobre el proyecto

Este repositorio contiene el código fuente del sitio web de la iglesia, construido como reemplazo del sitio anterior en WordPress. La nueva versión se construye con **Astro**, prioriza **rendimiento, seguridad, SEO y bajo costo de mantenimiento**, y está pensado para ser sostenible por una sola persona como administrador.

## Documentación principal

- **[`ARCHITECTURE.md`](./ARCHITECTURE.md)** — Documento maestro del proyecto. Contiene todas las decisiones técnicas, modelo de amenazas, sitemap, estructura, fases, sistema de descarga de recursos, copy de correos automáticos, y decisiones diferidas. **Lectura obligatoria antes de tocar código.**
- **[`SEO-STRATEGY.md`](./SEO-STRATEGY.md)** — Estrategia SEO completa: keywords priorizadas, análisis de competidores, plan de contenido de blog, estrategia GBP, backlinks, KPIs y plan de acción 90 días.
- **[`PROMPT-INICIAL-CLAUDE-CODE.md`](./PROMPT-INICIAL-CLAUDE-CODE.md)** — Prompt inicial para usar al abrir Claude Code.
- **[`docs/`](./docs/)** — Documentación complementaria: manual de identidad de MVI, materiales doctrinales (Crecer 1, 2, 3) que sirven como contenido fuente, y archivos PHP de referencia del proyecto Kynoz.
- **[`assets/brand/`](./assets/brand/)** — Recursos maestros de marca (logos en distintas variantes).

## Stack técnico

- **Framework:** Astro 5.x (último estable)
- **Lenguaje:** TypeScript estricto
- **Estilos:** CSS plano con custom properties (sin Tailwind, sin frameworks UI)
- **Backend formularios:** PHP 8.x con SMTP propio (adaptado de Kynoz)
- **Package manager:** pnpm
- **Hosting:** Hostinger (vía SSH)
- **CDN/Seguridad:** Cloudflare Free (al final del proyecto)
- **Repositorio:** GitHub
- **Newsletter:** ConvertKit (Kit) gratuito hasta 10,000 suscriptores
- **Analytics:** Google Analytics 4 + Cloudflare Web Analytics
- **Anti-bot:** reCAPTCHA v3 + honeypot + rate limiting

Detalles completos en [`ARCHITECTURE.md §4`](./ARCHITECTURE.md#4-stack-técnico-y-justificación).

## Desarrollo local

Requiere Node.js 20+ y pnpm.

```bash
# Instalar dependencias
pnpm install

# Servidor de desarrollo
pnpm dev

# Build de producción
pnpm build

# Preview del build
pnpm preview
```

El sitio estará disponible en `http://localhost:4321` durante desarrollo.

## Estructura de carpetas

```
amorygracia-web/
├── ARCHITECTURE.md              ← documento maestro
├── SEO-STRATEGY.md              ← estrategia SEO
├── PROMPT-INICIAL-CLAUDE-CODE.md
├── README.md
├── docs/                        ← documentación complementaria
│   └── kynoz-reference/         ← archivos PHP de referencia
├── assets/brand/                ← logos y recursos maestros
├── public/
│   ├── descargas/               ← PDFs de la serie Crecer
│   └── api/                     ← scripts PHP (contacto.php, descarga.php)
├── src/
│   ├── pages/                   ← rutas del sitio
│   ├── components/              ← componentes reutilizables
│   ├── content/                 ← Content Collections (blog, pilares)
│   ├── styles/                  ← CSS plano organizado por capas
│   ├── lib/                     ← helpers
│   └── assets/                  ← imágenes procesadas por Astro
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

Detalles en [`ARCHITECTURE.md §5`](./ARCHITECTURE.md#5-estructura-de-carpetas-y-convenciones).

## Deploy

Deploy por SSH a Hostinger:

```bash
# En el servidor
cd ~/amorygracia-web
git pull origin main
pnpm install
pnpm build
rsync -av --delete dist/ ~/public_html/
```

Detalles en [`ARCHITECTURE.md §7`](./ARCHITECTURE.md#7-estrategia-de-deploy-y-operación).

**Crítico:** el archivo `amorygracia-config.php` con credenciales SMTP, secret keys y API keys vive **fuera de `public_html/`** (un nivel arriba). Permisos `chmod 600`. **Nunca** versionado en GitHub.

## Seguridad

12 amenazas identificadas y sus mitigaciones detalladas en [`ARCHITECTURE.md §6`](./ARCHITECTURE.md#6-modelo-de-amenazas-y-ciberseguridad).

**Antes de cualquier código:**

- 2FA en GitHub y Hostinger.
- Llave SSH Ed25519 con passphrase.
- Dependabot y Secret Scanning activados.
- Branch protection en `main`.
- `.gitignore` correcto desde el primer commit.

## Estado del proyecto

V1 en desarrollo. Roadmap detallado en [`ARCHITECTURE.md §13`](./ARCHITECTURE.md#13-roadmap-por-fases).

La página de ofrendas está **diferida funcionalmente** (existe pero sin pasarela activa). Razones y plan en [`ARCHITECTURE.md §14.1`](./ARCHITECTURE.md#141-pasarela-de-donaciones-ofrendas--diferida).

## Contribución

Repositorio mantenido por el administrador de la iglesia con asistencia de Claude (Anthropic) en Claude Code para desarrollo. No se aceptan contribuciones externas en esta fase.

## Licencia

Código fuente: uso interno de MVI Amor y Gracia. Marca, logos, contenido doctrinal y materiales Crecer son propiedad de MVI Amor y Gracia y no pueden reproducirse sin autorización.

---

*Última actualización: abril de 2026.*

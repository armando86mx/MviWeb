# Arquitectura de Software — Sitio Web MVI Amor y Gracia

**Versión:** 2.1 (final, lista para Claude Code)
**Última actualización:** Abril 2026
**Estado:** Aprobado para implementación
**Dominio:** `amorygraciapuebla.org`

**Cambios en v2.1 vs v2.0:**
- Nueva sección §10.A: Inventario de cuentas de correo del proyecto.
- Nueva sección §10.B: Inventario de credenciales (qué pide Claude Code, cuándo, dónde vive cada una).
- §8 ampliado: aclaración sobre SPF/DKIM/DMARC para autenticación de Kit sin afectar correos de Hostinger.
- §13 ampliado: cuándo y cómo se configura la autenticación de dominio para Kit (Fase 4 y Fase 6).

---

## Índice

1. [Resumen ejecutivo](#1-resumen-ejecutivo)
2. [Identidad, voz y tono](#2-identidad-voz-y-tono)
3. [Sitemap y arquitectura de información](#3-sitemap-y-arquitectura-de-información)
4. [Stack técnico y justificación](#4-stack-técnico-y-justificación)
5. [Estructura de carpetas y convenciones](#5-estructura-de-carpetas-y-convenciones)
6. [Modelo de amenazas y ciberseguridad](#6-modelo-de-amenazas-y-ciberseguridad)
7. [Estrategia de deploy y operación](#7-estrategia-de-deploy-y-operación)
8. [Integraciones externas](#8-integraciones-externas)
9. [Sistema de descarga de recursos y newsletter](#9-sistema-de-descarga-de-recursos-y-newsletter)
10. [Formulario de contacto (PHP propio)](#10-formulario-de-contacto-php-propio)
    - [10.A. Inventario de cuentas de correo del proyecto](#10a-inventario-de-cuentas-de-correo-del-proyecto)
    - [10.B. Inventario de credenciales y cuándo se piden](#10b-inventario-de-credenciales-y-cuándo-se-piden)
11. [SEO técnico y Schema.org](#11-seo-técnico-y-schemaorg)
12. [Skills de Claude Code](#12-skills-de-claude-code)
13. [Roadmap por fases](#13-roadmap-por-fases)
14. [Decisiones diferidas](#14-decisiones-diferidas)
15. [Anexos: copy de correos](#15-anexos-copy-de-correos)
16. [Glosario y referencias](#16-glosario-y-referencias)

---

## 1. Resumen ejecutivo

### Qué es este proyecto

Sitio web oficial de **MVI Amor y Gracia**, iglesia cristiana evangélica con sede en Amozoc, Puebla, fundada en marzo de 2014 y pastoreada por el matrimonio Daniel y Rocío Chávez. El sitio reemplaza una instalación previa de WordPress que dejó de ser viable por dependencias obsoletas y problemas de mantenimiento.

### Para quién es el sitio

Tres audiencias principales, en orden de prioridad:

1. **Personas curiosas que buscan iglesia.** Visitantes en Puebla, Amozoc, Tehuacán, Cholula, Atlixco y zona metropolitana que están buscando una congregación pequeña con profundidad doctrinal.
2. **Hermanos de otras iglesias o cobertura ministerial.** Pastores, líderes y miembros de iglesias hermanas (incluyendo MVI Internacional como cobertura, y la iglesia hija en Tehuacán) que quieren conectarse, compartir recursos o referir personas.
3. **Personas que consumen contenido por YouTube/redes sociales.** Audiencia más amplia (todo el estado de Puebla y más allá) que sigue al ministerio digitalmente y eventualmente puede animarse a visitar.

### Ubicaciones físicas reales

- **Sede principal en Amozoc, Puebla:** servicios dominicales (10:30 AM estudio, 11:00 AM servicio completo) + Tiempos de Mesa los jueves a las 7:30 PM en casa de la familia Jiménez.
- **Iglesia hija en Tehuacán, Puebla:** con su propio liderazgo local pero gestionada desde el sitio principal.
- **Puebla capital:** NO hay sede física, pero estratégicamente capturamos audiencia de búsqueda local con una página `/puebla` honesta que explica que la sede está en Amozoc (área metropolitana).

### Qué hace distintivo a este sitio

A diferencia de la mayoría de sitios de iglesias evangélicas, este proyecto se diseña explícitamente para **transmitir profundidad, no espectáculo**. La identidad central de Amor y Gracia se resume en la frase pastoral:

> *"Somos enseñables. Nosotros no lo sabemos todo. Y seguimos aprendiendo día con día buscando a Dios."*
> — Pastores Daniel y Rocío Chávez

Y el lema institucional: **"Somos iglesia · Hacemos iglesia · Hacemos familia"**.

El sitio se construye en torno a estos dos ejes y debe sentirse como **una invitación honesta a una mesa, pequeña pero abundante**, no como una vitrina de programas o una mega-iglesia.

### Restricciones del proyecto

- **Equipo técnico: una sola persona** (el administrador), no desarrollador de profesión, que aprende código por lógica y prefiere entregables completos listos para usar.
- **Stack actual del administrador:** Hostinger con SSH ya configurado, cuenta de GitHub existente con varios repos previos, dominio `amorygraciapuebla.org` ya adquirido, correo `contacto@amorygraciapuebla.org` ya configurado en Hostinger.
- **Cloudflare** disponible para activar al final del proyecto.
- **Costo recurrente esperado:** $0 adicional al hosting actual.

### Criterios de éxito

1. **Carga rápida en celular.** La mayoría de los visitantes accederán desde móvil con conexión modesta. Meta: First Contentful Paint < 1.5s, LCP < 2.5s.
2. **Cero costo recurrente** más allá del dominio y hosting actual.
3. **Cero dependencia de WordPress, plugins o CMS con admin público.**
4. **Sitio accesible** (WCAG AA mínimo).
5. **Mantenible por una sola persona.**
6. **Resistente a las amenazas de ciberseguridad** identificadas en §6.
7. **Optimizado para SEO local** en todo el estado de Puebla (ver SEO-STRATEGY.md).

---

## 2. Identidad, voz y tono

### Paleta de colores (Manual de Identidad MVI)

| Color | Hex | Uso |
|-------|-----|-----|
| Azul claro brand | `#6699FF` | Acentos, links, destacados ligeros |
| Azul deep brand | `#133299` | Color principal, headers, CTAs |
| Morado brand | `#9933CC` | **Evitar.** Genera contraste pobre y rompe el tono institucional |
| Negro suave | `#1A1A1A` | Texto principal sobre fondo claro |
| Blanco roto | `#FAFAFA` | Fondo principal |
| Gris medio | `#666666` | Texto secundario, metadatos |
| Gris claro | `#E5E5E5` | Bordes, separadores |

### Tipografía

| Familia | Uso | Por qué |
|---------|-----|---------|
| **Fraunces** (Google Fonts) | Display, headings, citas pastorales | Tipografía editorial moderna con personalidad serif. Soporta italic para acentos cálidos. |
| **Geist** (Google Fonts) | Body, párrafos, navegación | Sans-serif técnica, excelente legibilidad en pantalla. |
| **Geist Mono** | Datos puntuales, fechas, versículos referenciados | Familia complementaria para microtipografía. |

Carga vía Google Fonts con `font-display: swap` para no bloquear renderizado.

### Voz

- **Cálida pero no empalagosa.** Reflejo de los pastores: cálidos por naturaleza, sin falsa familiaridad.
- **Reverente sin ser pomposa.** Lenguaje contemporáneo, no castellano antiguo ni "religioso de plantilla".
- **Honesta sobre el tamaño.** No fingir ser más grande. Frases como *"somos pocos, y eso nos permite conocernos profundamente"* son bienvenidas.
- **Bíblicamente seria.** En "Lo que creemos" el lenguaje refleja la profundidad teológica de los materiales Crecer.
- **Sin victimismo.** La situación del local, las dificultades pasadas y otras tensiones internas **no se ventilan en el sitio público**.
- **Spanish from Mexico.** Tuteo natural, sin neutralidad latinoamericana forzada, sin localismos chilangos.

### Tono según sección

- **Inicio / Hero:** evocador, breve, invitacional. Versículo de cabecera alineado al énfasis escatológico de la iglesia (Mateo 24:42, Apocalipsis 22:20, Tito 2:13, o el que los pastores prefieran).
- **Nosotros / Historia:** narrativo, primera persona plural, basado en la nota de la pastora del 4 de marzo de 2025 sobre el origen en marzo 2014.
- **Lo que creemos:** estructurado en torno a los **5 pilares de Crecer 3** (intimidad en adoración, enseñanza, comunión, oración, partimiento del pan). Cada pilar con su versículo y un párrafo. Página pillar de SEO doctrinal.
- **Cómo nos reunimos:** práctico, información concreta. Placeholders elegantes para datos pendientes.
- **Recursos:** descriptivo, generoso. La serie Crecer ofrecida con email gate.
- **Conoce a nuestros pastores:** humano, específico. Aquí va literal *"somos enseñables"*.

### Pieza visual de "Tiempo de Mesa"

La pieza gráfica de Tiempo de Mesa (estilo cálido marrón/vino) **se mantiene tal cual** dentro de la card del evento. No forzarla a la paleta azul institucional. La iglesia opera con dos registros visuales: institucional (azul cobalto) y temático/cálido (eventos puntuales). El sitio vive en el primero pero respeta el segundo.

---

## 3. Sitemap y arquitectura de información

### Páginas principales

```
/                                Inicio
├── /nosotros                    Quiénes somos, historia, pastores
├── /lo-que-creemos              Los 5 pilares + declaración de fe
├── /como-nos-reunimos           Domingos, Tiempos de Mesa, convivencias
├── /visitanos                   Qué esperar tu primera visita (FAQ con schema)
├── /puebla                      Landing geográfica honesta para Puebla capital
├── /sedes/
│   ├── /amozoc                  Sede principal real
│   └── /tehuacan                Iglesia hija
├── /recursos                    Landing con tarjetas + botón único de descarga
│   ├── /recursos/crecer-1       Página informativa SEO
│   ├── /recursos/crecer-2       Página informativa SEO
│   ├── /recursos/crecer-3       Página informativa SEO
│   └── /recursos/descargar      Página/modal con formulario de descarga
├── /blog                        Listado de artículos
│   └── /blog/[slug]             Artículo individual
├── /podcast                     Listado de prédicas + embed YouTube
├── /contacto                    Formulario, redes
├── /ofrendas                    Página existe, funcionalidad diferida (ver §14)
├── /aviso-de-privacidad         Texto legal LFPDPPP
├── /terminos                    Términos de uso
└── /404                         Página de error elegante
```

### Navegación principal (header)

Máximo 5-6 ítems para no saturar:

```
[Logo]   Nosotros · Lo que creemos · Reuniones · Recursos · Blog · Contacto
```

"Podcast", "Ofrendas" (cuando se active) y páginas legales viven en el footer. La estructura de sedes se accede desde "Cómo nos reunimos" o desde la home.

### Footer

```
Columna 1: Logo blanco + lema "Somos iglesia · Hacemos iglesia · Hacemos familia"
Columna 2: Sitemap (links rápidos)
Columna 3: Redes sociales (Facebook, Instagram, YouTube cuando se confirmen)
Columna 4: Contacto breve (contacto@amorygraciapuebla.org + WhatsApp si aplica)
Banda inferior: Aviso de privacidad · Términos · Copyright año actual
```

### Flujos clave del usuario

**Flujo 1 — Visitante nuevo busca iglesia en Puebla:**
Inicio → Lo que creemos → Cómo nos reunimos → Visítanos → Contacto

**Flujo 2 — Hermano de otra iglesia investiga doctrina:**
Inicio → Lo que creemos → Recursos (descarga la serie Crecer) → Blog

**Flujo 3 — Persona en Puebla capital:**
Inicio → /puebla → Sedes/Amozoc (cómo llegar) → Visítanos

**Flujo 4 — Persona en Tehuacán:**
Inicio → Sedes/Tehuacan → Contacto

**Flujo 5 — Familiar lejano sigue actividades:**
Inicio → Blog → Podcast → Redes sociales

---

## 4. Stack técnico y justificación

### Decisión final: Astro + HTML/CSS/JS plano + PHP propio para formularios

| Capa | Tecnología | Por qué |
|------|-----------|---------|
| **Framework** | Astro 5.x (último estable) | Generación estática, casi cero JS en producción, soporte Markdown nativo |
| **Lenguaje** | TypeScript estricto | Catch errors en compile time |
| **Estilos** | CSS plano con custom properties | Sin Tailwind, sin frameworks UI. Más control, menor superficie, más mantenible |
| **JS** | Vanilla (ES2020+) | Solo donde sea estrictamente necesario |
| **Runtime** | Node.js 20 LTS o 22 LTS | NO 18 (cerca de EOL) |
| **Package manager** | pnpm | Lockfile estricto, más rápido que npm |
| **Backend formularios** | PHP 8.x con SMTP propio | Adaptación del `mail.php` de Kynoz |
| **Markdown blog** | Astro Content Collections + Zod | Validación de frontmatter |
| **Hosting** | Hostinger (ya contratado) | Soporta SSH, PHP, SMTP |
| **CDN/Seguridad** | Cloudflare Free (al final) | DDoS protection, SSL, Web Analytics |
| **DNS** | Cloudflare (al migrar) | Para configurar SPF/DKIM/DMARC |

### Por qué Astro y no otras opciones

| Criterio | HTML plano | **Astro** ✅ | Next.js | WordPress |
|----------|-----------|--------------|---------|-----------|
| Bundle producción | ~50-200 KB | ~100-200 KB | ~400+ KB | Variable |
| Tiempo primer render | Instantáneo | Casi instantáneo | 1-3 seg | Depende |
| Dependencias prod | 0 | Pocas | Cientos | + plugins |
| Markdown blog nativo | No | Sí | Con config | Con plugin |
| SEO out-of-the-box | Excelente | Excelente | Requiere SSR | Bueno |
| Curva mantenimiento | Baja | Media | Alta | Alta |
| Permite islas React | No | **Sí** | N/A | No |
| Riesgo supply chain | Mínimo | Bajo | Medio-alto | Alto |

### Dependencias permitidas (lista corta y auditada)

| Paquete | Uso | Justificación |
|---------|-----|---------------|
| `astro` | Framework base | — |
| `@astrojs/sitemap` | Sitemap.xml automático | SEO técnico |
| `@astrojs/rss` | Feed RSS del blog | SEO + accesibilidad |
| `astro-seo` o helpers propios | Tags SEO consistentes | Manejo unificado de meta tags |
| `remark-*` esenciales | Procesar Markdown | Built-in de Astro |

**Prohibido sin justificación explícita y discusión:**
- React, Vue, Svelte como dependencia global del sitio (solo islas puntuales si fuera necesario).
- Tailwind CSS (preferimos CSS plano con variables).
- UI libraries (shadcn, MUI, Chakra).
- Cualquier analytics que requiera cookies invasivas más allá de GA4 (que ya está contemplado con consent banner).

---

## 5. Estructura de carpetas y convenciones

### Árbol completo del proyecto

```
amorygracia-web/                    ← raíz del repo (en GitHub)
│
├── ARCHITECTURE.md                 ← este documento
├── SEO-STRATEGY.md                 ← plan operativo SEO
├── PROMPT-INICIAL-CLAUDE-CODE.md   ← prompt para Claude Code
├── README.md                       ← descripción del proyecto
├── .gitignore                      ← excluye node_modules, .env, dist, etc.
├── .env.example                    ← plantilla de variables de entorno
│
├── docs/                           ← documentación complementaria
│   ├── manual-identidad.pdf
│   ├── crecer-1.pdf
│   ├── crecer-2.pdf
│   ├── crecer-3.pdf
│   └── kynoz-reference/            ← archivos PHP de referencia
│       ├── mail.php
│       └── kynoz-config.php
│
├── assets/                         ← recursos maestros (no procesados por Astro)
│   └── brand/
│       ├── mvi-logo-color.jpg
│       ├── mvi-logo-white.jpg
│       └── mvi-isotipo-color.png
│
├── package.json
├── pnpm-lock.yaml                  ← lockfile, debe versionarse
├── astro.config.mjs                ← config de Astro
├── tsconfig.json                   ← TypeScript estricto
│
├── public/                         ← archivos servidos tal cual
│   ├── favicon.svg
│   ├── favicon-32.png
│   ├── apple-touch-icon.png
│   ├── robots.txt
│   ├── descargas/                  ← PDFs públicos
│   │   ├── crecer-1.pdf
│   │   ├── crecer-2.pdf
│   │   └── crecer-3.pdf
│   └── api/                        ← scripts PHP (servidos por Hostinger Apache/PHP)
│       ├── contacto.php            ← adaptado de mail.php de Kynoz
│       └── descarga.php            ← variante para descarga de recursos
│
└── src/
    ├── pages/                      ← rutas (file-based routing de Astro)
    │   ├── index.astro
    │   ├── nosotros.astro
    │   ├── lo-que-creemos.astro
    │   ├── como-nos-reunimos.astro
    │   ├── visitanos.astro
    │   ├── puebla.astro
    │   ├── contacto.astro
    │   ├── ofrendas.astro
    │   ├── aviso-de-privacidad.astro
    │   ├── terminos.astro
    │   ├── 404.astro
    │   ├── sedes/
    │   │   ├── amozoc.astro
    │   │   └── tehuacan.astro
    │   ├── recursos/
    │   │   ├── index.astro
    │   │   ├── crecer-1.astro
    │   │   ├── crecer-2.astro
    │   │   ├── crecer-3.astro
    │   │   └── descargar.astro
    │   ├── blog/
    │   │   ├── index.astro
    │   │   └── [...slug].astro
    │   └── podcast/
    │       └── index.astro
    │
    ├── components/                 ← componentes reutilizables
    │   ├── layout/
    │   │   ├── Header.astro
    │   │   ├── Footer.astro
    │   │   ├── BaseLayout.astro
    │   │   └── BlogLayout.astro
    │   ├── sections/
    │   │   ├── Hero.astro
    │   │   ├── PilaresGrid.astro
    │   │   ├── EventoCard.astro
    │   │   ├── PastoresCard.astro
    │   │   ├── CTABand.astro
    │   │   └── CookieBanner.astro
    │   ├── ui/
    │   │   ├── Button.astro
    │   │   ├── Card.astro
    │   │   ├── Badge.astro
    │   │   └── ScriptureQuote.astro
    │   ├── forms/
    │   │   ├── ContactForm.astro
    │   │   └── DownloadForm.astro
    │   ├── seo/
    │   │   ├── SchemaChurch.astro
    │   │   ├── SchemaEvent.astro
    │   │   ├── SchemaArticle.astro
    │   │   └── SchemaFAQ.astro
    │   └── youtube/
    │       └── YouTubeEmbed.astro
    │
    ├── content/                    ← Content Collections de Astro
    │   ├── config.ts               ← schemas Zod
    │   ├── blog/
    │   │   └── *.md
    │   └── pilares/
    │       └── *.md                ← los 5 pilares como contenido estructurado
    │
    ├── styles/                     ← CSS plano organizado por capas
    │   ├── tokens.css              ← variables: colores, tipografías, espaciados
    │   ├── reset.css               ← reset moderno mínimo
    │   ├── base.css                ← tipografía base, links, headings
    │   ├── utilities.css           ← helpers (.sr-only, .container, etc.)
    │   └── global.css              ← importa los anteriores
    │
    ├── lib/                        ← helpers TypeScript
    │   ├── seo.ts
    │   ├── dates.ts
    │   ├── youtube.ts
    │   └── analytics.ts
    │
    └── assets/                     ← recursos procesados por Astro (optimizados)
        ├── logos/
        ├── images/
        └── icons/
```

### Convenciones de nombrado

- **Páginas:** kebab-case en español (`lo-que-creemos.astro`, `como-nos-reunimos.astro`).
- **Componentes Astro:** PascalCase (`Hero.astro`, `PastoresCard.astro`).
- **Variables CSS:** kebab-case con prefijo `--` (`--color-azul-deep`).
- **Variables JS/TS:** camelCase.
- **Constantes:** UPPER_SNAKE_CASE.
- **Archivos de blog:** kebab-case opcional con fecha (`2026-04-28-titulo-del-post.md`).

### Convenciones de Git

- **Rama principal:** `main`.
- **Ramas de feature:** `feature/nombre-de-feature`.
- **Commits:** mensaje en español, primera línea < 72 caracteres.
- **Branch protection en GitHub:** `main` no admite push directo. Solo merge desde Pull Request.

### Variables de entorno

Archivo `.env` excluido de Git, plantilla pública en `.env.example`:

```bash
# .env.example
PUBLIC_SITE_URL=https://amorygraciapuebla.org
PUBLIC_RECAPTCHA_SITE_KEY=                  # reCAPTCHA v3 site key (público)
PUBLIC_KIT_FORM_ID=                         # ID del formulario de Kit (público)
PUBLIC_GA4_MEASUREMENT_ID=                  # G-XXXXXXXXXX
PUBLIC_YOUTUBE_CHANNEL_ID=                  # ID del canal cuando exista
PUBLIC_YOUTUBE_API_KEY=                     # Restringida por dominio
```

Variables prefijadas con `PUBLIC_` son expuestas al cliente. **Cualquier secreto real (sin `PUBLIC_`) jamás debe terminar en código de cliente.** Las credenciales SMTP, secret keys de reCAPTCHA y API keys privadas viven en el config PHP fuera de `public_html/`.

---

## 6. Modelo de amenazas y ciberseguridad

### Identificación de amenazas

12 vectores de ataque relevantes para este proyecto:

#### 6.1 Cuenta de GitHub comprometida

**Riesgo:** alguien obtiene acceso y modifica el código (phishing, redirección, malware).

**Mitigaciones obligatorias:**
- 2FA con app autenticadora (Authy, Google Authenticator, 1Password). **No SMS** (vulnerable a SIM swapping).
- Contraseña única gestionada con gestor de contraseñas.
- Branch protection en `main`: solo merge desde PR.
- Revisión periódica de "Authorized OAuth Apps" y "Sessions".
- GitHub Secret Scanning activado.

#### 6.2 Llaves SSH robadas

**Mitigaciones obligatorias:**
- Llave SSH **Ed25519 con passphrase**: `ssh-keygen -t ed25519 -C "email@ejemplo.com"`.
- Uso de `ssh-agent` para no teclear passphrase todo el día.
- Permisos: `chmod 600 ~/.ssh/id_ed25519`.
- Llaves separadas por servicio (GitHub vs Hostinger) si es factible.

#### 6.3 Dependencias maliciosas (supply chain)

**Mitigaciones obligatorias:**
- Lockfile (`pnpm-lock.yaml`) versionado.
- **Dependabot activado** (gratis): alertas + PR automáticos.
- `pnpm audit` antes de cada deploy.
- Minimizar dependencias (lista corta en §4).
- Antes de instalar paquete nuevo: revisar popularidad, mantenedor, último commit.

#### 6.4 Hostinger comprometido

**Mitigaciones obligatorias:**
- 2FA en Hostinger.
- Deshabilitar FTP, usar solo SFTP/SSH.
- Contraseña robusta del hPanel.
- Acceso SSH solo por llave (deshabilitar password auth cuando sea posible).
- Verificación periódica: el sitio en producción debe ser idéntico al `dist/` generado desde `main`.

#### 6.5 Credenciales en código del servidor

**Riesgo:** las credenciales SMTP, secret keys de reCAPTCHA, etc., están en archivos PHP. Si alguien accede al servidor las lee.

**Aclaración importante:** las credenciales en `kynoz-config.php` (y su equivalente para Amor y Gracia) **están en texto plano, NO encriptadas**. La protección viene de **dónde está el archivo**, no de su contenido.

**Mitigaciones obligatorias:**
- Archivo de credenciales **fuera de `public_html/`** (ej. `/home/usuario/amorygracia-config.php`), un nivel arriba. Apache no lo sirve nunca por web.
- Permisos: `chmod 600` (solo el dueño puede leerlo).
- **NUNCA** este archivo en GitHub. Verificar `.gitignore` desde el primer commit.
- Si se sospecha exposición: rotar contraseñas SMTP y reCAPTCHA secret inmediatamente.
- 2FA + SSH key en Hostinger como protección de acceso.

#### 6.6 Inyección en formularios

**Mitigaciones obligatorias (implementadas en el PHP):**
- Sanitización de inputs (`htmlspecialchars`, `strip_tags`, prevención de CRLF injection).
- **reCAPTCHA v3** validación server-side (fail closed: si falla la verificación, se rechaza).
- **Honeypot field** invisible al usuario (los bots lo llenan, los humanos no).
- **Rate limiting** por IP: 5-10 minutos en formulario de contacto, 60 segundos en formulario de descarga.
- Validación estricta de cada campo (formato email, longitud mínima/máxima).
- Headers de seguridad: `Content-Type: application/json; charset=utf-8`, `X-Content-Type-Options: nosniff`.
- `Access-Control-Allow-Origin` específico al dominio (no wildcard).

#### 6.7 Phishing en página de ofrendas (cuando se active)

**Mitigaciones (cuando se active la pasarela):**
- **Nunca procesar tarjetas en nuestro servidor.** Usar Mercado Pago / Stripe.
- HTTPS obligatorio (Cloudflare lo da gratis).
- Comunicar dominio oficial en redes sociales y sitio.
- Subdomain segregation a futuro: `donar.amorygraciapuebla.org` puede apuntar directo.
- Domain monitoring (Cloudflare ofrece) para detectar typosquatting.

#### 6.8 Defacement del sitio

**Mitigaciones obligatorias:**
- Sitio 100% estático para todo lo público (excepto los dos scripts PHP).
- Sin admin público (no WordPress, no panel de control accesible).
- Backup automático: snapshot diario del repo (GitHub) + snapshot semanal de `public_html/` en Hostinger.
- Plan de restauración rápida documentado.

#### 6.9 DDoS y abuso de recursos

**Mitigación principal:**
- **Cloudflare Free** delante del sitio. Tier gratuito incluye protección DDoS empresarial, mitigación de bots, y caching agresivo.

#### 6.10 Robo de información de visitantes

**Mitigaciones obligatorias:**
- **Minimizar recolección de datos:** solo lo necesario (nombre, apellido, correo en formulario de descarga; nombre, correo, mensaje en contacto).
- **No almacenar nada en BD propia.** Formulario de contacto manda email directo, no se guarda. Descargas registran tag en Kit (servicio externo).
- Aviso de privacidad claro (LFPDPPP).
- **GA4 con anonimización de IP** + **consent banner** que cumpla LFPDPPP.
- **Cloudflare Web Analytics** complementario (sin cookies, sin datos personales).

#### 6.11 Secrets expuestos en repo

**Mitigaciones obligatorias:**
- `.gitignore` riguroso desde el primer commit: `node_modules/`, `dist/`, `.env`, `.env.local`, `.DS_Store`, `*.log`, `*.config.php`.
- GitHub Secret Scanning activado.
- Pre-commit hook con `gitleaks` (opcional pero recomendado).
- Si se filtra un secreto: rotar la credencial INMEDIATAMENTE (borrarlo del próximo commit no es suficiente, el historial conserva todo).

#### 6.12 Suplantación de correo

**Mitigaciones obligatorias (a nivel DNS):**
- **SPF, DKIM, DMARC** configurados en DNS al activar Cloudflare.
- DMARC en `p=quarantine` o `p=reject` después de probar en `p=none`.
- **Crítico** para evitar que estafadores manden emails como `@amorygraciapuebla.org`.

### Vectores descartados por bajo riesgo

- **SQL Injection:** no aplica, sin BD propia.
- **XSS en contenido user-generated:** mitigado, todo el contenido lo escribimos nosotros.
- **Privilege escalation:** no hay sistema de usuarios.
- **SSRF:** no hay backend que haga peticiones a URLs externas controlables por usuario.

### Checklist de hardening previo (Fase 0.5)

Antes de escribir una línea de código:

- [ ] 2FA en GitHub con app autenticadora.
- [ ] 2FA en Hostinger.
- [ ] Llave SSH Ed25519 con passphrase generada.
- [ ] Gestor de contraseñas configurado (Bitwarden, 1Password).
- [ ] Branch protection rule en `main` del repo.
- [ ] GitHub Secret Scanning activado.
- [ ] `.gitignore` correcto desde el primer commit.

---

## 7. Estrategia de deploy y operación

### Flujo de trabajo

```
┌──────────────┐     ┌──────────┐     ┌──────────────┐     ┌──────────────┐
│ Desarrollo   │ ──▶ │  GitHub  │ ──▶ │  Hostinger   │ ──▶ │  Cloudflare  │
│ (local)      │     │  (main)  │     │  (SSH pull)  │     │  (CDN+DDoS)  │
└──────────────┘     └──────────┘     └──────────────┘     └──────────────┘
   pnpm dev          git push          git pull              activación
   pnpm build        + PR review       pnpm install          al final
                                       pnpm build
```

### Setup en Hostinger

1. SSH al servidor.
2. Clonar el repo en una carpeta dentro de `~`, **no directo en `public_html/`**:
   ```bash
   cd ~
   git clone git@github.com:USUARIO/amorygracia-web.git
   cd amorygracia-web
   pnpm install
   pnpm build
   ```
3. Copiar contenido de `dist/` a `public_html/`:
   ```bash
   rsync -av --delete dist/ ~/public_html/
   ```
4. Verificar que los scripts PHP en `public_html/api/` tengan permisos correctos (644).
5. **Crear archivo de credenciales fuera de raíz:**
   ```bash
   cd ~
   nano amorygracia-config.php   # editar con credenciales reales
   chmod 600 amorygracia-config.php
   ```

### Cloudflare (Fase 6, lanzamiento)

1. Crear cuenta gratuita.
2. Agregar dominio `amorygraciapuebla.org`.
3. Cambiar nameservers en el registrador.
4. Esperar propagación (24-48h).
5. Activar:
   - SSL/TLS modo "Full (Strict)".
   - "Always Use HTTPS" ON.
   - "Automatic HTTPS Rewrites" ON.
   - **Cloudflare Web Analytics** (privacy-first).
   - Page Rules de caching para assets estáticos.
6. Configurar registros SPF, DKIM, DMARC en DNS.

### Backups

- **Repositorio en GitHub:** ya es backup en sí mismo.
- **Hostinger:** función de backups del hPanel (semanales mínimo).
- **Backup adicional (opcional):** mirror del repo a GitLab o Codeberg.

### Monitoreo

- **UptimeRobot** (gratis): ping cada 5 min, alerta por email si cae.
- **Cloudflare Analytics:** vistas, tráfico, ataques bloqueados.
- **Google Search Console:** indexación, errores, rendimiento de búsqueda.
- **GA4:** comportamiento de usuarios, conversiones.

---

## 8. Integraciones externas

### YouTube Data API v3

**Propósito:** mostrar automáticamente los videos del canal en `/podcast`.
**Costo:** gratis (cuota diaria 10,000 unidades).
**Setup:**
1. Crear API key en Google Cloud Console.
2. Activar YouTube Data API v3.
3. Restringir key por dominio (HTTP referrer: `*.amorygraciapuebla.org/*`).
4. Guardar en `.env` como `PUBLIC_YOUTUBE_API_KEY`.
5. Build-time fetching: Astro hace la llamada en build, key nunca expuesta al navegador.

### ConvertKit (Kit) — Newsletter y secuencias

**Propósito:** gestión de suscriptores, secuencias automáticas de seguimiento.
**Plan:** gratuito hasta 10,000 suscriptores, sin marca de agua.
**Setup:**
1. Crear cuenta en `kit.com`.
2. Crear formulario "Newsletter Amor y Gracia".
3. Crear secuencia "Bienvenida tras descarga Crecer" (ver §15).
4. Obtener API key de Kit y guardarla en config PHP fuera de raíz.
5. El script PHP `descarga.php` llama a la API de Kit cuando alguien descarga.
6. **Autenticación de dominio (importante, ver explicación abajo).**

#### Autenticación de dominio para Kit (SPF/DKIM/DMARC)

**Por qué es necesario:** Kit envía correos como si fueran del dominio `amorygraciapuebla.org` (ej. `hola@amorygraciapuebla.org`), pero técnicamente salen de los servidores de Kit, no de Hostinger. Sin autenticación, Gmail/Outlook marcan esos correos como spam o phishing porque no pueden verificar que Kit tenga permiso de enviar en nombre del dominio.

**Cómo funciona la solución:**
- En el DNS del dominio se agregan registros SPF, DKIM y DMARC que **autorizan a Kit como emisor adicional**, sin afectar los emisores existentes (Hostinger).
- SPF es **aditivo, no exclusivo**: un mismo registro puede autorizar a múltiples servicios simultáneamente. Ejemplo:
  ```
  v=spf1 include:_spf.hostinger.com include:mail.kit.com ~all
  ```
  Esto autoriza a Hostinger Y a Kit a enviar correos como @amorygraciapuebla.org.
- DKIM usa "selectores" distintos por servicio. Hostinger tiene su selector (típicamente `default`), Kit nos dará el suyo (típicamente `k1` o similar). Conviven sin conflicto.
- DMARC unifica la política de validación.

**Importante:** **NO afecta los correos de Hostinger.** Los correos `contacto@`, `noreply@` y `ofrendas@` siguen funcionando exactamente igual (envío y recepción). Solo agregamos a Kit como emisor autorizado adicional.

**Cuándo se hace:** en la **Fase 4 (Integraciones)** se obtienen los registros que Kit nos pide agregar. En la **Fase 6 (Cloudflare y lanzamiento)** se aplican definitivamente al migrar el DNS a Cloudflare.

**Mientras tanto:** Kit puede funcionar sin autenticación custom, pero los correos pueden caer más en spam. La autenticación es el "sello de calidad" que mejora la entregabilidad.

### Google Analytics 4 + Cloudflare Web Analytics

**Combinación complementaria:**
- **GA4:** datos detallados (dispositivos, ubicación, fuentes, conversiones). Requiere consent banner (LFPDPPP).
- **Cloudflare Web Analytics:** datos agregados sin cookies, sin datos personales. Backup privacy-first.

**Consent banner:** debe permitir rechazar GA4 y el sitio sigue funcionando. Cloudflare Analytics se mantiene siempre activo (no requiere consentimiento al no usar cookies).

### Google reCAPTCHA v3

**Propósito:** anti-bot en formularios.
**Setup:**
1. Crear sitio en `google.com/recaptcha/admin/create`.
2. Tipo: reCAPTCHA v3.
3. Dominios: `amorygraciapuebla.org`, `www.amorygraciapuebla.org`.
4. Site key (público) → `.env` como `PUBLIC_RECAPTCHA_SITE_KEY`.
5. Secret key (privado) → config PHP fuera de raíz.
6. Threshold mínimo de score: 0.5 (rechaza si es menor).

### Mercado Pago (diferido — ver §14)

No se integra en V1. La página `/ofrendas` existe con mensaje informativo solamente.

---

## 9. Sistema de descarga de recursos y newsletter

### Visión general

Sistema de captura de leads vía **email gate** para descargar la serie Crecer. **No requiere cuentas de usuario.** Un solo formulario, un solo correo principal, tres botones de descarga en el correo, y secuencia automática de seguimiento bifurcada según comportamiento.

### Página `/recursos`

```
Hero: "Recursos para crecer en la fe"

[Tarjeta 1: Crecer 1 — Fundamentos]
  Descripción del contenido
  [Link: Conocer más] → /recursos/crecer-1

[Tarjeta 2: Crecer 2 — Hábitos del discípulo]
  Descripción del contenido
  [Link: Conocer más] → /recursos/crecer-2

[Tarjeta 3: Crecer 3 — La iglesia que crece]
  Descripción del contenido
  [Link: Conocer más] → /recursos/crecer-3

──────────────────────────────────────────

[BOTÓN ÚNICO: Descargar la serie Crecer completa]
  Texto: "Recibe los tres niveles en tu correo"
```

Las tarjetas son **informativas, no descargables**. Un solo botón al final.

### Páginas individuales de Crecer

`/recursos/crecer-1`, `/recursos/crecer-2`, `/recursos/crecer-3`: **páginas SEO** con:
- Descripción amplia del nivel (600-800 palabras).
- Versículos clave que aborda.
- Quién se beneficia de leerlo.
- CTA final: "Descargar la serie Crecer completa" → mismo formulario único.

Cada página ataca keywords específicas (ver SEO-STRATEGY.md).

### Página/modal `/recursos/descargar`

**Formulario:**
```
Nombre*       [____________]
Apellido*     [____________]
Correo*       [____________]

[Honeypot oculto]
[reCAPTCHA v3 invisible]

[BOTÓN: Enviar a mi correo]
```

**Validaciones:**
- Nombre: 2-50 caracteres, solo letras y espacios.
- Apellido: idem.
- Correo: formato válido + filtro de dominios temporales conocidos.

### Flujo técnico

```
1. Usuario llena formulario en /recursos/descargar
2. Submit → POST a /api/descarga.php
3. PHP valida:
   - reCAPTCHA v3 (score >= 0.5)
   - Honeypot vacío
   - Rate limit (60 segundos por IP)
   - Sanitización de inputs
4. PHP ejecuta en paralelo:
   a. Envía email principal vía SMTP (noreply@amorygraciapuebla.org)
   b. Llama a API de Kit:
      - Crea/actualiza subscriber con nombre + apellido + correo
      - Aplica tag "descargo-serie-crecer"
      - NO suscribe al newsletter aún
5. PHP responde JSON al frontend
6. Frontend muestra: "¡Listo! Revisa tu correo en los próximos minutos.
                      Si no llega, revisa tu carpeta de spam."
```

### Flujo de seguimiento (Kit automatizaciones)

```
DÍA 0 ─ Persona descarga la serie Crecer
        ├── Tu PHP envía email principal (3 botones de descarga + invitación al newsletter)
        └── Kit aplica tag "descargo-serie-crecer"

DÍA 1 ─ Kit chequea: ¿tiene tag "newsletter-suscriptor"?
        │
        ├── SÍ está suscrita
        │   └── Email de seguimiento Rama A (ver §15)
        │       Conversación pastoral, sin enlaces de descarga
        │
        └── NO está suscrita
            └── Email recordatorio Rama B (ver §15)
                "Recuerda que sigue abierta la invitación al boletín"
                Botón único: suscribirse al newsletter

DÍA 8 (+1 semana) ─ Si NO se suscribió todavía
        └── Segundo recordatorio amable

DÍA 38 (+1 mes) ─ Si NO se suscribió todavía
        └── Última invitación, después silencio total

(En cualquier momento que se suscriba, la secuencia se detiene
 y entra al flujo normal del newsletter.)
```

Si el usuario nunca se suscribe, queda en Kit con tag `descargo-serie-crecer · no-suscrito`. Disponible para campañas puntuales futuras (no automatizadas).

### Acceso a los PDFs

- **Ubicación:** `/public/descargas/crecer-1.pdf`, `crecer-2.pdf`, `crecer-3.pdf`.
- **URLs públicas pero no publicitadas:** `https://amorygraciapuebla.org/descargas/crecer-1.pdf`.
- **No publicitadas en el sitio:** el único camino para conocerlas es vía el correo recibido.
- **No protegidas con tokens:** si alguien comparte la URL, otro puede descargar. Esto es **aceptable**: es contenido evangelístico, su propósito es difundirse. El email gate es para captura de leads, no protección de IP.

### Métricas

- **Cloudflare Analytics:** cuenta accesos a `/descargas/crecer-1.pdf`, etc.
- **Kit:** cuenta clicks en cada botón del correo principal (Crecer 1, 2, 3 individualmente).
- **GA4:** conversiones (eventos de submit del formulario).

---

## 10. Formulario de contacto (PHP propio)

### Visión general

Formulario de contacto en `/contacto` procesado por script PHP propio adaptado del `mail.php` de Kynoz (ver `docs/kynoz-reference/`). Usa SMTP de Hostinger, reCAPTCHA v3, honeypot y rate limiting.

### Diferencias con Kynoz

| Aspecto | Kynoz | Amor y Gracia |
|---------|-------|---------------|
| Idiomas | EN/ES toggle | Solo ES |
| Campos | nombre, email, teléfono, empresa, servicio, mensaje | nombre, apellido, email, teléfono (opcional), motivo, mensaje |
| Domain | kynozdigital.com | amorygraciapuebla.org |
| Rate limit | 60 segundos | **5-10 minutos** |
| MAIL_TO | contacto@kynozdigital.com | contacto@amorygraciapuebla.org |
| NOREPLY | noreply@kynozdigital.com | noreply@amorygraciapuebla.org |

### Campos del formulario `/contacto`

```
Nombre*           [____________]
Apellido*         [____________]
Correo*           [____________]
Teléfono          [____________]   (opcional)
Motivo*           [Visita / Oración / Consulta pastoral / Otro]
Mensaje*          [____________]
                  [____________]
                  [____________]

[Honeypot oculto]
[reCAPTCHA v3 invisible]

[BOTÓN: Enviar mensaje]
```

### Estructura de archivos PHP

```
/home/usuario/                         ← FUERA de public_html
└── amorygracia-config.php             ← credenciales (chmod 600)

/home/usuario/public_html/             ← raíz del sitio servida por Apache
└── api/
    ├── contacto.php                   ← formulario de contacto general
    └── descarga.php                   ← formulario de descarga de Crecer
```

### Contenido de `amorygracia-config.php`

```php
<?php
/**
 * MVI Amor y Gracia — amorygracia-config.php
 * UBICACIÓN: /home/usuario/amorygracia-config.php
 * (UN nivel arriba de public_html)
 *
 * Permisos: chmod 600
 * NUNCA subir este archivo a GitHub.
 */

// ── SMTP principal (recibe notificaciones de contacto) ───────
define('SMTP_HOST', 'smtp.hostinger.com');
define('SMTP_USER', 'contacto@amorygraciapuebla.org');
define('SMTP_PASS', '<contraseña SMTP>');
define('MAIL_TO',   'contacto@amorygraciapuebla.org');

// ── SMTP noreply (envía correos automáticos) ────────────────
define('NOREPLY_USER', 'noreply@amorygraciapuebla.org');
define('NOREPLY_PASS', '<contraseña SMTP>');

// ── reCAPTCHA v3 ────────────────────────────────────────────
define('RECAPTCHA_SECRET', '<secret key de Google>');

// ── Kit (ConvertKit) API ────────────────────────────────────
define('KIT_API_KEY', '<API key de Kit>');
define('KIT_FORM_ID', '<ID del formulario>');
define('KIT_TAG_DESCARGA_CRECER', '<ID del tag descargo-serie-crecer>');
```

### Adaptaciones a hacer al `mail.php` de Kynoz

Cuando Claude Code adapte el script:

1. Cambiar `Access-Control-Allow-Origin: https://kynozdigital.com` → `https://amorygraciapuebla.org`.
2. Cambiar `EHLO kynozdigital.com` → `EHLO amorygraciapuebla.org`.
3. **Eliminar lógica multi-idioma EN/ES** (Amor y Gracia es solo ES).
4. **Cambiar campos del formulario** (ver tabla arriba).
5. **Subir rate limit** de 60 segundos a 300-600 segundos en `contacto.php`.
6. **Mantener rate limit** de 60 segundos en `descarga.php` (la gente puede llenar formularios de descarga seguido, eso es esperado).
7. **Rediseñar templates de correo** con identidad de Amor y Gracia (logo, paleta, lema).
8. **En `descarga.php`, agregar función nueva** `registrarEnKit($email, $nombre, $apellido, $tag)` que llama a la API de Kit (POST a `https://api.convertkit.com/v3/tags/{tag_id}/subscribe`).
9. **Mantener** todo lo demás del `mail.php` original: validación reCAPTCHA fail-closed, honeypot, sanitización CRLF, fallback a `mail()`, etc.

---

### 10.A. Inventario de cuentas de correo del proyecto

El proyecto usa **cuatro buzones de correo** del dominio `@amorygraciapuebla.org`. Cada uno tiene una función específica y diferentes requisitos de credenciales SMTP en el config PHP.

| Correo | Función principal | ¿Envía correos? | ¿Recibe correos? | ¿Necesita contraseña SMTP en config PHP? | Cuándo se crea |
|--------|-------------------|------------------|------------------|------------------------------------------|----------------|
| **contacto@amorygraciapuebla.org** | Envía las notificaciones al pastor cuando alguien llena el formulario de contacto. Recibe respuestas que el pastor pueda mandar manualmente desde su buzón. | Sí (vía PHP) | Sí | **Sí** | Ya existe |
| **noreply@amorygraciapuebla.org** | Envía correos automáticos transaccionales (confirmación con enlaces de descarga de la serie Crecer). | Sí (vía PHP) | No (bloqueado) | **Sí** | Crear en Hostinger antes de Fase 4 |
| **hola@amorygraciapuebla.org** | Newsletter (Kit lo gestiona desde sus servidores). Recibe respuestas de suscriptores. | No (Kit lo hace por nosotros) | Sí | **No** | Crear en Hostinger en Fase 4 |
| **ofrendas@amorygraciapuebla.org** | Recibir notificaciones de Mercado Pago cuando se active la pasarela. | No | Sí | **No** | Crear cuando se active /ofrendas (futuro) |

#### Patrón Kynoz: por qué dos contraseñas SMTP

El patrón heredado del proyecto Kynoz funciona así:

**`contacto@`** — Envía las notificaciones internas al pastor cuando llega un mensaje del formulario de contacto. El correo aparece como:
```
De:       MVI Amor y Gracia <contacto@amorygraciapuebla.org>
Para:     contacto@amorygraciapuebla.org
Reply-To: <correo-del-visitante>
```
Cuando el pastor da "Responder", contesta directo al visitante (no al noreply ni al contacto).

**`noreply@`** — Envía los correos automáticos al usuario (descarga de la serie Crecer). El usuario no debe responder ahí (por eso el "noreply"), y el correo lleva un disclaimer al final pidiendo escribir a `contacto@` para cualquier duda.

**Por qué se separa:** los correos transaccionales automáticos (descarga) y los correos internos (notificaciones al pastor) tienen diferentes propósitos. Si todos salieran del mismo correo, sería confuso para el usuario y para el pastor. La separación también ayuda con la entregabilidad: si alguna vez `noreply@` se reporta como spam, no afecta la reputación de `contacto@`.

#### Por qué `hola@` no necesita contraseña en el config PHP

Kit envía los correos del newsletter desde **sus propios servidores**, no desde Hostinger. Para que aparezcan como si vinieran de `hola@amorygraciapuebla.org` legítimamente, configuramos los registros SPF/DKIM/DMARC en DNS (ver §8). El correo `hola@` solo necesita existir en Hostinger para **recibir** las respuestas de los suscriptores, no para enviar.

#### Por qué `ofrendas@` también es solo de recepción

Mercado Pago envía notificaciones desde sus propios servidores cuando ocurre una donación. El correo `ofrendas@` solo recibe esas notificaciones. No es responsabilidad de nuestro PHP enviar correos relacionados con donaciones.

---

### 10.B. Inventario de credenciales y cuándo se piden

Esta es la lista completa de credenciales y configuraciones que Claude Code te va a pedir durante el proyecto, organizadas por fase.

#### Fase 0 — Preparación

Claude Code te confirmará que tengas:
- Cuenta de GitHub con 2FA activado.
- Cuenta de Hostinger con 2FA activado.
- Llave SSH Ed25519 con passphrase generada.
- SSH a Hostinger funcionando.

**No te pide credenciales todavía.** Solo verifica el entorno.

#### Fase 1 — Estructura base

**Te pide:**
- Confirmar el nombre del repositorio en GitHub (sugerido: `amorygracia-web`).
- Tu usuario de Hostinger SSH (para configurar el deploy script).
- La ruta exacta a `public_html` en tu Hostinger (típicamente `/home/uXXXXXXXX/public_html/`).

**Dónde vive:** estos datos van en archivos de configuración del proyecto que SÍ se versionan (ej. `astro.config.mjs`, scripts de deploy). Son públicos, no secretos.

#### Fase 2 y 3 — Wireframes y diseño visual

**No pide credenciales.** Solo trabajo de diseño y código frontend.

#### Fase 4 — Integraciones (aquí está la mayoría)

Claude Code te pedirá una a una las siguientes credenciales:

**(a) Google reCAPTCHA v3:**
- Tú: vas a `google.com/recaptcha/admin/create`, creas el sitio, obtienes:
  - **Site Key** (público).
  - **Secret Key** (privado).
- Site Key → va al archivo `.env` como `PUBLIC_RECAPTCHA_SITE_KEY` (este sí va al repo en `.env.example` con el valor real, porque es público).
- Secret Key → va al config PHP fuera de raíz (`amorygracia-config.php`).

**(b) Contraseñas SMTP:**
- Tú: vas a hPanel de Hostinger → Correos → ahí ves o cambias las contraseñas.
- **Crea el correo `noreply@amorygraciapuebla.org`** si no existe. Activa "no recibir correos" en su configuración (o configura un filtro que descarte todo entrante).
- Te pedirá **dos contraseñas:**
  - La de `contacto@amorygraciapuebla.org`.
  - La de `noreply@amorygraciapuebla.org`.
- Ambas → al config PHP fuera de raíz.

**(c) ConvertKit (Kit):**
- Tú: creas cuenta en `kit.com`, configuras el formulario de newsletter, los tags (`descargo-serie-crecer`, `newsletter-suscriptor`), y la secuencia de bienvenida (ver §15.7).
- Obtienes:
  - **API Key de Kit** (privado).
  - **ID del formulario de newsletter** (privado).
  - **ID del tag `descargo-serie-crecer`** (privado).
- Todo → al config PHP fuera de raíz.

**(d) YouTube Data API v3:**
- Tú: creas API key en Google Cloud Console, restringes por dominio.
- Va a `.env` como `PUBLIC_YOUTUBE_API_KEY`. Usado solo en build time, nunca expuesta al cliente.
- También te pide el **ID del canal de YouTube** de la iglesia.

**(e) Google Analytics 4:**
- Tú: creas propiedad GA4 en `analytics.google.com`.
- Obtienes el **Measurement ID** (formato `G-XXXXXXXXXX`).
- Va a `.env` como `PUBLIC_GA4_MEASUREMENT_ID`. Es público.

**(f) Crear `hola@amorygraciapuebla.org` en Hostinger.**
- Tú: lo creas en hPanel.
- Lo verificas desde Kit (Kit te manda un correo de confirmación, lo abres, das click).
- Kit te entrega los registros DNS a agregar (SPF, DKIM, DMARC). Los **anotas** y los aplicarás en Fase 6.

#### Fase 5 — Pulido

**No pide credenciales nuevas.**

#### Fase 6 — Cloudflare y lanzamiento

**Te pide:**
- Credenciales de Cloudflare (creas la cuenta).
- Cambio de nameservers en el registrador de tu dominio (donde compraste `amorygraciapuebla.org`).
- Aplica los registros SPF/DKIM/DMARC anotados en Fase 4 (Hostinger + Kit combinados).

#### Resumen ejecutivo: dónde vive cada credencial

| Credencial | Dónde vive | ¿Va al repo? |
|------------|------------|--------------|
| Site Key reCAPTCHA v3 | `.env` (con `PUBLIC_` prefix) | Sí (es público) |
| Secret Key reCAPTCHA v3 | `amorygracia-config.php` fuera de raíz | **No** |
| Contraseña SMTP `contacto@` | `amorygracia-config.php` fuera de raíz | **No** |
| Contraseña SMTP `noreply@` | `amorygracia-config.php` fuera de raíz | **No** |
| API Key de Kit | `amorygracia-config.php` fuera de raíz | **No** |
| ID Form Kit + ID Tag Kit | `amorygracia-config.php` fuera de raíz | **No** |
| YouTube API Key | `.env` (con `PUBLIC_` prefix) | Sí (restringida por dominio, solo build-time) |
| YouTube Channel ID | `.env` (con `PUBLIC_` prefix) | Sí (es público) |
| GA4 Measurement ID | `.env` (con `PUBLIC_` prefix) | Sí (es público) |
| Credenciales Cloudflare | Solo en tu cuenta de Cloudflare | No |
| Llave SSH | Solo en tu computadora (`~/.ssh/`) | **Nunca** |

**Regla de oro:** si la credencial empieza con `PUBLIC_` puede ir al repo. Si no, va al config PHP fuera de raíz, **NUNCA** al repo.

#### Lo que Claude Code te dirá explícitamente cuando te pida cada credencial

Por cada credencial, Claude Code te explicará:
1. Dónde la generas (qué sitio web, qué panel).
2. Qué tipo es (pública o privada).
3. Dónde la vas a poner (config PHP, `.env`, etc.).
4. Si necesita protección adicional (chmod 600, etc.).

Si en algún momento Claude Code te pide pegar una credencial real en el chat sin advertirte, recuérdaselo: las credenciales privadas no se pegan en chats, se manejan directamente en el archivo de configuración correspondiente.

---

## 11. SEO técnico y Schema.org

### Stack de schema.org / JSON-LD

Implementar en `<head>` de las páginas correspondientes:

1. **`Church`** (extiende `PlaceOfWorship` y `LocalBusiness`) — Home y `/sedes/*`.
2. **`ReligiousOrganization`** — `/nosotros`.
3. **`Event`** — calendario de servicios y Tiempos de Mesa.
4. **`Person`** — Pastores Daniel y Rocío en `/nosotros`.
5. **`Article` / `BlogPosting`** — cada entrada de blog.
6. **`PodcastSeries` / `PodcastEpisode`** — `/podcast`.
7. **`VideoObject`** — cada prédica YouTube embebida.
8. **`WebSite`** + **`SearchAction`** — Home (sitelinks searchbox).
9. **`BreadcrumbList`** — todas las páginas internas.
10. **`FAQPage`** — `/visitanos`.

### Ejemplo: Schema Church para Home

```json
{
  "@context": "https://schema.org",
  "@type": "Church",
  "@id": "https://amorygraciapuebla.org/#church",
  "name": "MVI Amor y Gracia",
  "alternateName": ["Iglesia Amor y Gracia", "Amor y Gracia Puebla"],
  "description": "Iglesia cristiana evangélica en Amozoc, Puebla. Estudio bíblico profundo, intimidad en adoración, comunión, oración y partimiento del pan. Bajo cobertura de Ministerios Visión Internacional (MVI).",
  "url": "https://amorygraciapuebla.org/",
  "logo": "https://amorygraciapuebla.org/logo.png",
  "image": "https://amorygraciapuebla.org/og-image.jpg",
  "telephone": "+52-222-XXX-XXXX",
  "email": "contacto@amorygraciapuebla.org",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Calle y número, Amozoc]",
    "addressLocality": "Amozoc",
    "addressRegion": "Puebla",
    "postalCode": "[CP]",
    "addressCountry": "MX"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 19.0414,
    "longitude": -98.0386
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "10:30",
      "closes": "12:30"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Thursday",
      "opens": "19:30",
      "closes": "21:00",
      "description": "Tiempos de Mesa - Casa de Oración"
    }
  ],
  "parentOrganization": {
    "@type": "ReligiousOrganization",
    "name": "Ministerios Visión Internacional",
    "url": "https://www.visioninternacional.org/"
  },
  "founder": [
    {"@type": "Person", "name": "Pastor Daniel Chávez"},
    {"@type": "Person", "name": "Pastora Rocío Chávez"}
  ],
  "areaServed": [
    {"@type": "City", "name": "Puebla"},
    {"@type": "City", "name": "Amozoc"},
    {"@type": "City", "name": "Tehuacán"},
    {"@type": "City", "name": "Cholula"},
    {"@type": "City", "name": "San Andrés Cholula"},
    {"@type": "City", "name": "San Pedro Cholula"},
    {"@type": "City", "name": "Atlixco"}
  ],
  "sameAs": [
    "https://www.facebook.com/amorygraciapuebla",
    "https://www.instagram.com/amorygraciapuebla",
    "https://www.youtube.com/@amorygraciapuebla"
  ],
  "knowsAbout": [
    "Estudio bíblico",
    "Segunda venida de Cristo",
    "Adoración",
    "Comunión cristiana",
    "Oración",
    "Partimiento del pan",
    "Sana doctrina"
  ]
}
```

### Meta tags y H1 por página

Detalle completo en SEO-STRATEGY.md. Resumen aquí:

| Página | Title (60c) | H1 |
|--------|-------------|----|
| Home | MVI Amor y Gracia · Iglesia Cristiana Evangélica en Puebla | Iglesia Cristiana Evangélica en Puebla – MVI Amor y Gracia |
| Nosotros | Nosotros · Pastores Daniel y Rocío Chávez · Amor y Gracia | Conoce a MVI Amor y Gracia – Pastores Daniel y Rocío |
| Lo que creemos | Lo que creemos · Sana Doctrina e Iglesia Bíblica en Puebla | Lo que creemos – Iglesia con sana doctrina en Puebla |
| Cómo nos reunimos | Servicios y Ministerios · Iglesia Amor y Gracia Puebla | Cómo nos reunimos |
| Visítanos | Tu primera visita · Iglesia Cristiana en Puebla | ¿Vienes por primera vez? Bienvenido a casa |
| /puebla | Iglesia Cristiana en Puebla · Amor y Gracia (sede en Amozoc) | Iglesia Cristiana Evangélica para gente de Puebla |
| /sedes/amozoc | Iglesia Cristiana en Amozoc, Puebla · Amor y Gracia | Iglesia Cristiana Evangélica en Amozoc |
| /sedes/tehuacan | Iglesia Cristiana en Tehuacán, Puebla · Amor y Gracia | Iglesia Cristiana Evangélica en Tehuacán |
| /recursos | Recursos · Estudios bíblicos y serie Crecer · Amor y Gracia | Recursos para crecer en la fe |

### URLs SEO-friendly

- Todo en minúsculas, con guiones.
- Sin parámetros `?id=`.
- Estructura jerárquica clara.
- Slugs de blog descriptivos.

### Otras implementaciones técnicas

- **HTTPS obligatorio**, redirección 301 desde HTTP.
- **Mobile-first**: Google indexa el mobile primero.
- **Core Web Vitals**: LCP < 2.5s, INP < 200ms, CLS < 0.1.
- **Optimización de imágenes**: WebP/AVIF, lazy loading, alt text descriptivo.
- **Sitemap.xml** automático con `@astrojs/sitemap`.
- **RSS feed** del blog con `@astrojs/rss`.
- **Robots.txt** que permita indexación pública y bloquee `/api/*`.
- **Canonical tags** en cada página.
- **Open Graph + Twitter Cards** para previews en redes.
- **Favicon completo** (todas las resoluciones).

---

## 12. Skills de Claude Code

Claude Code tiene acceso a "skills" — paquetes de buenas prácticas para tareas específicas. Para este proyecto se usan dos:

### `frontend-design` (oficial Anthropic)

**Cuándo activar:** durante diseño visual e implementación de páginas (Fases 3+).

**Qué aporta:** patrones de diseño moderno y accesible, paletas, escalas tipográficas, componentes con buena accesibilidad por defecto, anti-patrones a evitar.

### `ux-designer` (instalada por el usuario)

**Cuándo activar:** durante wireframes y arquitectura de información (Fase 2), y nuevamente en pulido (Fase 5).

**Qué aporta:** principios de UX, jerarquía visual, microcopy, accesibilidad, patrones de navegación, heurísticas de Nielsen.

### Combinación

- **`ux-designer`** define **qué** debe estar en cada página, **dónde**, en **qué orden**.
- **`frontend-design`** define **cómo se ve** y **cómo se siente** visualmente.

Orden por página: primero ux-designer, luego frontend-design.

---

## 13. Roadmap por fases

### Fase 0 — Preparación (1-2 horas)

- [ ] Crear repositorio nuevo en GitHub: `amorygracia-web`.
- [ ] Activar 2FA, Secret Scanning, Dependabot, branch protection.
- [ ] Verificar SSH a Hostinger funciona.
- [ ] Estructura de carpetas inicial en `Documentos/MVI WEB`:
  ```
  MVI WEB/
  ├── ARCHITECTURE.md
  ├── SEO-STRATEGY.md
  ├── PROMPT-INICIAL-CLAUDE-CODE.md
  ├── README.md
  ├── docs/
  │   ├── manual-identidad.pdf
  │   ├── crecer-1.pdf
  │   ├── crecer-2.pdf
  │   ├── crecer-3.pdf
  │   └── kynoz-reference/
  │       ├── mail.php
  │       └── kynoz-config.php
  └── assets/
      └── brand/
          ├── mvi-logo-color.jpg
          ├── mvi-logo-white.jpg
          └── mvi-isotipo-color.png
  ```

### Fase 1 — Estructura base (2-3 sesiones)

- Inicializar proyecto Astro con plantilla mínima.
- Configurar `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `.env.example`.
- Crear `src/styles/tokens.css` con todos los design tokens.
- Crear `BaseLayout.astro` con header y footer mínimos.
- Crear `index.astro` con "Hola, Amor y Gracia" para verificar flujo end-to-end.
- Configurar deploy a Hostinger.
- Verificar sitio en dominio.

### Fase 2 — Wireframes y AI (2 sesiones)

- **Activar skill `ux-designer`.**
- Validar sitemap final.
- Crear wireframes en código (HTML semántico, sin estilos visuales) de cada página.
- Validar flujos del usuario.
- Decidir microcopy de CTAs.

### Fase 3 — Diseño visual e implementación (8-12 sesiones)

- **Activar skill `frontend-design`.**

Orden:
1. **Inicio** (laboratorio de componentes).
2. **Nosotros** (con la frase pastoral).
3. **Lo que creemos** (5 pilares — página pillar SEO).
4. **Cómo nos reunimos**.
5. **Visítanos** (FAQ).
6. **/puebla** (landing geográfica).
7. **/sedes/amozoc**.
8. **/sedes/tehuacan**.
9. **/recursos** (landing) + páginas individuales Crecer 1/2/3.
10. **/recursos/descargar** (formulario).
11. **Blog** (estructura + post de ejemplo).
12. **Podcast** (cards + lista).
13. **Contacto** (formulario).
14. **/ofrendas** (página informativa).
15. **Páginas legales y 404**.

### Fase 4 — Integraciones y backend (2-3 sesiones)

- Adaptar `mail.php` a `contacto.php` y `descarga.php`.
- Crear `amorygracia-config.php` (fuera de raíz, instructivo al admin).
- YouTube API para mostrar videos del canal.
- Configurar Kit: secuencias automáticas, formulario de newsletter.
- Cloudflare Turnstile **NO** (usamos reCAPTCHA v3 según decisión del admin).
- Sitemap.xml y RSS feed.
- Open Graph tags y favicon completo.

### Fase 5 — Pulido y performance (2 sesiones)

- **Activar skill `ux-designer` en modo auditoría.**
- Auditoría WCAG AA.
- Lighthouse: meta 90+ en todas las categorías.
- Core Web Vitals.
- Optimización de imágenes (`<Image>` de Astro).
- Pruebas en navegadores reales y dispositivos.

### Fase 6 — Cloudflare y lanzamiento (1 sesión)

- Migrar DNS a Cloudflare.
- SSL Full (Strict).
- Cloudflare Web Analytics.
- SPF/DKIM/DMARC en DNS.
- Page Rules de caching.
- UptimeRobot configurado.
- 🎉 Lanzamiento.

### Estimación total

- **Sesiones:** 18-25 sesiones de Claude Code.
- **Calendario:** 6-10 semanas a 2-3 sesiones por semana.
- **Sin presión:** ritmo lo marca el administrador.

---

## 14. Decisiones diferidas

### 14.1 Pasarela de donaciones (`/ofrendas`) — DIFERIDA

**Decisión:** la página `/ofrendas` se construye en V1 pero **sin funcionalidad de pagos**. Solo contiene un mensaje informativo:

> *"Estamos preparando esta sección. Mientras tanto, si Dios pone en tu corazón apoyar a la iglesia, contáctanos directamente."*

**Razón:** evitamos riesgos fiscales y técnicos hasta que se decida la constitución legal de la iglesia.

**Cuando se active:** Mercado Pago con cuenta personal del pastor (mientras no exista AR formal), con tres protecciones obligatorias:
1. Cuenta bancaria separada exclusivamente para iglesia.
2. Acta interna firmada (los fondos pertenecen a la iglesia, no al pastor a título personal).
3. Provisión fiscal del 20-30% del recibido para cubrir ISR potencial.

Investigación detallada disponible en chat archivado.

### 14.2 Asociación Religiosa (AR) — EN EVALUACIÓN

**Decisión pendiente del liderazgo de la iglesia** (no del proyecto técnico): iniciar o no el trámite ante SEGOB.

**Lo que se sabe:**
- La iglesia ya cumple los 11+ años (mínimo requerido: 5).
- Trámite oficial **gratis**.
- Toma 3-6 meses.
- No requiere notario.
- Permite cuenta empresa Mercado Pago + Mercado Libre Solidario (comisiones bonificadas).
- Exenta de ISR sobre donativos.
- **NO permite emitir recibos deducibles** (las AR no pueden ser donatarias autorizadas).

**Esta decisión no bloquea el sitio web.**

### 14.3 Versículo del hero

El versículo actual de mockups (Proverbios 25:13) **no encaja** con el lema escatológico. Sustituir por uno alineado al "regreso de Cristo":

- **Mateo 24:42** — *"Velad, pues, porque no sabéis a qué hora ha de venir vuestro Señor."*
- **Apocalipsis 22:20** — *"El que da testimonio de estas cosas dice: Ciertamente vengo en breve. Amén; sí, ven, Señor Jesús."*
- **Tito 2:13** — *"aguardando la esperanza bienaventurada y la manifestación gloriosa de nuestro gran Dios y Salvador Jesucristo"*

**Decisión final:** los pastores eligen.

### 14.4 Datos pendientes del sitio

Cuando se tengan, se reemplazan placeholders:

- Dirección física exacta del templo en Amozoc.
- Fotos profesionales de los pastores.
- Links reales de redes sociales (Facebook, Instagram, YouTube).
- Datos completos de la iglesia hija de Tehuacán (dirección, horarios, liderazgo local).
- Fotos de ministerios (alabanza, Tiempo de Mesa).
- Lista de canciones que tocan en alabanza (opcional).

### 14.5 Blog — contenido inicial

V1 puede lanzarse con 1-2 artículos de seed (ver SEO-STRATEGY.md para ideas priorizadas). Si no hay material listo, V1 lanza sin blog visible y se activa después.

---

## 15. Anexos: copy de correos

Esta sección contiene los textos completos de los correos automatizados. Claude Code los implementará tal cual (con la libertad de adaptar HTML).

### 15.1 Correo principal (enviado por tu PHP) — Día 0, descarga

**De:** `noreply@amorygraciapuebla.org`
**Asunto:** `Aquí está tu serie Crecer — MVI Amor y Gracia`

```
[Logo Amor y Gracia]

Hola, José.

Gracias por solicitar la serie Crecer. Es el material introductorio que usamos
en MVI Amor y Gracia para acompañar a quienes están dando sus primeros pasos
en la fe — o quieren refrescar los fundamentos.

Aquí están los tres niveles, listos para descargar a tu celular o computadora:

──────────────────────────────────────────

[BOTÓN GRANDE: Descargar Crecer 1 — Fundamentos · PDF, ~1.8 MB]

Aprende qué es ser hijo de Dios, qué es la Biblia, y por qué seguir a Cristo.

──────────────────────────────────────────

[BOTÓN GRANDE: Descargar Crecer 2 — Hábitos del discípulo · PDF, ~1.5 MB]

Estudio bíblico, oración, y cómo la Palabra transforma nuestro entendimiento.

──────────────────────────────────────────

[BOTÓN GRANDE: Descargar Crecer 3 — La iglesia que crece · PDF, ~2.0 MB]

Los 5 pilares de la iglesia según Hechos 2:42 — adoración, enseñanza,
comunión, oración y partimiento del pan.

──────────────────────────────────────────

Te recomendamos empezar por Crecer 1 e ir avanzando con calma. No es un
curso para terminar rápido, es una invitación a sentarte con la Palabra.

──────────────────────────────────────────

¿TE GUSTARÍA MANTENERTE CERCA DE NOSOTROS?

Cada cierto tiempo enviamos un boletín breve con nuevas enseñanzas, recursos,
y avisos de lo que estamos viviendo como iglesia. Sin ruido, sin spam.
Si quieres recibirlo, te invitamos a sumarte:

[BOTÓN: Quiero recibir el boletín de Amor y Gracia]

──────────────────────────────────────────

Que el Señor te bendiga.

Equipo MVI Amor y Gracia

Somos iglesia · Hacemos iglesia · Hacemos familia

Iglesia Cristiana Evangélica · Amozoc, Puebla
Pastores Daniel y Rocío Chávez

──────────────────────────────────────────

Este es un correo automático. Si tienes alguna duda o quieres conocer más
sobre la iglesia, escríbenos a contacto@amorygraciapuebla.org.
```

### 15.2 Correo de seguimiento — Día 1, **Rama A** (SE SUSCRIBIÓ AL NEWSLETTER)

**Enviado por:** Kit
**De:** Amor y Gracia (`noreply@amorygraciapuebla.org`)
**Asunto:** `¿Qué te pareció Crecer 1, José?`

```
Hola, José.

Hace un día descargaste la serie Crecer, y hoy queríamos saludarte de nuevo,
sin prisa.

Sabemos que la vida está llena de cosas que distraen, y que abrir un material
como este toma intención. Si llegaste a leerlo aunque sea un pedacito, ya
estás dando un paso valioso.

Crecer 1 habla de los fundamentos de la fe: por qué la Biblia es Palabra de
Dios, qué significa nacer de nuevo, y cómo entender que ser hijo de Dios es
ser parte de una familia.

Si algo de lo que leíste te movió, te dejó con preguntas, o te gustaría
conversarlo con alguien — escríbenos. Estamos aquí.

Gracias por estar también en nuestro boletín. La próxima vez que tengamos
algo nuevo, te lo haremos saber por aquí.

Que el Señor te bendiga.

Equipo MVI Amor y Gracia

──────────────────────────────────────────

Somos iglesia · Hacemos iglesia · Hacemos familia
amorygraciapuebla.org
```

### 15.3 Correo de seguimiento — Día 1, **Rama B** (NO SE SUSCRIBIÓ)

**Enviado por:** Kit
**Asunto:** `Crecer 1 — y una invitación pendiente`

```
Hola, José.

Hace un día descargaste la serie Crecer. Esperamos que el material te haya
hablado al corazón, aunque sea en pequeñas dosis. La vida diaria a veces no
nos deja sentarnos con calma a leer.

Si pudiste leerlo y algo se removió en ti — una pregunta, una duda, un anhelo
— escríbenos. Una de las cosas que más nos gusta como iglesia es conversar.

Y queríamos recordarte algo: te dejamos abierta la invitación a recibir
nuestro boletín. No es nada ruidoso, ni frecuente. Solo enviamos cuando hay
algo que vale la pena compartir: una nueva enseñanza, un encuentro especial,
una reflexión pastoral. Si quieres recibirlo, te dejamos por aquí la
invitación de nuevo:

[BOTÓN: Quiero recibir el boletín de Amor y Gracia]

Si no es para ti, no pasa nada. Quédate con la serie Crecer y, cuando estés
listo, en nuestro sitio encontrarás más material.

Que el Señor te guarde.

Equipo MVI Amor y Gracia

──────────────────────────────────────────

Somos iglesia · Hacemos iglesia · Hacemos familia
amorygraciapuebla.org
```

### 15.4 Correo de recordatorio — Día 8 (1 semana), no suscrito

**Enviado por:** Kit
**Asunto:** `Una semana después — la invitación sigue abierta`

```
Hola, José.

Hace una semana descargaste la serie Crecer. No queremos saturarte de correos,
solo recordarte que sigues teniendo abierta la invitación a unirte a nuestro
boletín.

Pensamos que tal vez te interese saber qué publicamos, qué enseña la iglesia,
y de vez en cuando alguna reflexión que el Señor pone en el corazón de los
pastores Daniel y Rocío. No es algo que enviemos seguido — solo cuando hay
algo que vale la pena compartir.

Si te gustaría recibirlo, este es el momento:

[BOTÓN: Quiero recibir el boletín]

Y si no es para ti, también está bien. Que el Señor siga obrando en tu vida.

Equipo MVI Amor y Gracia

──────────────────────────────────────────

Somos iglesia · Hacemos iglesia · Hacemos familia
amorygraciapuebla.org
```

### 15.5 Correo final — Día 38 (1 mes después), no suscrito

**Enviado por:** Kit
**Asunto:** `Última invitación, José`

```
Hola, José.

Es la última vez que te escribimos sobre el boletín. Hace casi un mes
descargaste la serie Crecer, y entendemos que tal vez no es el momento, o
simplemente no es lo tuyo. Está perfectamente bien.

Solo queremos dejarte por aquí la última invitación, por si más adelante
cambias de idea:

[BOTÓN: Quiero recibir el boletín]

Y si no, gracias por haber descargado el material. Esperamos que en algún
momento te haya servido. Las puertas de la iglesia siguen abiertas si algún
día quieres visitarnos en persona — nos reunimos los domingos a las 11 AM
en Amozoc.

Que el Señor te bendiga siempre.

Equipo MVI Amor y Gracia

──────────────────────────────────────────

Somos iglesia · Hacemos iglesia · Hacemos familia
amorygraciapuebla.org · Amozoc, Puebla
```

### 15.6 Notas de implementación de los correos

- **HTML:** usar tablas para layout (estándar en emails), CSS inline.
- **Logo:** insertar como `<img>` con URL absoluta (no inline base64).
- **Botones:** usar `<a>` con estilos de botón (bgcolor, padding, border-radius).
- **Ancho máximo:** 600px.
- **Tipografía:** sans-serif segura (Helvetica/Arial fallback) o Geist si Kit lo soporta.
- **Color principal de botones:** `#133299` (azul deep brand).
- **Texto plano alternativo:** generar versión texto plano de cada correo (Kit lo hace automáticamente desde el HTML, pero validar).

### 15.7 Configuración en Kit (resumen para el admin)

1. Crear cuenta en `kit.com`.
2. Crear **Tag**: `descargo-serie-crecer` (registrado por el PHP) y `newsletter-suscriptor` (aplicado cuando dan click al botón "suscribirse").
3. Crear **Form**: "Newsletter Amor y Gracia" (link redirect-only, sin formulario propio — solo aplica el tag).
4. Crear **Sequence** "Bienvenida tras descarga Crecer" con 4 emails:
   - Email 1: día +1, condición "tiene tag newsletter-suscriptor" → contenido §15.2 (Rama A).
   - Email 2: día +1, condición "NO tiene tag newsletter-suscriptor" → contenido §15.3 (Rama B).
   - Email 3: día +8, condición "NO tiene tag newsletter-suscriptor" → contenido §15.4.
   - Email 4: día +38, condición "NO tiene tag newsletter-suscriptor" → contenido §15.5.
5. Trigger de la sequence: aplicación del tag `descargo-serie-crecer`.

---

## 16. Glosario y referencias

### Glosario

- **AR:** Asociación Religiosa registrada ante SEGOB.
- **AC:** Asociación Civil. Requiere notario.
- **Astro:** framework de generación de sitios estáticos.
- **CDN:** Content Delivery Network. Cloudflare es uno.
- **CMS:** Content Management System.
- **GBP:** Google Business Profile (antes Google My Business).
- **Kit / ConvertKit:** plataforma de email marketing y newsletter.
- **LFPDPPP:** Ley Federal de Protección de Datos Personales en Posesión de los Particulares (México).
- **MVI:** Ministerios Visión Internacional. Cobertura ministerial de Amor y Gracia.
- **PCI-DSS:** estándar de seguridad para procesamiento de tarjetas.
- **SEGOB:** Secretaría de Gobernación. Registra Asociaciones Religiosas.
- **SPF/DKIM/DMARC:** estándares de autenticación de correo electrónico.
- **WCAG:** Web Content Accessibility Guidelines.

### Referencias internas

- **Manual de Identidad MVI:** `docs/manual-identidad.pdf`
- **Crecer 1, 2, 3:** `docs/crecer-*.pdf`
- **Referencia técnica Kynoz:** `docs/kynoz-reference/mail.php` y `kynoz-config.php`
- **Estrategia SEO completa:** `SEO-STRATEGY.md`
- **Investigación Mercado Pago:** archivada en chat de planeación.

### Referencias externas clave

- Astro: https://astro.build
- Cloudflare Free: https://www.cloudflare.com
- ConvertKit (Kit): https://kit.com
- Hostinger SSH docs: https://support.hostinger.com
- Google reCAPTCHA v3: https://www.google.com/recaptcha
- WCAG AA: https://www.w3.org/WAI/WCAG21/quickref/
- SEGOB AR: http://www.asociacionesreligiosas.gob.mx
- Schema.org Church: https://schema.org/Church

---

## Aprobación

Este documento es el contrato del proyecto. Cualquier desviación significativa requiere actualizar el documento antes de implementar.

**Versión 2.0 — abril 2026 — Lista para Claude Code.**

# Prompt inicial para Claude Code

> Este archivo contiene el texto que debes copiar y pegar como **primer mensaje** al abrir Claude Code en la carpeta del proyecto. Este prompt le da a Claude Code todo el contexto necesario para que pueda empezar a trabajar sin re-explicar nada.

---

## Cómo usar este prompt

1. **Antes de abrir Claude Code**, asegúrate de tener la estructura de carpetas lista:

```
MVI WEB/
├── ARCHITECTURE.md               ← documento maestro (descargado)
├── SEO-STRATEGY.md               ← estrategia SEO (descargado)
├── PROMPT-INICIAL-CLAUDE-CODE.md ← este archivo
├── README.md                     ← descripción del proyecto
├── docs/
│   ├── manual-identidad.pdf      ← manual de marca MVI
│   ├── crecer-1.pdf
│   ├── crecer-2.pdf
│   ├── crecer-3.pdf
│   └── kynoz-reference/          ← archivos PHP de referencia
│       ├── mail.php
│       └── kynoz-config.php
└── assets/
    └── brand/
        ├── mvi-logo-color.jpg
        ├── mvi-logo-white.jpg
        └── mvi-isotipo-color.png
```

2. **Abre Claude Code** apuntando a esa carpeta:

```bash
cd ~/Documentos/MVI\ WEB
claude
```

(o como sea que invoques Claude Code en tu sistema).

3. **Cuando Claude Code esté listo**, copia el bloque del prompt abajo y pégalo como primer mensaje.

4. Claude Code va a leer todos los documentos, confirmarte que entendió, y a partir de ahí trabajan juntos.

---

## El prompt (copiar desde aquí)

```
Hola Claude. Soy el administrador del proyecto del sitio web de MVI Amor y Gracia, una iglesia cristiana evangélica en Amozoc, Puebla, México (con iglesia hija en Tehuacán). Vamos a construir el sitio juntos.

ANTES DE HACER NADA, por favor lee con atención EN ORDEN:

1. ARCHITECTURE.md (en la raíz del proyecto) — documento maestro con TODAS las decisiones técnicas, sitemap, modelo de amenazas de ciberseguridad, sistema de descarga de recursos con email gate, copy de correos automáticos, formulario de contacto en PHP, y roadmap por fases.

2. SEO-STRATEGY.md (en la raíz) — estrategia SEO completa con keywords priorizadas, análisis de 12 competidores poblanos, plan de contenido de blog, estrategia GBP, backlinks, y KPIs.

3. README.md (en la raíz) — descripción rápida del proyecto.

También hay materiales fuente en la carpeta docs/:
- manual-identidad.pdf (manual de marca MVI con paleta de colores)
- crecer-1.pdf, crecer-2.pdf, crecer-3.pdf (materiales doctrinales que alimentan la sección "Lo que creemos" Y se ofrecen como descarga con email gate)
- kynoz-reference/mail.php y kynoz-config.php (archivos PHP de referencia de otro proyecto, los usaremos como base para adaptar contacto.php y descarga.php)

En la carpeta assets/brand/ están los logos en sus variantes (color, blanco, isotipo).

Una vez que hayas leído los tres documentos principales, ANTES de escribir una sola línea de código:

1. Confírmame brevemente que entendiste el proyecto, mencionando:
   - El stack técnico decidido (Astro + TypeScript + CSS plano + PHP propio).
   - El dominio del sitio (amorygraciapuebla.org).
   - La frase pastoral central que guía la voz.
   - Las páginas /puebla, /sedes/amozoc y /sedes/tehuacan, y por qué NO hay /sedes/puebla.
   - El flujo de descarga de la serie Crecer con email gate y secuencia automática en Kit.
   - Cómo se manejan las credenciales (config PHP fuera de public_html, NO en repo).
   - Las dos skills que vamos a usar (frontend-design y ux-designer) y para qué fase aplica cada una.
   - La keyword cabecera principal según SEO-STRATEGY.md.

2. Pregúntame si hay algo de los documentos que quiero ajustar antes de proceder, o si arrancamos directamente con la Fase 1 (Estructura base del proyecto).

3. NO empieces a escribir código aún. Espera mi confirmación explícita.

REGLAS IMPORTANTES DURANTE TODO EL PROYECTO:

- Siempre que vayas a tomar una decisión técnica importante, refiérete primero al ARCHITECTURE.md. Si el documento no cubre el caso, pregúntame antes de improvisar.
- Para cualquier diseño visual o de UI, activa la skill frontend-design.
- Para cualquier decisión de arquitectura de información, jerarquía o flujos de usuario, activa la skill ux-designer.
- Para cualquier decisión de copy, headings, microcopy o estructura de página, refiérete a SEO-STRATEGY.md para asegurar que las keywords objetivo estén integradas naturalmente.
- Mantén las dependencias de pnpm al MÍNIMO. Cada nueva dependencia requiere justificación contra la lista permitida en ARCHITECTURE.md §4.
- Antes de hacer git commit, verifica que .gitignore es correcto y que NO se está commiteando ningún secreto, archivo .env, ni archivo de credenciales (especialmente cualquier *config.php con credenciales reales).
- Cualquier decisión nueva que tomemos juntos durante la implementación, agrégala al ARCHITECTURE.md como apéndice o actualización de la sección correspondiente. El documento es vivo.
- Si en algún momento creas archivos .env, asegúrate de que están en .gitignore antes del primer commit y que solo .env.example (sin valores reales) se versiona.
- Cada vez que agreguemos una integración externa (YouTube API, Kit, reCAPTCHA, etc.), documéntala en ARCHITECTURE.md §8.
- Para los formularios PHP (contacto.php y descarga.php): usa kynoz-reference/mail.php y kynoz-config.php como base, pero adapta según las diferencias listadas en ARCHITECTURE.md §10. NO copies el código tal cual — adáptalo al caso de Amor y Gracia.
- El copy completo de los correos automáticos está en ARCHITECTURE.md §15. Úsalo literal cuando implementes las plantillas HTML.

Por favor empieza leyendo los tres documentos principales ahora y confirma cuando estés listo.
```

---

## Después del primer mensaje

Una vez que Claude Code te confirme que entendió, puedes proceder de varias formas:

### Opción A — Arrancar la Fase 0.5 (hardening de seguridad)

*"Antes de cualquier código, ayúdame a verificar que tengo lista la Fase 0.5 (hardening previo) según ARCHITECTURE.md §6. Lista los pasos y dime cómo verificar cada uno en mi entorno."*

### Opción B — Arrancar la Fase 1 directo

*"Procede con la Fase 1: inicializa el proyecto Astro con la estructura definida en ARCHITECTURE.md §5, configura tokens.css con la paleta del manual de marca, y prepara el deploy a Hostinger."*

### Opción C — Empezar por algo concreto y visual

*"Antes de la Fase 1 completa, quiero ver una página de ejemplo. Crea solo el archivo `index.astro` con un hero usando los design tokens definidos en tokens.css, para validar que la dirección visual va por buen camino."*

**Mi recomendación es la Opción A** porque garantiza que el entorno de seguridad esté correcto antes de que existan secretos en el proyecto. Después continuamos con Fase 1.

---

## Si Claude Code se desvía o pierde el hilo

En cualquier momento puedes recordarle:

*"Refiérete al ARCHITECTURE.md sección X antes de continuar."*

*"Esto se está saliendo del scope de la fase actual. Volvamos a la fase Y."*

*"Verifica que esto está alineado con lo que dice SEO-STRATEGY.md sobre [tema]."*

Los documentos son el ancla. Mientras Claude Code los respete, el proyecto se mantiene coherente.

---

## Recordatorios técnicos importantes

1. **Las credenciales SMTP, reCAPTCHA secret y Kit API key NUNCA van en el repo.** Vive en `amorygracia-config.php` fuera de `public_html/`. Verificar `.gitignore` antes del primer commit.

2. **Los archivos `mail.php` y `kynoz-config.php` de referencia tienen credenciales del otro proyecto.** Cuando se subieron al chat, era contexto. **NO se deben commitear al repo de Amor y Gracia.** Borrarlos de `docs/kynoz-reference/` antes del primer push, o mantenerlos solo localmente para referencia.

3. **La pasarela de ofrendas está diferida.** La página `/ofrendas` se construye con mensaje informativo solamente. NO implementar Mercado Pago ni ninguna pasarela en V1.

4. **El flujo de descarga de la serie Crecer es complejo.** Tres botones grandes en el correo principal, secuencia automática en Kit con bifurcación según comportamiento (Rama A/B), recordatorios día 1 / día 8 / día 38. Todo está en ARCHITECTURE.md §9 y §15.

5. **La iglesia hija de Tehuacán NO tiene subdominio propio.** Vive en `/sedes/tehuacan` dentro del mismo sitio.

6. **NO hay sede física en Puebla capital.** La página `/puebla` es una landing geográfica honesta que explica que la sede está en Amozoc (área metropolitana). NO crear GBP en Puebla capital.

7. **Reglas de SEO crítico (de SEO-STRATEGY.md):**
   - Schema Church + ReligiousOrganization + Event + Person + FAQPage en páginas correspondientes.
   - Meta titles, descriptions y H1 según tabla en ARCHITECTURE.md §11.
   - Lo que creemos = página pillar (1,200-1,800 palabras, los 5 pilares de Hechos 2:42).
   - URLs en kebab-case español.
   - Mobile-first absoluto.

---

*Suerte, hermano. Que Dios bendiga el proyecto. 🙏*

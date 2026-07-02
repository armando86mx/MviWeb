# HANDOFF — Sitio MVI Amor y Gracia
**Fecha:** 2 de julio de 2026 · **Para:** la siguiente sesión de trabajo
**Estado global:** sitio 100% terminado del lado del código, verificado y listo para publicar. Falta solo la publicación (pasos del dueño) y contenido futuro.

---

## 1. Ramas y estado del repo (github.com/armando86mx/MviWeb — PRIVADO)

| Rama | Qué es | Estado |
|---|---|---|
| `main` | Código fuente completo (release) | = test-ux hasta b298ff9, push verificado |
| `test-ux` | Rama de trabajo diario | Todo el historial del rediseño |
| `deploy` | **SOLO el sitio construido** (huérfana, 1 commit, 56 archivos) | Creada y subida; verificada por 2 agentes (integridad + servido real): LISTA |

**Publicación (flujo elegido por el dueño):** pone el repo en público momentáneamente → hPanel → GIT → URL `https://github.com/armando86mx/MviWeb.git` + **rama `deploy`** + directorio vacío → jalar → repo a privado de nuevo. La rama deploy existe porque el Git de Hostinger NO corre builds (main publicaría código fuente Astro, no el sitio).
**Actualizaciones futuras:** `./scripts/deploy.sh` (build local con guards + push a la rama deploy) → volver a jalar en hPanel. Guía completa: `DEPLOY.md`.

## 2. Pendientes del DUEÑO (nada de código)

1. **Publicar**: pasos de arriba + en Hostinger: crear buzón `noreply@amorygraciapuebla.org`, subir `docs/amorygracia-config.example.php` renombrado a `amorygracia-config.php` en la carpeta RAÍZ del hosting (arriba de public_html), poner la contraseña real de noreply@, permisos 600. Notificaciones llegan a `web@amorygraciapuebla.org`. Sin esto el formulario degrada amable (descarga directa).
2. **Smoke test** post-publicación: checklist en DEPLOY.md §3 (incluye probar el formulario con correo real).
3. **Search Console** + enviar sitemap (GBP ya lo hizo el dueño — el lugar "MVI Amor y Gracia Puebla" en Maps es suyo).
4. **Fotos reales** (sesión planeada): fachada calle 4 Norte, interior, Tiempos de Mesa → para GBP y /sedes/amozoc (hoy sin fotos).
5. **Testimonios**: 2-3 citas de miembros con consentimiento (para /puebla y /contacto).
6. **Posts 3 y 4** (`draft: true` en src/content/blog/2026-07-01-*): revisión pastoral → cambiar a `draft: false` EN LOS DOS a la vez (se enlazan entre sí) → deploy.

## 3. Qué se hizo (resumen de la sesión del 1-2 jul)

- Botón Inicio en nav + favicons reales (isotipo navy en cuadro crema).
- Pilares del home → acordeón exclusivo `<details name>`; menú móvil como overlay con scroll-lock y foco gestionado.
- **Auditoría 5 skills** (impeccable audit+critique, web-design-guidelines, accessibility-review, design-critique, emil-design-eng) con verificación adversarial: 63 hallazgos → TODOS los P1/P2 aplicados y re-verificados 27/27. Reporte: `docs/auditoria-ux-ui-2026-07-01.md`. Impeccable 31→35/40.
- **Reestructura IA (decisiones del dueño):** /visitanos eliminada (contenido en /contacto#primera-visita, 301 en .htaccess), CTA del header = Contacto, /podcast eliminada.
- **Medios en el home** (tras pastores): "Últimas enseñanzas en YouTube" (4 videos, fila deslizable con scroll-snap, fachada nocookie) + "Escúchanos en Spotify" (4 episodios cuadrados, fachada clic-para-reproducir). Se hornean EN CADA BUILD desde el canal/show reales (lib/media.ts, sin API keys, timeouts 10s, doble fallback).
- Limpieza ponytail (~430 líneas, 620KB), fixes SEO (78/100→; geo real, titles, schema logo…), MapaEmbed clic-para-cargar, backend PHP del formulario, GA4 (G-D7DETX5K6P) + Clarity (xg61n17ylu) tras consentimiento LFPDPPP, kit de deploy.

## 4. Decisiones de marca/UX que NO se deben deshacer sin el dueño

- Colores de plataforma en titulares: YouTube **#C21807** (rojo ladrillo — el #FF0000 gritaba, decidido con mockups A/B/C), Spotify **#159743**. Solo titulares grandes (≥3:1); NO partir "YouTube" en dos colores; NO imitar el wordmark con chip (riesgo legal, brand guidelines de Google).
- Hover de tarjetas de medios: sombra de plataforma tintada + zoom 1.03 interior + pastilla 1.1, SIN translateY (el carril `overflow-x:auto` decapita lo que sobresale — regla dura).
- Subrayado ámbar del nav activo se queda (1.86:1 decorativo — les gusta a los pastores). Sin `tel:` (decisión del dueño, el número es WhatsApp). Excepción AA vigente: refs tan-500 + eyebrows ocre-600.
- Todo hover bajo `@media (hover:hover) and (pointer:fine)`; fachadas con anillo de foco INTERNO (offset -4px; el externo lo recorta overflow:hidden).

## 5. Trampas técnicas conocidas (leer antes de tocar)

- **RSS de YouTube intermitente**: exige host sin www + UA de navegador y aun así a veces 404 → media.ts tiene fallback (página del canal + oEmbed). Los medios se refrescan SOLO al rebuild.
- **Astro no escopa clases condicionales** `class={cond ? 'x' : ''}` → usar clases estáticas o selectores de hermanos.
- **Spotify** reproduce 30s de preview a visitantes sin sesión (limitación de Spotify, el dueño lo sabe).
- Guards del build: `check-placeholders` y `check-contrast` corren en `pnpm build` y lo tumban si fallan.
- El preview de Claude: puerto vía env PORT (astro.config lo lee); tras iframes de prueba el capture-viewport se corrompe (reiniciar server).
- `docs/kynoz-reference/kynoz-config.php` tiene CONTRASEÑAS REALES de Kynoz — está gitignored y NUNCA se ha subido; no tocarlo ni des-ignorarlo.

## 6. ⚠️ Fricciones de esta sesión (el dueño dijo "hay cosas que no me están pareciendo")

No especificó cuáles. Contexto de las últimas fricciones, para que la próxima sesión pregunte primero y no asuma:
1. **El flujo de deploy**: expliqué de más (rsync/SSH/deploy keys) cuando su flujo real es simple: repo público momentáneo → URL + rama `deploy` en hPanel → privado otra vez. Eso quedó resuelto y verificado, pero la comunicación le frustró — **ser breve y directo con él; entregar primero, explicar solo si pregunta**.
2. La revisión del archivo Kynoz le pareció irrelevante (resultó estar bien protegido).
3. Posible pendiente emocional: quiere sentir que "está todo listo" — la próxima sesión debería abrir preguntando QUÉ cosas no le están pareciendo (¿diseño? ¿flujo? ¿algo del sitio?) antes de hacer nada.

## 7. Cómo retomar

```bash
pnpm dev          # desarrollo (preview de Claude: amorygracia-dev)
pnpm build        # build + guards
./scripts/deploy.sh  # publica a la rama deploy
```
- Memoria persistente de Claude: se carga sola (MEMORY.md + mvi-*.md) — tiene todo el detalle histórico.
- Documentos clave: `DEPLOY.md` (publicación), `docs/auditoria-ux-ui-2026-07-01.md` (auditoría), `ARCHITECTURE.md`, `SEO-STRATEGY.md`, `PRODUCT.md`, `design_handoff_calidez_equilibrio/SISTEMA_DE_DISENO.md` (leer antes de tocar estilos).

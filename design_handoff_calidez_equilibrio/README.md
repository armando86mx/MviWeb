# Handoff: Rediseño de marca "Equilibrio" — MVI Amor y Gracia

> Paquete para reconstruir el sitio existente aplicándole el estilo gráfico **Equilibrio (Opción A)**.

---

## 1. Qué es esto

Este paquete contiene **la dirección visual completa** que definimos para el sitio de la iglesia
**MVI Amor y Gracia**, en su variante **"Equilibrio" (Opción A)**: el azul de marca sigue al mando,
pero el sitio se entibia con papel crema, ámbar y "luz de tarde".

El objetivo del desarrollador (Claude Code) es:

> **Reconstruir / re-estilizar el sitio que ya existe para que se vea EXACTAMENTE con este estilo
> gráfico** — mismas sombras, misma forma de combinar colores, mismos tipos de letra, mismos
> estados de hover y transiciones. **No se cambia el contenido ni la estructura del sitio**: se
> cambia solo la piel visual.

## 2. Sobre los archivos de este paquete

Los archivos `.dc.html` dentro de `referencias/` son **prototipos de referencia hechos en HTML**.
Muestran el aspecto y el comportamiento buscados; **no son código de producción para copiar tal cual**.

- La tarea es **recrear estos diseños dentro del entorno del sitio real** (React / Vue / WordPress /
  Astro / lo que sea que ya use el proyecto), usando sus patrones y librerías establecidos.
- Los prototipos usan un pequeño runtime de plantillas (`support.js`, etiquetas `<x-dc>`, `<sc-for>`,
  `<sc-if>`, `{{ … }}` y un bloque `data-props`). **Todo eso es andamiaje del prototipo; ignóralo.**
  Lo que importa son los **estilos en línea** (colores, sombras, tamaños, radios): esos son la
  **fuente de verdad**.
- Si el sitio actual aún no tiene un entorno definido, elige el framework más apropiado e impleméntalo ahí.

## 3. Fidelidad: **ALTA (hi-fi)**

Estos mocks son de **alta fidelidad**: colores, tipografía, espaciado, sombras y estados finales.
Reprodúcelos **pixel-perfect** con las librerías y patrones que ya use el codebase. No "interpretes"
el estilo: los valores exactos están documentados en `SISTEMA_DE_DISENO.md` y `tokens.css`.

## 4. Cómo abordar el trabajo

1. **Lee primero `SISTEMA_DE_DISENO.md`.** Contiene toda la paleta, tipografía, escala de espaciado,
   radios, **sombras (la firma del estilo)**, efectos y **recetas de cada componente** con su CSS exacto.
2. **Usa `tokens.css`** (o el snippet de Tailwind en `tailwind.tokens.js`) como base. Ya trae todas las
   variables con nombres semánticos. Cárgalo una vez y refactoriza los componentes existentes para
   consumir esas variables en lugar de los colores/valores actuales.
3. **Re-estiliza página por página**, conservando el HTML/estructura y el copy que ya existen:
   - Empieza por los **componentes globales** (nav, footer, botones, tarjetas, "eyebrow" labels),
     porque se repiten en todo el sitio.
   - Luego cada plantilla de página.
4. **No inventes componentes nuevos ni cambies textos.** Si una página del sitio real usa un patrón
   que no está documentado (p. ej. un formulario, una tabla), constrúyelo **con el mismo lenguaje**:
   papel crema, bordes ámbar, sombras teñidas, tipografía Newsreader/Hanken, radios de pastilla.

## 5. Pantallas incluidas como referencia

Documentamos a fondo **dos páginas**, que entre las dos contienen **todos los patrones** del sistema.
El resto de páginas del sitio (Nosotros, Reuniones, Recursos, Blog, Contacto…) se re-estilizan
componiendo estos mismos patrones.

> 📸 **Capturas de referencia** en `capturas/`: `home-opcion-a-equilibrio.png` (la home, Opción A,
> ya limpia — sin anotaciones ni marco de navegador) y `lo-que-creemos-equilibrio.png` (página
> completa). Son el objetivo visual exacto a reproducir.

### 5.1 — Home / Portada  → `referencias/Calidez Familiar - MVI.dc.html`
> **Importante:** este archivo es un documento comparativo con tres versiones (Hoy / Opción A /
> Opción B). **Solo nos interesa la "OPCIÓN A · EQUILIBRIO".** Ignora el bloque "ANTES" y el bloque
> "OPCIÓN B · CALIDEZ PLENA" — son alternativas descartadas. También ignora el marco de navegador
> (barra con semáforos y URL), el "termómetro de marca" y la tabla "Qué cambió": son andamiaje de la
> presentación, **no** parte del sitio.

Contiene, en estilo Equilibrio:
- **Barra de navegación** (logo + enlaces + botón "Visítanos").
- **Hero claro a dos columnas**: eyebrow con guion, titular serif con una línea en itálica, párrafo,
  botón primario + enlace subrayado, y un **placeholder de foto** (mesa/rostros de la comunidad).
- **Banda de tarjetas sobre navy** (3 tarjetas numeradas con borde ámbar).

### 5.2 — Lo que creemos  → `referencias/Lo que creemos - Equilibrio.dc.html`
Página completa y "canónica" del estilo. Contiene:
- **Nav** (con estado activo subrayado en ámbar).
- **Hero oscuro** (navy con degradado + luz ámbar radial).
- **5 Pilares**: lista de tarjetas crema con número en círculo azul, título, texto y referencia bíblica.
- **Declaración de fe**: grid de 2 columnas de credos con borde superior y "bullet" ámbar cuadrado.
- **Cita bíblica** (bloque con barra ámbar a la izquierda, serif en itálica) — con dos fondos posibles.
- **FAQ**: filas con pregunta serif + signo "+".
- **CTA "serie Crecer"** sobre navy con luz radial.
- **Footer** de 4 columnas sobre navy oscuro.

## 6. Lo que NO cambia (queda intacto)

- **El logotipo** (círculo negro con cruz blanca; en el footer, cuadrado crema con cruz navy).
- **El nombre y el lema**: "Somos iglesia · Hacemos iglesia · Hacemos familia".
- **Todo el texto / copy** del sitio existente.
- **El azul de marca**: no desaparece, se vuelve más profundo y cálido y se apoya en el ámbar.

## 7. Archivos de este paquete

| Archivo | Para qué |
|---|---|
| `README.md` | Este documento. Empieza aquí. |
| `SISTEMA_DE_DISENO.md` | **La referencia técnica completa**: tokens + recetas de componentes con CSS exacto. |
| `tokens.css` | Variables CSS listas para usar (colores, sombras, radios, tipografía, gradientes) + clases utilitarias de los hover firma. |
| `tailwind.tokens.js` | Igual que arriba pero como extensión de `theme` para proyectos con Tailwind (opcional). |
| `referencias/Calidez Familiar - MVI.dc.html` | Prototipo de la **home** (usar solo Opción A). |
| `referencias/Lo que creemos - Equilibrio.dc.html` | Prototipo de la página **Lo que creemos** (canónica). |
| `referencias/support.js` | Runtime de los prototipos (solo para que los `.dc.html` rendericen si los abres en el navegador). |
| `capturas/home-opcion-a-equilibrio.png` | Captura limpia de la **home** (Opción A). |
| `capturas/lo-que-creemos-equilibrio.png` | Captura limpia de la página **Lo que creemos**. |

## 8. Cómo ver los prototipos

Abre cualquiera de los `.dc.html` de `referencias/` directamente en un navegador (necesitan
`support.js`, que va incluido en la misma carpeta y ya está referenciado). Se sirven mejor desde un
servidor local simple (`npx serve` o similar) por las fuentes de Google.

## 9. Implementación en tu stack (Astro 5 + TypeScript + Hostinger + PHP)

El sitio es **Astro 5 estático (SSG)** con CSS por tokens, desplegado por SSH a Hostinger y **PHP**
para los formularios. Guía concreta para reproducir el estilo Equilibrio en ese entorno:

### 9.1 Tokens y estilos globales
- Copia `tokens.css` a `src/styles/tokens.css`. Si ya tienes un archivo de tokens, **fusiona** estas
  variables ahí (respeta los nombres). Impórtalo **una sola vez** en tu layout raíz:
  ```astro
  ---
  // src/layouts/Base.astro
  import '../styles/tokens.css';
  ---
  <html lang="es">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    </head>
    <body><slot /></body>
  </html>
  ```
  (Opcional: auto-hospeda las fuentes en `public/fonts/` para no depender de Google en producción.)
  El `tailwind.tokens.js` **no lo necesitas** si sigues con CSS por tokens; ignóralo.

### 9.2 Componentes `.astro`
- Convierte cada patrón (§7 de `SISTEMA_DE_DISENO.md`) en un componente reutilizable:
  `Nav.astro`, `Footer.astro`, `Boton.astro`, `Tarjeta.astro`, `Eyebrow.astro`, `Hero.astro`…
- Usa `<style>` con alcance de componente y **consume las variables** (no repitas hex a mano). Los
  estados hover son **CSS puro** (`:hover`), sin JS. Ejemplo:
  ```astro
  ---
  // src/components/Boton.astro
  interface Props { href?: string; variante?: 'primario' | 'ambar'; }
  const { href = '#', variante = 'primario' } = Astro.props;
  ---
  <a class:list={['btn', variante]} href={href}><slot /></a>
  <style>
    .btn{ display:inline-flex; border-radius:var(--radius-pill); font:700 15.5px/1 var(--font-body);
      padding:15px 28px; white-space:nowrap;
      transition:transform var(--dur-btn), box-shadow var(--dur-btn), background var(--dur-btn); }
    .primario{ background:var(--blue-700); color:var(--cream-text); box-shadow:var(--shadow-btn-hero); }
    .primario:hover{ background:#2B4079; transform:translateY(-2px); box-shadow:var(--shadow-btn-hero-hover); }
    .ambar{ background:var(--amber-500); color:var(--blue-cta-text); box-shadow:var(--shadow-cta-amber); }
    .ambar:hover{ background:var(--amber-600); transform:translateY(-2px); box-shadow:var(--shadow-cta-amber-hover); }
  </style>
  ```

### 9.3 Imágenes
- Sustituye los placeholders (mesa / rostros / luz de tarde) por fotos reales. En SSG usa
  `astro:assets` (`import { Image } from 'astro:assets'`) con archivos en `src/assets/` para
  optimización automática; o `public/` si prefieres control manual. Mantén el radio `--radius-photo`
  (20px) y una sombra suave equivalente a `--shadow-photo`.

### 9.4 Formularios con PHP (estático + Hostinger)
Astro estático no procesa PHP; el PHP corre en Hostinger (Apache + PHP). Patrón:
- Pon el script en `public/` para que se copie tal cual al build:
  `public/procesar-contacto.php` → en producción queda como `/procesar-contacto.php`.
- El formulario apunta ahí y usa el mismo sistema visual:
  ```html
  <form method="POST" action="/procesar-contacto.php">
    <input type="text" name="nombre" required />
    <input type="email" name="email" required />
    <textarea name="mensaje" required></textarea>
    <button type="submit" class="btn primario">Enviar</button>
  </form>
  ```
- En el PHP: valida y sanitiza en servidor, envía correo (`mail()` de Hostinger o SMTP con PHPMailer),
  añade anti-spam (honeypot / token) y redirige de vuelta con éxito
  (`header('Location: /contacto/?ok=1')`). **Nunca** pongas credenciales en el sitio estático: van
  solo dentro del PHP en el servidor.
- Estiliza los campos igual que el resto: fondo `--paper-100`, borde `1.5px solid var(--paper-line)`,
  radio `--radius-sm`, y en `:focus` borde `--amber-500`.

### 9.5 Build y despliegue (SSH → Hostinger)
- `astro build` genera `dist/` (HTML estático + assets + tus `.php` copiados desde `public/`).
- En `astro.config.mjs` fija `site: 'https://mviamorygracia.org'`. Astro emite carpetas con
  `index.html` (URLs limpias) que Apache de Hostinger sirve directo.
- Sube el contenido de `dist/` a `public_html/` por SSH/rsync:
  ```bash
  npm run build
  rsync -avz --delete dist/ usuario@servidor:~/public_html/
  ```
  (`--delete` deja el servidor idéntico al build; omítelo si guardas ahí archivos ajenos al build.)
- Verifica permisos de los `.php` (644) y que PHP esté activo en el hosting.

---

**En una frase:** *la marca no se reemplaza, se entibia.* Reconstruye el sitio con este sistema —
azul profundo + papel crema + ámbar, sombras teñidas que pasan a ámbar en hover, serif Newsreader
para lo emotivo y Hanken Grotesk para el resto.

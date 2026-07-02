# Sistema de diseño — "Equilibrio" · MVI Amor y Gracia

Referencia técnica completa. Todos los valores son **exactos** (extraídos de los prototipos hi-fi).
Acompaña a `tokens.css`, que ya expone todo esto como variables CSS.

---

## 0. Filosofía visual (léela antes de tocar código)

El sitio parte de un sistema **frío**: azul saturado sobre negro, ordenado pero distante. "Equilibrio"
lo **entibia sin renunciar a la marca**:

1. **El azul sigue liderando**, pero más **profundo y cálido** (`#25386A`, `#1E2C52`), nunca sobre negro.
2. **Fondos de papel crema** en familia (no blanco puro): la base es cálida.
3. **El ámbar `#DFA24E` es el color de la calidez**: bordes de tarjeta, acentos, subrayados, y —clave—
   **las sombras se tiñen de ámbar en hover**.
4. **"Luz de tarde"**: un degradado radial ámbar muy sutil se superpone sobre heros y bandas oscuras.
5. **Dos familias tipográficas**: **Newsreader** (serif) para titulares y lo emotivo (con itálicas de
   acento), **Hanken Grotesk** (sans) para UI, cuerpo y etiquetas.

La **firma inconfundible** del estilo son las **sombras de color**: en reposo son navy y sutiles; al
hacer hover se agrandan y **cambian a ámbar** — como si un foco cálido se encendiera bajo el elemento.
Reproduce esto con fidelidad; es lo que hace que el sitio "se sienta" distinto.

---

## 1. Color

### 1.1 Cremas (papel cálido) — fondos claros
| Token | Hex | Uso |
|---|---|---|
| `--paper-100` | `#FCF8EF` | Tarjetas (pilares) — la crema más clara |
| `--paper-200` | `#F4EFE6` | **Fondo principal** del sitio y del hero claro |
| `--paper-300` | `#F0EADD` | Sección alterna ("Lo que afirmamos") |
| `--paper-400` | `#EFEAE0` | Barra de navegación |
| `--paper-500` | `#EBE4D6` | Sección más oscura (FAQ) |
| `--paper-line` | `#E4DAC6` | Divisores / bordes sobre crema |
| `--paper-line-2` | `#DECFB4` | Borde superior de credos |
| `--paper-line-3` | `#DBCFB6` | Divisor de filas FAQ |

### 1.2 Azules (marca — profundos y cálidos)
| Token | Hex | Uso |
|---|---|---|
| `--blue-500` | `#3A548C` | Azul claro (línea en itálica del hero) |
| `--blue-700` | `#25386A` | **Azul primario**: botones, títulos, círculos numerados |
| `--blue-800` | `#243766` | Inicio de degradados oscuros |
| `--blue-900` | `#1E2C52` | Navy profundo: banda de tarjetas |
| `--blue-950` | `#1A2747` | Navy más oscuro: footer, fin de degradados |
| `--blue-cta-text` | `#22305A` | Texto azul sobre botón ámbar/crema |

### 1.3 Ámbar / oro (calidez) — el acento
| Token | Hex | Uso |
|---|---|---|
| `--amber-400` | `#E7B870` | Ámbar claro: etiquetas sobre oscuro, hover de enlaces |
| `--amber-500` | `#DFA24E` | **ÁMBAR PRIMARIO**: bordes, acentos, sombras hover, subrayados |
| `--amber-600` | `#E7B262` | Hover del botón ámbar |
| `--ochre-500` | `#C98A33` | Ocre medio: signo "+" de FAQ, subrayado de guion/enlace |
| `--ochre-600` | `#B07A2E` | Ocre oscuro: etiquetas "eyebrow" sobre crema, hover de nav |
| `--tan-500` | `#A8906C` | Tostado apagado: metadatos (referencia bíblica) |

### 1.4 Texto
| Token | Hex / valor | Uso |
|---|---|---|
| `--ink` | `#2B2620` | Texto principal (casi negro cálido) sobre crema |
| `--ink-logo` | `#20242e` | Texto del logotipo |
| `--ink-muted` | `#7E7A6E` | Gris cálido apagado (subtítulo del logo) |
| `--nav-text` | `#3C382F` | Enlaces de navegación |
| `--cream-text` | `#F4ECDD` | Texto sobre fondo oscuro |
| `--cream-text-2` | `#F2ECDD` | Variante (títulos de tarjeta sobre navy, footer) |
| `--slate-text` | `#C2C9DB` | Texto azul-gris sobre oscuro (párrafos hero/CTA) |
| `--slate-text-2` | `#C3CADB` | Texto de tarjeta sobre navy |
| `--footer-muted` | `#9FA8BF` | Dirección en footer |
| `--footer-copyright` | `#8A93AD` | Copyright y links legales |

**Texto de cuerpo sobre crema con opacidad** — se usa `rgba(43,37,30,α)` (un tinte ~`#2B251E`):
- `α = 0.74` → intros / párrafos secundarios
- `α = 0.78 – 0.80` → cuerpo de tarjetas y credos

### 1.5 Especiales
| Token | Valor | Uso |
|---|---|---|
| `--logo-mark` | `#0B0B0C` | Círculo del logo (casi negro) |
| `::selection` | fondo `#DFA24E`, texto `#1E2C52` | Selección de texto |

---

## 2. Tipografía

**Fuentes (Google Fonts):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```
- **Display / titulares:** `'Newsreader', Georgia, serif` — pesos 400/500/600 + **itálicas** (400/500).
  El peso por defecto de titulares es **500**. La itálica se usa para dar calidez/énfasis emotivo.
- **Cuerpo / UI:** `'Hanken Grotesk', system-ui, sans-serif` — pesos 400/500/600/700/800.
- `Space Mono` aparece en el prototipo de la home solo para etiquetas del *documento de presentación*
  (no del sitio). **No forma parte del estilo del sitio; no lo uses.**

Ajustes globales: `-webkit-font-smoothing:antialiased; text-rendering:optimizeLegibility;`

### Escala tipográfica
| Rol | Fuente / peso | Tamaño | Interlínea | Tracking | Color típico |
|---|---|---|---|---|---|
| H1 hero (oscuro) | Newsreader 500 | 60px | 1.04 | -0.015em | `--cream-text` |
| H1 hero (claro) | Newsreader 500 | 52px | 1.02 | -0.01em | `--blue-700` |
| H2 sección | Newsreader 500 | 40–42px | 1.08–1.1 | -0.01em | `--blue-700` / crema |
| H3 título de tarjeta | Newsreader 500 | 24–25px | — | — | `--blue-700` / crema |
| H3 credo | Newsreader 600 | 20px | — | — | `--blue-700` |
| Pregunta FAQ | Newsreader 500 | 21px | — | — | `--blue-700` |
| Cita (blockquote) | Newsreader 400 *italic* | 30px | 1.4 | — | crema / azul |
| Párrafo grande (hero) | Hanken 400 | 18–19px | 1.6 | — | `--slate-text` / ink 74% |
| Párrafo | Hanken 400 | 16–17px | 1.6–1.65 | — | ink 74–80% |
| Cuerpo pequeño | Hanken 400 | 14.5–15.5px | 1.5–1.6 | — | ink / slate |
| **Eyebrow** (etiqueta) | Hanken **700** | 12–12.5px | — | **0.16–0.2em** · UPPERCASE | `--ochre-600` (claro) / `--amber-400` (oscuro) |
| Enlaces de nav | Hanken 500 | 14.5px | — | — | `--nav-text` |
| Etiqueta de footer | Hanken 700 | 11px | 0.18em · UPPERCASE | — | `--amber-400` |
| Marca (logo texto) | Hanken 800 | 15px | 0.01em | — | `--ink-logo` |
| Sub-marca (logo) | Hanken 600 | 8.5px | 0.2em · UPPERCASE | — | `--ink-muted` |

---

## 3. Espaciado, contenedores y radios

**Contenedores (max-width, centrados con `margin:0 auto`):**
- `880px` — secciones de texto denso (hero "Lo que creemos", pilares).
- `980px` — declaración de fe.
- `1080px` — hero, CTA.
- `1200px` — nav y footer.

**Padding de sección:** vertical `100–104px`, horizontal `48px` (los prototipos usan `48px` o `56px`
dentro del marco; usa **48px** como estándar de sección a ancho completo).

**Radios de borde:**
| Token | Valor | Uso |
|---|---|---|
| `--radius-pill` | `999px` | Botones, pastillas, chips |
| `--radius-card` | `18px` | Tarjetas de pilares |
| `--radius-photo` | `20px` | Placeholder de foto |
| `--radius-card-sm` | `16px` | Tarjetas sobre banda navy |
| `--radius-md` | `14px` | Paneles suaves |
| `--radius-sm` | `12px` | Contenedores menores |
| `--radius-xs` | `10px` | Fila FAQ |
| `--radius-chip` | `6px` | Chips / cuadrito de bullet (2px en el punto) |

---

## 4. Sombras — **la firma del estilo**

Principios: **teñidas de color** (nunca gris neutro), **blur grande**, **spread negativo** (suaves y
ceñidas), **opacidad baja**. En reposo son **navy**; en **hover** crecen y pasan a **ámbar**.

| Token | Valor | Uso |
|---|---|---|
| `--shadow-btn` | `0 10px 24px -12px rgba(30,44,90,0.6)` | Botón primario (reposo) |
| `--shadow-btn-hover` | `0 16px 30px -12px rgba(223,162,78,0.6)` | Botón primario (hover → ámbar) |
| `--shadow-btn-hero` | `0 16px 32px -12px rgba(30,44,90,0.55)` | Botón primario del hero (reposo) |
| `--shadow-btn-hero-hover` | `0 18px 40px -12px rgba(223,162,78,0.62)` | …hover → ámbar |
| `--shadow-card-hover` | `0 22px 48px -22px rgba(223,162,78,0.5)` | Tarjeta pilar (hover) |
| `--shadow-card-sm-hover` | `0 18px 42px -16px rgba(223,162,78,0.5)` | Tarjeta sobre navy (hover) |
| `--shadow-cta-amber` | `0 16px 34px -12px rgba(223,162,78,0.55)` | Botón ámbar (reposo) |
| `--shadow-cta-amber-hover` | `0 20px 40px -12px rgba(223,162,78,0.7)` | Botón ámbar (hover) |
| `--shadow-cta-cream` | `0 16px 34px -14px rgba(0,0,0,0.4)` | Botón crema sobre oscuro |
| `--shadow-photo` | `inset 0 0 0 1px rgba(80,75,55,0.18), 0 20px 40px -22px rgba(50,55,90,0.4)` | Placeholder de foto |

> Regla mental: **navy = reposo, ámbar = atención**. Cualquier elemento interactivo que levante en
> hover debe además cambiar su sombra a ámbar.

---

## 5. Gradientes de "luz de tarde"

Se superpone un radial ámbar muy tenue sobre el color base. Tokens en `tokens.css`:

- **Hero claro** (`--warm-hero-light`):
  ```css
  radial-gradient(120% 85% at 90% 10%, rgba(223,162,78,0.16) 0%, rgba(223,162,78,0) 55%), #F4EFE6
  ```
- **Hero oscuro** (`--warm-hero-dark`):
  ```css
  radial-gradient(110% 90% at 85% 0%, rgba(223,162,78,0.18) 0%, rgba(223,162,78,0) 52%),
  linear-gradient(160deg,#243766 0%,#1E2C52 55%,#1A2747 100%)
  ```
- **CTA oscuro** (`--warm-cta-dark`):
  ```css
  radial-gradient(100% 120% at 12% 0%, rgba(223,162,78,0.16) 0%, rgba(223,162,78,0) 55%),
  linear-gradient(150deg,#243766,#1A2747)
  ```
- **Luz sobre foto**: `radial-gradient(80% 60% at 50% 40%, rgba(255,248,233,0.5), rgba(255,248,233,0) 70%)`

---

## 6. Movimiento (transiciones y hover)

| Interacción | Transición | Cambio |
|---|---|---|
| Botones | `transform .18s ease, box-shadow .18s ease, background .18s ease` | `translateY(-2px)` + sombra ámbar |
| Tarjetas | `transform .2s ease, box-shadow .2s ease, border-color .2s ease` | `translateY(-4px)` + sombra ámbar + borde ámbar más opaco |
| Enlaces de texto | `color .15–.16s ease` | color → `--ochre-600` (claro) / `--amber-500` (oscuro) |
| Fila FAQ | `background .16s ease` | fondo → `rgba(223,162,78,0.12)` |

Subrayados de enlace: `text-decoration-color: var(--amber-500)` con `text-underline-offset: 4–5px`.

---

## 7. Recetas de componentes (CSS exacto)

> Los ejemplos usan las variables de `tokens.css`. Adáptalos a los componentes que ya existan en el
> codebase (no crees duplicados): lo que importa es que los **valores finales** coincidan.

### 7.1 Barra de navegación
- Fondo `--paper-400`, `border-bottom:1px solid rgba(80,70,50,0.1)`.
- Fila interior: `max-width:1200px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; padding:18px 48px;`
- **Logo**: círculo `46px` `background:var(--logo-mark)` con una **cruz blanca** hecha de dos rectángulos
  redondeados centrados (vertical `11×27px`, horizontal `25×11px`, `border-radius:6px`, `background:#fff`).
- Textos del logo: título Hanken 800 15px `--ink-logo`; subtítulo Hanken 600 8.5px `0.2em` UPPERCASE `--ink-muted`.
- **Enlaces**: Hanken 500 14.5px `--nav-text`; hover → `color:var(--ochre-600)` (`transition:color .15s ease`).
- **Enlace activo**: Hanken 600 `--blue-700` + `border-bottom:2px solid var(--amber-500); padding-bottom:3px`.
- **Botón "Visítanos"**: pastilla `background:var(--blue-700); color:#fff; font:600 14.5px; padding:11px 21px;
  border-radius:var(--radius-pill); box-shadow:var(--shadow-btn);`
  hover → `transform:translateY(-2px); box-shadow:var(--shadow-btn-hover)`.

### 7.2 Eyebrow (etiqueta de sección)
Dos formas:
- **Simple:** `font:700 12px Hanken; letter-spacing:0.2em; text-transform:uppercase;` color `--ochre-600`
  sobre crema, `--amber-400` sobre oscuro.
- **Con guion (hero home):** flex con un `<span>` de `width:22px; height:1.5px; background:var(--ochre-500)`
  seguido del texto en `--ochre-600`.

### 7.3 Hero oscuro (p. ej. "Lo que creemos")
```css
background: var(--warm-hero-dark);
/* contenido */ max-width:1080px; margin:0 auto; padding:104px 48px 112px;
```
- Eyebrow `--amber-400`.
- H1 Newsreader 500 60px/1.04, tracking -0.015em, `color:var(--cream-text)`.
- Párrafo 19px/1.6 `color:var(--slate-text)`, `max-width:620px`.

### 7.4 Hero claro a dos columnas (home)
- Fondo `var(--warm-hero-light)`, `display:flex; align-items:center; gap:50px; padding:60px 48px 64px;`
- Columna izq (`flex:1.08`): eyebrow con guion → H1 Newsreader 500 52px/1.02 `--blue-700` con **una línea
  en itálica** `color:var(--blue-500)` → párrafo `rgba(43,37,30,0.74)` → fila de acciones.
- Columna der (`flex:0.92`): **placeholder de foto** (ver 7.9).
- **Acciones:** botón primario + enlace-botón subrayado (ver 7.5).

### 7.5 Botones
**Primario (azul):**
```css
background:var(--blue-700); color:var(--cream-text); font:700 15.5px;
padding:15px 28px; border-radius:var(--radius-pill); box-shadow:var(--shadow-btn-hero);
transition:transform .18s, box-shadow .18s, background .18s; white-space:nowrap;
/* hover */ background:#2B4079; transform:translateY(-2px); box-shadow:var(--shadow-btn-hero-hover);
```
**Secundario (enlace subrayado que se rellena en hover):**
```css
color:var(--ink); font:600 15.5px; text-decoration:underline;
text-decoration-color:var(--ochre-500); text-underline-offset:4px;
padding:15px 22px; border-radius:var(--radius-pill);
transition:background .18s,color .18s,box-shadow .18s,transform .18s;
/* hover */ background:var(--amber-500); color:#fff; text-decoration:none;
box-shadow:0 16px 32px -14px rgba(223,162,78,0.7); transform:translateY(-2px);
```
**CTA ámbar (sobre navy):**
```css
background:var(--amber-500); color:var(--blue-cta-text); font:700 15.5px;
padding:16px 30px; border-radius:var(--radius-pill); box-shadow:var(--shadow-cta-amber);
/* hover */ background:var(--amber-600); transform:translateY(-2px); box-shadow:var(--shadow-cta-amber-hover);
```
**CTA crema (alternativo sobre navy):** igual pero `background:var(--cream-text); color:var(--blue-cta-text);
box-shadow:var(--shadow-cta-cream)`.

### 7.6 Tarjeta de pilar (crema, sobre fondo claro)
```css
display:flex; gap:30px; align-items:flex-start;
background:var(--paper-100); border:1.5px solid rgba(223,162,78,0.55);
border-radius:var(--radius-card); padding:32px 36px;
transition:transform .2s, box-shadow .2s, border-color .2s;
/* hover */ border-color:rgba(223,162,78,0.95); box-shadow:var(--shadow-card-hover); transform:translateY(-4px);
```
- **Número**: círculo `58px` `background:var(--blue-700)`, texto Newsreader 500 19px `--cream-text`.
- Título Newsreader 500 25px `--blue-700`; cuerpo 16px/1.6 `rgba(43,37,30,0.8)`;
  referencia Hanken 600 11.5px `0.16em` UPPERCASE `--tan-500`.

### 7.7 Tarjeta sobre banda navy (home)
```css
background:var(--blue-900); /* banda contenedora, padding:50px 48px 56px; grid 3 col; gap:22px */
/* tarjeta */
border:1.5px solid rgba(223,162,78,0.72); background:rgba(220,230,255,0.04);
border-radius:var(--radius-card-sm); padding:28px;
transition:transform .2s, box-shadow .2s, border-color .2s;
/* hover */ border-color:rgba(223,162,78,0.9); box-shadow:var(--shadow-card-sm-hover); transform:translateY(-4px);
```
- **Número**: círculo `42px` con `border:1.5px solid var(--amber-500)`, texto 700 13px `--amber-400`.
- Título Newsreader 500 24px `--cream-text-2`; cuerpo 14.5px/1.5 `--slate-text-2`.

### 7.8 Credo (grid de declaración de fe)
- Contenedor `display:grid; grid-template-columns:1fr 1fr; gap:14px 56px;`
- Ítem: `border-top:1px solid var(--paper-line-2); padding-top:22px;`
- Encabezado: fila flex con **cuadrito** `7×7px; border-radius:2px; background:var(--amber-500)` +
  título Newsreader 600 20px `--blue-700`.
- Texto 15.5px/1.6 `rgba(43,37,30,0.78)`.

### 7.9 Placeholder de foto (dónde irá una imagen real)
```css
height:420px; border-radius:var(--radius-photo);
background:repeating-linear-gradient(45deg,#E4DBC6 0 15px,#DCD1B8 15px 30px);
box-shadow:var(--shadow-photo); position:relative; overflow:hidden;
```
+ overlay de luz `radial-gradient(80% 60% at 50% 40%, rgba(255,248,233,0.5), rgba(255,248,233,0) 70%)`.
En el sitio real: **sustituir por foto** de mesa compartida / rostros de la comunidad / luz de tarde.

### 7.10 Cita (blockquote)
- **Sobre navy:** fondo `linear-gradient(160deg,#243766,#1A2747)`; barra izquierda `width:4px;
  border-radius:2px; background:var(--amber-500)`; texto Newsreader **italic** 400 30px/1.4 `--cream-text`;
  referencia Hanken 700 12px `0.18em` UPPERCASE `--amber-400`.
- **Sobre crema:** fondo `--paper-200` con borde arriba/abajo `--paper-line`; texto `--blue-700`;
  referencia `--ochre-600`.

### 7.11 Fila FAQ
```css
display:flex; align-items:center; justify-content:space-between; gap:20px;
padding:24px 16px; border-bottom:1px solid var(--paper-line-3); border-radius:var(--radius-xs);
cursor:pointer; transition:background .16s;
/* hover */ background:rgba(223,162,78,0.12);
```
- Pregunta Newsreader 500 21px `--blue-700`; signo "+" 26px `--ochre-500`.
- Sección FAQ sobre fondo `--paper-500`.

### 7.12 CTA sobre navy
- Fondo `var(--warm-cta-dark)`, `padding:96px 48px`.
- Layout flex: bloque de texto (eyebrow `--amber-400` → H2 Newsreader 500 42px `--cream-text` →
  párrafo `--slate-text`) + columna de acciones (botón CTA ámbar + enlace subrayado ámbar).

### 7.13 Footer
- Fondo `--blue-950`, `padding:80px 48px 0`.
- Grid `grid-template-columns:1.4fr 1fr 1fr 1.2fr; gap:40px; max-width:1200px`.
- **Logo footer**: cuadrado `44px; border-radius:12px; background:var(--cream-text-2)` con cruz
  `--blue-900` (mismos rectángulos redondeados que el nav pero invertidos de color).
- Nombre Newsreader 500 20px `--cream-text-2`; **lema en itálica** Newsreader 17px `--amber-500`
  ("Somos iglesia · Hacemos iglesia · Hacemos familia").
- Etiquetas de columna Hanken 700 11px `0.18em` UPPERCASE `--amber-400`.
- Enlaces 14.5px `--slate-text`; hover → `--amber-500`.
- Barra inferior: `border-top:1px solid rgba(255,255,255,0.1)`; copyright y legales `--footer-copyright`.

---

## 8. Checklist de fidelidad

- [ ] Ningún fondo blanco puro en zonas claras: usar familia crema (`--paper-*`).
- [ ] Ningún azul sobre negro: azules profundos sobre crema o navy cálido.
- [ ] Titulares en **Newsreader**; itálica reservada para acento emotivo.
- [ ] UI/cuerpo/eyebrows en **Hanken Grotesk**.
- [ ] Botones y chips con radio **999px**.
- [ ] **Sombras teñidas**: navy en reposo, **ámbar en hover**, con `translateY` de levantamiento.
- [ ] Bordes de tarjeta en ámbar translúcido que se **intensifican** en hover.
- [ ] "Luz de tarde" radial ámbar sobre heros y bandas oscuras.
- [ ] Logo, nombre, lema y todo el copy **intactos**.

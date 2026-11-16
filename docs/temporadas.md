# Temporadas del sitio

La decoración temporal se controla en `src/lib/season.ts`.

- `enabled: true`: activa la temporada seleccionada en `current`.
- `enabled: false`: recupera la presentación habitual de Inicio, Blog y Reuniones.
- Para probar la versión habitual sin editar archivos: `SITE_SEASON=none pnpm dev`.
- Para comprobar el resultado estático sin temporada: `SITE_SEASON=none pnpm build`.

El sitio es estático: cambiar este ajuste requiere reconstruir y publicar. No es
un control visible para visitantes. Una selección desconocida desactiva la temporada.

La desactivación elimina la diapositiva y el bloque de Inicio, la flama y el destacado del Blog y
la nota del Servicio Dominical. El artículo sigue en el listado normal del Blog,
en su dirección, en el RSS y en el sitemap; conserva su ilustración.

La animación del bloque de Inicio ocurre una sola vez al aparecer, solo en
pantallas desde 768 px con puntero preciso y sin preferencia de movimiento reducido.
El contenido permanece visible cuando JavaScript está desactivado.

El slider de Inicio abre con el arte de la serie durante 6 segundos y después
continúa con las fotografías habituales, 3 segundos por foto. La campaña usa
su composición vertical en pantallas en retrato y la horizontal en paisaje;
el encuadre central llena el hero y mantiene el título dentro del área visible.
La campaña lleva un velo crema, suave sobre el título y más intenso en los
bordes, para acercarla al tono de las fotografías. Su fundido dura 1.4 segundos;
el rótulo "NUEVA SERIE" aparece centrado bajo la punta del corazón, separado
del título y de sus trazos. Usa Hanken Grotesk seminegrita, 18–22 px, espaciado
amplio y color marrón oscuro, sin fondo ni sombra.
La bienvenida aparece después de que la campaña termine de salir y solo
acompaña las fotos. Los archivos están en `src/assets/img/seasons/`,
separados del directorio de fotos para que desactivar la temporada los retire.
Con movimiento reducido al cargar, el slider queda estático en la primera
diapositiva. Si se activa esa preferencia durante la reproducción, se detiene
en la diapositiva actual.

Para una serie futura, añadir su información a `seasons` y seleccionar su clave
en `current`; revisar también su ilustración en `SeasonBanner.astro`. Los componentes
no alteran el logotipo, navegación, colores globales ni las páginas de otras sedes.

## Revisión de El celo por tu casa

Esta versión vive en `codex/serie-el-celo-por-tu-casa`. El flujo de publicación
actual despliega `main`; subir esta rama no publica el sitio. No fusionar ni
ejecutar el despliegue hasta la aprobación del usuario.

El artículo se incorporó del DOCX `2026-11-15-el-celo-por-tu-casa.docx` para
revisar la experiencia completa. No se publicaron sus notas editoriales.
Se incorporaron las correcciones de la versión recibida el 16 de noviembre
de 2026, conservando el texto y la estructura del documento.
Conserva la firma propuesta «Pastora Rocío Chávez». Antes de aprobar la
publicación, revisar los pendientes del documento: firma, título/dirección y
referencias añadidas sobre Obed-edom, David y Apocalipsis. Su dirección en esta
propuesta es `/blog/el-celo-por-tu-casa`.

La imagen original aprobada se conserva sin recorte ni retoque en
`src/assets/img/blog/el-celo-por-tu-casa.png` (1200 × 630). Astro genera versiones
WebP de distintos tamaños para servirla con menor peso.

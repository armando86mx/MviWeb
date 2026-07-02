# Product

## Register

brand

## Users

Personas en Amozoc, Tehuacán y la zona de Puebla que buscan una iglesia cristiana evangélica:
visitantes primerizos (muchos llegan desde el celular, vía búsqueda de Google, Facebook o WhatsApp),
miembros actuales que consultan horarios/ubicación/recursos, y creyentes que evalúan la sana doctrina
de la iglesia antes de visitar. Perfil mayoritariamente no técnico; se privilegia lectura fácil y
contacto por WhatsApp por encima de formularios.

## Product Purpose

Sitio oficial de MVI Amor y Gracia (reemplazo del WordPress anterior). Existe para: (1) que un
visitante potencial encuentre dirección, horarios y qué esperar en una visita; (2) comunicar identidad
doctrinal con honestidad (estudio bíblico profundo, adoración íntima, énfasis escatológico); (3)
distribuir recursos de crecimiento (Crecer 1-3, blog). Éxito = visitas presenciales un domingo y
contacto directo por WhatsApp. Mantenible por una sola persona, costo mínimo, SEO local fuerte.

## Brand Personality

Cálida, bíblica, serena. "Hacemos familia" — cercanía de mesa compartida, no espectáculo ni
mega-iglesia. La voz es honesta y enseñable ("no lo sabemos todo"). Visualmente: sistema "Equilibrio"
— papel crema cálido, azul profundo que lidera, ámbar como calidez (la firma son sombras que se
tiñen de ámbar en hover, "como un foco cálido bajo el elemento").

## Anti-references

- Sitios de mega-iglesia tipo espectáculo (heros de video con luces de concierto, countdown timers).
- Plantillas genéricas de iglesia (Squarespace church template: foto de manos alzadas + "Welcome Home").
- El WordPress anterior de la propia iglesia (lento, genérico).
- Frialdad corporativa: azul sobre negro, gradientes tech, glassmorphism.
- Cualquier reinterpretación "creativa" del logo/isotipo: la marca es sagrada (aro + cruz SIEMPRE juntos).

## Design Principles

1. **La mesa antes que el escenario** — el evangelio se ve mejor en cercanía; el diseño invita, no impresiona.
2. **Fidelidad al handoff Equilibrio** — los prototipos hi-fi en `design_handoff_calidez_equilibrio/` son el objetivo de fidelidad; no se reinterpreta la marca.
3. **Honestidad de datos** — nunca texto provisional al público: los datos sin confirmar no se renderizan (flags `confirmed`).
4. **Privacidad primero** — contacto por WhatsApp/redes, sin formularios de contacto; mínima recolección de datos.
5. **Sostenible por una persona** — CSS plano con tokens, sin frameworks UI, contenido en Markdown.

## Accessibility & Inclusion

Meta WCAG AA. Público amplio no técnico, incluye adultos mayores (texto legible, targets táctiles
≥44px). `prefers-reduced-motion` respetado en animaciones. Pendiente conocido y decisión del dueño:
refs bíblicas en `--tan-500` y eyebrows ocre quedan bajo AA en texto chico (fiel al handoff; usuario
informado, sin decidir).

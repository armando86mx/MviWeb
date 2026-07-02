<?php
/**
 * MVI Amor y Gracia — amorygracia-config.php (PLANTILLA — sin credenciales)
 *
 * El archivo real vive FUERA de public_html en Hostinger y NUNCA en git:
 *   /home/uXXXXXXXXX/amorygracia-config.php   ← archivo real (chmod 600)
 *   /home/uXXXXXXXXX/public_html/             ← el sitio (dist/)
 *
 * Pasos el día del deploy:
 *   1. Crear el buzón noreply@amorygraciapuebla.org en Hostinger (Correos).
 *   2. Copiar este archivo al home del servidor SIN el sufijo .example,
 *      rellenar la contraseña y: chmod 600 amorygracia-config.php
 *   3. Probar el formulario en /recursos/descargar (llega el correo con
 *      los 3 PDFs al visitante y la notificación a web@).
 */

// ── SMTP (un solo buzón: noreply@ envía todo) ──────────────
define('SMTP_HOST',    'smtp.hostinger.com');
define('NOREPLY_USER', 'noreply@amorygraciapuebla.org');
define('NOREPLY_PASS', 'CAMBIAR_AQUI');

// ── Notificaciones internas (quién se entera de cada descarga) ──
define('MAIL_TO', 'web@amorygraciapuebla.org');

// ── reCAPTCHA v3 (opcional: vacío = formulario funciona sin captcha) ──
// Al crear las llaves en https://www.google.com/recaptcha/admin:
//   - la SITE KEY va en el .env del build (PUBLIC_RECAPTCHA_SITE_KEY)
//   - la SECRET va aquí
define('RECAPTCHA_SECRET', '');

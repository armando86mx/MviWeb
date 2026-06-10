<?php
/**
 * KYNOZ — kynoz-config.php (EJEMPLO SANEADO — sin credenciales reales)
 *
 * El archivo real con credenciales vive FUERA del repositorio
 * (en Hostinger, un nivel arriba de public_html) y está en .gitignore.
 *
 * UBICACIÓN EN HOSTINGER:
 *   /home/uXXXXXXXXX/kynoz-config.php   ← AQUÍ va el archivo real
 *   /home/uXXXXXXXXX/public_html/       ← aquí está el sitio web
 *
 * NUNCA subas el archivo real a GitHub.
 */

// ── SMTP principal (recibe notificaciones internas) ────
define('SMTP_HOST', 'smtp.hostinger.com');
define('SMTP_USER', 'contacto@ejemplo.com');
define('SMTP_PASS', 'CAMBIAR_AQUI');
define('MAIL_TO',   'contacto@ejemplo.com');

// ── SMTP noreply (envía confirmación al cliente) ────────
define('NOREPLY_USER', 'noreply@ejemplo.com');
define('NOREPLY_PASS', 'CAMBIAR_AQUI');

// ── reCAPTCHA v3 ───────────────────────────────────────
// Déjalo vacío por ahora, agrégalo cuando tengas las keys de Google
define('RECAPTCHA_SECRET', '');

<?php
/**
 * KYNOZ — mail.php
 * Formulario de contacto con SMTP Hostinger + reCAPTCHA v3 + Honeypot
 * Multi-idioma: detecta `lang` (es|en) del input
 *
 * SEGURIDAD:
 * - Credenciales en kynoz-config.php FUERA de public_html
 * - Este archivo NUNCA debe subirse a GitHub
 */

$config_path = dirname(__DIR__) . '/kynoz-config.php';
if (!file_exists($config_path)) {
    http_response_code(500);
    exit(json_encode(['success' => false, 'message' => 'Configuration error. Please contact administrator. / Error de configuración.']));
}
require_once $config_path;

/* ── SEGURIDAD BÁSICA ─────────────────────────────────── */
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://kynozdigital.com');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['success' => false, 'message' => 'Method not allowed. / Método no permitido.']));
}

/* ── LEER DATOS ───────────────────────────────────────── */
$input    = json_decode(file_get_contents('php://input'), true) ?: $_POST;
$nombre   = sanitize($input['nombre']        ?? '');
$email    = sanitize($input['email']         ?? '');
$telefono = sanitize($input['telefono']      ?? '');
$empresa  = sanitize($input['empresa']       ?? '');
$servicio = sanitize($input['servicio']      ?? '');
$mensaje  = sanitize($input['mensaje']       ?? '');
$token    = $input['recaptcha-token']        ?? '';
$honeypot = $input['website']                ?? '';
$lang     = (isset($input['lang']) && $input['lang'] === 'en') ? 'en' : 'es';

/* ── STRINGS LOCALIZADOS ──────────────────────────────── */
$T = $lang === 'en' ? [
    'rate_limit'       => 'Please wait a moment before sending another message.',
    'name_required'    => 'Name is required.',
    'email_invalid'    => 'Invalid email address.',
    'phone_invalid'    => 'Invalid phone (must be 10 digits).',
    'company_required' => 'Company is required.',
    'service_required' => 'Service is required.',
    'message_short'    => 'Message too short.',
    'token_missing'    => 'Security token not received.',
    'verify_failed'    => 'Could not verify security. Please try again in a few moments.',
    'verify_invalid'   => 'Security verification failed. Please try again.',
    'sent_ok'          => 'Message sent successfully.',
    'send_error'       => 'Error sending. Please write us directly at ',
] : [
    'rate_limit'       => 'Por favor espera un momento antes de enviar otro mensaje.',
    'name_required'    => 'Nombre requerido.',
    'email_invalid'    => 'Correo inválido.',
    'phone_invalid'    => 'Teléfono inválido (10 dígitos).',
    'company_required' => 'Empresa requerida.',
    'service_required' => 'Servicio requerido.',
    'message_short'    => 'Mensaje demasiado corto.',
    'token_missing'    => 'Token de seguridad no recibido.',
    'verify_failed'    => 'No se pudo verificar la seguridad. Intenta de nuevo en unos momentos.',
    'verify_invalid'   => 'Verificación de seguridad fallida. Intenta de nuevo.',
    'sent_ok'          => 'Mensaje enviado correctamente.',
    'send_error'       => 'Error al enviar. Escríbenos directamente a ',
];

// Rate limit: 1 envío por IP cada 60 segundos (file-based, no session bypass)
$ip  = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rate_dir = sys_get_temp_dir() . '/kynoz_rate';
if (!is_dir($rate_dir)) @mkdir($rate_dir, 0700, true);
$rate_file = $rate_dir . '/' . md5($ip) . '.txt';
if (file_exists($rate_file) && (time() - filemtime($rate_file)) < 60) {
    http_response_code(429);
    exit(json_encode(['success' => false, 'message' => $T['rate_limit']]));
}

/* ── HONEYPOT ─────────────────────────────────────────── */
if (!empty($honeypot)) {
    exit(json_encode(['success' => true, 'message' => $T['sent_ok']]));
}

/* ── VALIDACIONES ─────────────────────────────────────── */
$errors = [];
if (empty($nombre))                             $errors[] = $T['name_required'];
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = $T['email_invalid'];
if (!preg_match('/^\d{10}$/', $telefono))       $errors[] = $T['phone_invalid'];
if (empty($empresa))                            $errors[] = $T['company_required'];
if (empty($servicio))                           $errors[] = $T['service_required'];
if (strlen($mensaje) < 10)                      $errors[] = $T['message_short'];

if (!empty($errors)) {
    http_response_code(422);
    exit(json_encode(['success' => false, 'message' => implode(' ', $errors)]));
}

/* ── RECAPTCHA v3 — FAIL CLOSED ───────────────────────── */
if (defined('RECAPTCHA_SECRET') && RECAPTCHA_SECRET !== '') {

    if (empty($token)) {
        http_response_code(403);
        exit(json_encode(['success' => false, 'message' => $T['token_missing']]));
    }

    $verify = @file_get_contents(
        'https://www.google.com/recaptcha/api/siteverify?secret='
        . urlencode(RECAPTCHA_SECRET) . '&response=' . urlencode($token)
        . '&remoteip=' . urlencode($ip)
    );

    if ($verify === false || $verify === '') {
        http_response_code(503);
        exit(json_encode(['success' => false, 'message' => $T['verify_failed']]));
    }

    $rc = json_decode($verify, true);

    if (!isset($rc['success']) || !$rc['success'] || ($rc['score'] ?? 0) < 0.5) {
        http_response_code(403);
        exit(json_encode(['success' => false, 'message' => $T['verify_invalid']]));
    }
}

/* ── ENVIAR CORREO ────────────────────────────────────── */
$sent = sendMail($nombre, $email, $telefono, $empresa, $servicio, $mensaje, $lang);

if ($sent) {
    @file_put_contents($rate_file, time());
    // Cleanup stale rate limit files (older than 5 minutes)
    foreach (glob($rate_dir . '/*.txt') as $f) {
        if ((time() - filemtime($f)) > 300) @unlink($f);
    }
    sendConfirmation($nombre, $email, $lang);
    exit(json_encode(['success' => true, 'message' => $T['sent_ok']]));
} else {
    http_response_code(500);
    exit(json_encode(['success' => false, 'message' => $T['send_error'] . MAIL_TO]));
}

/* ══════════════════════════════════════════════════════
   FUNCIONES
══════════════════════════════════════════════════════ */

function sanitize(string $s): string {
    $s = str_replace(["\r", "\n", "\0"], '', $s); // prevent CRLF header injection
    return htmlspecialchars(strip_tags(trim($s)), ENT_QUOTES, 'UTF-8');
}

function sendMail(string $nombre, string $email, string $telefono,
                  string $empresa, string $servicio, string $mensaje,
                  string $lang = 'es'): bool
{
    $boundary = md5(uniqid() . time());
    // Subject restaurado al estado original que funcionaba antes del multi-idioma.
    // El idioma del visitante se diferencia DENTRO del cuerpo del email, no en headers ni subject.
    $subject  = '=?UTF-8?B?' . base64_encode('Nuevo contacto desde kynozdigital.com') . '?=';

    $html = '<html><body style="font-family:sans-serif;color:#111;max-width:600px;margin:auto;padding:32px">'
          . '<h2 style="color:#1F96FE;border-bottom:2px solid #1F96FE;padding-bottom:8px">Nuevo mensaje de contacto</h2>'
          . '<table style="width:100%;border-collapse:collapse">'
          . '<tr><td style="padding:8px;font-weight:bold;width:120px">Nombre</td><td style="padding:8px">' . $nombre . '</td></tr>'
          . '<tr style="background:#f7f7f5"><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">' . $email . '</td></tr>'
          . '<tr><td style="padding:8px;font-weight:bold">Teléfono</td><td style="padding:8px">' . $telefono . '</td></tr>'
          . '<tr style="background:#f7f7f5"><td style="padding:8px;font-weight:bold">Empresa</td><td style="padding:8px">' . $empresa . '</td></tr>'
          . '<tr><td style="padding:8px;font-weight:bold">Servicio</td><td style="padding:8px">' . $servicio . '</td></tr>'
          . '<tr style="background:#f7f7f5"><td style="padding:8px;font-weight:bold;vertical-align:top">Mensaje</td><td style="padding:8px">' . nl2br($mensaje) . '</td></tr>'
          . '<tr><td style="padding:8px;font-weight:bold">Idioma</td><td style="padding:8px">' . ($lang === 'en' ? 'English (EN)' : 'Español (ES)') . '</td></tr>'
          . '</table>'
          . '<p style="margin-top:24px;font-size:.8rem;color:#aaa">Enviado desde kynozdigital.com</p>'
          . '</body></html>';

    $plain = "Nuevo mensaje de contacto\n\n"
           . "Nombre:   $nombre\nEmail:    $email\nTeléfono: $telefono\n"
           . "Empresa:  $empresa\nServicio: $servicio\nIdioma:   " . ($lang === 'en' ? 'English (EN)' : 'Español (ES)') . "\n\n"
           . "Mensaje:\n$mensaje";

    $body = "--$boundary\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\n$plain\r\n"
          . "--$boundary\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n$html\r\n"
          . "--$boundary--";

    // Sender = SMTP_USER (contacto@) — vuelta al estado original que funcionaba
    // antes de cualquier cambio. noreply@ se reserva exclusivamente para el correo
    // de confirmación al cliente, NUNCA para envíos internos a Kynoz.
    $headers = "From: KYNOZ Web <" . SMTP_USER . ">\r\n"
             . "Reply-To: $nombre <$email>\r\n"
             . "MIME-Version: 1.0\r\n"
             . "Content-Type: multipart/alternative; boundary=\"$boundary\"";

    // SMTP por SSL puerto 465
    $socket = @fsockopen('ssl://' . SMTP_HOST, 465, $errno, $errstr, 15);
    if ($socket) {
        stream_set_timeout($socket, 15);
        $read = function() use ($socket) {
            $d = '';
            while ($l = fgets($socket, 515)) { $d .= $l; if (substr($l,3,1) === ' ') break; }
            return $d;
        };
        $cmd = function($c) use ($socket, $read) { fwrite($socket, $c."\r\n"); return $read(); };

        $read();
        $cmd('EHLO kynozdigital.com');
        $cmd('AUTH LOGIN');
        $cmd(base64_encode(SMTP_USER));
        $r = $cmd(base64_encode(SMTP_PASS));

        if (strpos($r, '235') !== false) {
            $cmd('MAIL FROM:<' . SMTP_USER . '>');
            $cmd('RCPT TO:<' . MAIL_TO . '>');
            $cmd('DATA');
            $cmd("To: " . MAIL_TO . "\r\nSubject: $subject\r\n$headers\r\n\r\n$body\r\n.");
            $cmd('QUIT');
            fclose($socket);
            return true;
        }
        fclose($socket);
    }

    // Fallback: mail() nativo
    return mail(MAIL_TO, $subject, $html,
        "From: KYNOZ <" . SMTP_USER . ">\r\nReply-To: $nombre <$email>\r\n"
        . "Content-Type: text/html; charset=UTF-8\r\nMIME-Version: 1.0"
    );
}

/* ══════════════════════════════════════════════════════
   CORREO DE CONFIRMACIÓN AL CLIENTE
══════════════════════════════════════════════════════ */

function sendConfirmation(string $nombre, string $email, string $lang = 'es'): void
{
    if (!defined('NOREPLY_USER') || !defined('NOREPLY_PASS')) return;

    $boundary = md5(uniqid() . 'confirm');

    if ($lang === 'en') {
        $subject = '=?UTF-8?B?' . base64_encode('We received your message — Kynoz') . '?=';

        $plain = "Hi $nombre,\n\n"
               . "Thank you for reaching out. Your message was received and the Kynoz team will review it shortly.\n\n"
               . "We will get back to you soon.\n\n"
               . "The Kynoz Team\nBrand Intelligence\nhttps://kynozdigital.com\n\n"
               . "---\n"
               . "This is an automated message — please do not reply, this mailbox is unmonitored. "
               . "If you have any additional questions, write to us directly at contact@kynozdigital.com";

        $html = '<!DOCTYPE html><html><body style="font-family:sans-serif;color:#111;max-width:600px;margin:auto;padding:40px">'
              . '<div style="border-top:3px solid #1F96FE;padding-top:32px;margin-bottom:32px">'
              . '<span style="font-size:1.4rem;font-weight:900;letter-spacing:-.5px">Kynoz</span>'
              . '<span style="font-size:.65rem;letter-spacing:.15em;color:#1F96FE;display:block;margin-top:2px">Brand Intelligence</span>'
              . '</div>'
              . '<p style="font-size:1rem;margin-bottom:8px">Hi <strong>' . htmlspecialchars($nombre, ENT_QUOTES, 'UTF-8') . '</strong>,</p>'
              . '<p style="font-size:.95rem;line-height:1.7;color:#333">Thank you for reaching out. Your message was received and the Kynoz team will review it shortly.</p>'
              . '<p style="font-size:.95rem;line-height:1.7;color:#333">We will get back to you soon.</p>'
              . '<div style="margin-top:40px;padding-top:24px;border-top:1px solid #e0e0da">'
              . '<p style="font-size:.85rem;font-weight:700;margin-bottom:4px">The KYNOZ Team</p>'
              . '<p style="font-size:.8rem;color:#888;margin:0">Brand Intelligence · kynozdigital.com</p>'
              . '</div>'
              . '<div style="margin-top:32px;padding:16px;background:#f7f7f5;border-radius:2px">'
              . '<p style="font-size:.72rem;color:#aaa;margin:0;line-height:1.6">'
              . 'This is an automated message — please do not reply, this mailbox is unmonitored. '
              . 'If you have any additional questions, write to us directly at '
              . '<a href="mailto:contact@kynozdigital.com" style="color:#1F96FE">contact@kynozdigital.com</a>'
              . '</p></div>'
              . '</body></html>';
    } else {
        $subject = '=?UTF-8?B?' . base64_encode('Recibimos tu mensaje — Kynoz') . '?=';

        $plain = "Hola $nombre,\n\n"
               . "Gracias por contactarnos. Tu mensaje ha llegado correctamente y estará en manos del equipo de Kynoz a la brevedad.\n\n"
               . "Nos pondremos en contacto contigo pronto.\n\n"
               . "Equipo Kynoz\nInteligencia de Marca\nhttps://kynozdigital.com\n\n"
               . "---\n"
               . "Este es un correo automático, por favor no respondas a este mensaje ya que es un buzón sin supervisión. "
               . "Si tienes alguna consulta adicional, escríbenos directamente a contacto@kynozdigital.com";

        $html = '<!DOCTYPE html><html><body style="font-family:sans-serif;color:#111;max-width:600px;margin:auto;padding:40px">'
              . '<div style="border-top:3px solid #1F96FE;padding-top:32px;margin-bottom:32px">'
              . '<span style="font-size:1.4rem;font-weight:900;letter-spacing:-.5px">Kynoz</span>'
              . '<span style="font-size:.65rem;letter-spacing:.15em;color:#1F96FE;display:block;margin-top:2px">Inteligencia de Marca</span>'
              . '</div>'
              . '<p style="font-size:1rem;margin-bottom:8px">Hola <strong>' . htmlspecialchars($nombre, ENT_QUOTES, 'UTF-8') . '</strong>,</p>'
              . '<p style="font-size:.95rem;line-height:1.7;color:#333">Gracias por contactarnos. Tu mensaje ha llegado correctamente y estará en manos del equipo de Kynoz a la brevedad.</p>'
              . '<p style="font-size:.95rem;line-height:1.7;color:#333">Nos pondremos en contacto contigo pronto.</p>'
              . '<div style="margin-top:40px;padding-top:24px;border-top:1px solid #e0e0da">'
              . '<p style="font-size:.85rem;font-weight:700;margin-bottom:4px">Equipo KYNOZ</p>'
              . '<p style="font-size:.8rem;color:#888;margin:0">Inteligencia de Marca · kynozdigital.com</p>'
              . '</div>'
              . '<div style="margin-top:32px;padding:16px;background:#f7f7f5;border-radius:2px">'
              . '<p style="font-size:.72rem;color:#aaa;margin:0;line-height:1.6">'
              . 'Este es un correo automático, por favor no respondas a este mensaje ya que es un buzón sin supervisión. '
              . 'Si tienes alguna consulta adicional, escríbenos directamente a '
              . '<a href="mailto:contacto@kynozdigital.com" style="color:#1F96FE">contacto@kynozdigital.com</a>'
              . '</p></div>'
              . '</body></html>';
    }

    $body = "--$boundary\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\n$plain\r\n"
          . "--$boundary\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n$html\r\n"
          . "--$boundary--";

    $headers = "From: KYNOZ <" . NOREPLY_USER . ">\r\n"
             . "Reply-To: <" . NOREPLY_USER . ">\r\n"
             . "MIME-Version: 1.0\r\n"
             . "Content-Type: multipart/alternative; boundary=\"$boundary\"";

    $socket = @fsockopen('ssl://' . SMTP_HOST, 465, $errno, $errstr, 15);
    if ($socket) {
        stream_set_timeout($socket, 15);
        $read = function() use ($socket) {
            $d = '';
            while ($l = fgets($socket, 515)) { $d .= $l; if (substr($l,3,1) === ' ') break; }
            return $d;
        };
        $cmd = function($c) use ($socket, $read) { fwrite($socket, $c."\r\n"); return $read(); };

        $read();
        $cmd('EHLO kynozdigital.com');
        $cmd('AUTH LOGIN');
        $cmd(base64_encode(NOREPLY_USER));
        $r = $cmd(base64_encode(NOREPLY_PASS));

        if (strpos($r, '235') !== false) {
            $cmd('MAIL FROM:<' . NOREPLY_USER . '>');
            $cmd('RCPT TO:<' . $email . '>');
            $cmd('DATA');
            $cmd("To: $nombre <$email>\r\nSubject: $subject\r\n$headers\r\n\r\n$body\r\n.");
            $cmd('QUIT');
        }
        fclose($socket);
    }
    // Fallo silencioso — no bloqueamos el flujo principal
}

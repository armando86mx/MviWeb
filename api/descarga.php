<?php
/**
 * MVI Amor y Gracia — descarga.php
 * Formulario "Enviar a mi correo" de la serie Crecer (1, 2 y 3).
 * Adaptado de la receta Kynoz: SMTP Hostinger (socket SSL 465) +
 * reCAPTCHA v3 (fail-closed si hay secret) + honeypot + rate limit.
 *
 * PRIORIDAD (inversa a Kynoz): el correo al VISITANTE con los PDFs es
 * el producto — si falla, respondemos error y el front ofrece la
 * descarga directa. La notificación interna a web@ es secundaria.
 *
 * CONFIG: amorygracia-config.php FUERA de public_html (chmod 600).
 *   /home/uXXXX/amorygracia-config.php   ← credenciales reales
 *   /home/uXXXX/public_html/api/descarga.php ← este archivo
 * Plantilla: docs/amorygracia-config.example.php del repo.
 */

$config_path = getenv('MVI_CONFIG_PATH') ?: dirname(__DIR__, 2) . '/amorygracia-config.php';
if (!file_exists($config_path)) {
    http_response_code(500);
    exit(json_encode(['success' => false, 'message' => 'Error de configuración del servidor. Usa la descarga directa de esta página.']));
}
require_once $config_path;

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['success' => false, 'message' => 'Método no permitido.']));
}

/* ── Datos (el form envía FormData → $_POST) ─────────────── */
$nombre   = sanitize($_POST['nombre']   ?? '');
$apellido = sanitize($_POST['apellido'] ?? '');
$email    = sanitize($_POST['email']    ?? '');
$honeypot = $_POST['website']             ?? '';
$token    = $_POST['g-recaptcha-response'] ?? '';
$ip       = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

/* ── Rate limit: 1 envío por IP cada 60 s ────────────────── */
$rate_dir = sys_get_temp_dir() . '/mvi_rate';
if (!is_dir($rate_dir)) @mkdir($rate_dir, 0700, true);
$rate_file = $rate_dir . '/' . md5($ip) . '.txt';
if (file_exists($rate_file) && (time() - filemtime($rate_file)) < 60) {
    http_response_code(429);
    exit(json_encode(['success' => false, 'message' => 'Espera un momento antes de intentar de nuevo.']));
}

/* ── Honeypot: éxito fingido para el bot ─────────────────── */
if (!empty($honeypot)) {
    exit(json_encode(['success' => true, 'message' => '¡Listo! Revisa tu correo en los próximos minutos.']));
}

/* ── Validación (espejo de las reglas del front) ─────────── */
$errors = [];
if (mb_strlen($nombre) < 2 || mb_strlen($nombre) > 50)  $errors[] = 'Escribe tu nombre.';
if (mb_strlen($apellido) > 50)                          $errors[] = 'Apellido demasiado largo.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 120) $errors[] = 'Correo inválido.';
if (!empty($errors)) {
    http_response_code(422);
    exit(json_encode(['success' => false, 'message' => implode(' ', $errors)]));
}

/* ── reCAPTCHA v3 — fail-closed solo si hay secret ───────── */
if (defined('RECAPTCHA_SECRET') && RECAPTCHA_SECRET !== '') {
    if (empty($token)) {
        http_response_code(403);
        exit(json_encode(['success' => false, 'message' => 'Token de seguridad no recibido. Recarga la página e intenta de nuevo.']));
    }
    $verify = @file_get_contents(
        'https://www.google.com/recaptcha/api/siteverify?secret=' . urlencode(RECAPTCHA_SECRET)
        . '&response=' . urlencode($token) . '&remoteip=' . urlencode($ip)
    );
    if ($verify === false || $verify === '') {
        http_response_code(503);
        exit(json_encode(['success' => false, 'message' => 'No pudimos verificar la seguridad. Intenta en unos momentos.']));
    }
    $rc = json_decode($verify, true);
    $accionOk = !isset($rc['action']) || $rc['action'] === 'descarga';
    if (!($rc['success'] ?? false) || (($rc['score'] ?? 0) < 0.5) || !$accionOk) {
        http_response_code(403);
        exit(json_encode(['success' => false, 'message' => 'Verificación de seguridad fallida. Usa la descarga directa de esta página.']));
    }
}

/* ── 1) Correo al visitante (crítico: es la promesa) ─────── */
$nombreCompleto = trim("$nombre $apellido");
if (!enviarSerieAlVisitante($nombre, $email)) {
    http_response_code(500);
    exit(json_encode(['success' => false, 'message' => 'No pudimos enviar el correo. Usa la descarga directa de arriba o escríbenos a contacto@amorygraciapuebla.org']));
}

/* ── 2) Notificación interna (best effort, no bloquea) ───── */
if (!notificarInterno($nombreCompleto, $email, $ip)) {
    error_log("descarga.php: notificación interna falló para $email");
}

@file_put_contents($rate_file, time());
foreach (glob($rate_dir . '/*.txt') as $f) {
    if ((time() - filemtime($f)) > 300) @unlink($f);
}

exit(json_encode(['success' => true, 'message' => '¡Listo! Te enviamos la serie Crecer. Si no llega en unos minutos, revisa tu carpeta de spam.']));

/* ══════════════════════════════════════════════════════════
   FUNCIONES
══════════════════════════════════════════════════════════ */

function sanitize(string $s): string {
    $s = str_replace(["\r", "\n", "\0"], '', $s); // anti CRLF injection
    return htmlspecialchars(strip_tags(trim($s)), ENT_QUOTES, 'UTF-8');
}

/** Sesión SMTP por socket SSL 465 con AUTH LOGIN (receta Kynoz). */
function smtpEnviar(string $para, string $paraNombre, string $subject, string $html, string $plain, string $replyTo = ''): bool {
    $boundary = md5(uniqid('', true));
    $subjectB64 = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $body = "--$boundary\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\n$plain\r\n"
          . "--$boundary\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n$html\r\n"
          . "--$boundary--";
    $headers = 'From: MVI Amor y Gracia <' . NOREPLY_USER . ">\r\n"
             . ($replyTo !== '' ? "Reply-To: $replyTo\r\n" : 'Reply-To: <' . NOREPLY_USER . ">\r\n")
             . "MIME-Version: 1.0\r\n"
             . "Content-Type: multipart/alternative; boundary=\"$boundary\"";

    $socket = @fsockopen('ssl://' . SMTP_HOST, 465, $errno, $errstr, 15);
    if (!$socket) return false;
    stream_set_timeout($socket, 15);
    $read = function () use ($socket) {
        $d = '';
        while ($l = fgets($socket, 515)) { $d .= $l; if (substr($l, 3, 1) === ' ') break; }
        return $d;
    };
    $cmd = function ($c) use ($socket, $read) { fwrite($socket, $c . "\r\n"); return $read(); };

    $read();
    $cmd('EHLO amorygraciapuebla.org');
    $cmd('AUTH LOGIN');
    $cmd(base64_encode(NOREPLY_USER));
    $r = $cmd(base64_encode(NOREPLY_PASS));
    if (strpos($r, '235') === false) { fclose($socket); return false; }

    $cmd('MAIL FROM:<' . NOREPLY_USER . '>');
    $rcpt = $cmd("RCPT TO:<$para>");
    if (strpos($rcpt, '250') === false) { $cmd('QUIT'); fclose($socket); return false; }
    $cmd('DATA');
    $fin = $cmd("To: $paraNombre <$para>\r\nSubject: $subjectB64\r\n$headers\r\n\r\n$body\r\n.");
    $cmd('QUIT');
    fclose($socket);
    return strpos($fin, '250') !== false;
}

/** El correo del visitante: los tres niveles de la serie Crecer. */
function enviarSerieAlVisitante(string $nombre, string $email): bool {
    $base = 'https://amorygraciapuebla.org/descargas';
    $niveles = [
        ['Crecer 1 — Fundamentos',            "$base/crecer-1.pdf"],
        ['Crecer 2 — Hábitos del discípulo',  "$base/crecer-2.pdf"],
        ['Crecer 3 — La iglesia que crece',   "$base/crecer-3.pdf"],
    ];

    $plain = "Hola $nombre,\n\n"
           . "Gracias por tu interés en la serie Crecer. Aquí están los tres niveles:\n\n";
    foreach ($niveles as [$titulo, $url]) $plain .= "· $titulo\n  $url\n\n";
    $plain .= "Léelos con calma y con tu Biblia abierta. Si algo te hace ruido o quieres conversarlo, escríbenos: la mesa está puesta.\n\n"
            . "MVI Amor y Gracia\nIglesia Cristiana Evangélica · Amozoc, Puebla\nDomingos 11:00 AM · C. 4 Nte. 207, Barrio, San Antonio, Amozoc\nhttps://amorygraciapuebla.org\n\n"
            . "---\nEste es un correo automático (buzón sin supervisión). Para cualquier consulta escríbenos a contacto@amorygraciapuebla.org";

    $enlaces = '';
    foreach ($niveles as [$titulo, $url]) {
        $enlaces .= '<tr><td style="padding:12px 16px;border:1.5px solid rgba(223,162,78,.55);border-radius:12px">'
                  . '<a href="' . $url . '" style="color:#25386A;font-weight:700;text-decoration:none;font-size:16px">' . $titulo . '</a>'
                  . '<span style="display:block;font-size:12px;color:#6B675B;margin-top:2px">PDF · descarga directa</span>'
                  . '</td></tr><tr><td style="height:10px"></td></tr>';
    }

    $html = '<!DOCTYPE html><html><body style="margin:0;padding:0;background:#F4EFE6">'
          . '<div style="font-family:Georgia,serif;color:#2B2620;max-width:560px;margin:auto;padding:40px 24px">'
          . '<div style="border-top:3px solid #DFA24E;padding-top:28px;margin-bottom:24px">'
          . '<span style="font-size:22px;font-weight:600;color:#25386A">MVI Amor y Gracia</span>'
          . '<span style="display:block;font-size:11px;letter-spacing:.15em;color:#8A5F1F;font-family:Arial,sans-serif;margin-top:4px">IGLESIA CRISTIANA EVANGÉLICA · AMOZOC, PUEBLA</span>'
          . '</div>'
          . '<p style="font-size:16px;line-height:1.7">Hola <strong>' . $nombre . '</strong>,</p>'
          . '<p style="font-size:15px;line-height:1.7;color:#3C382F">Gracias por tu interés en la serie <strong>Crecer</strong>. Aquí están los tres niveles, listos para descargar:</p>'
          . '<table style="width:100%;border-collapse:separate;margin:20px 0">' . $enlaces . '</table>'
          . '<p style="font-size:15px;line-height:1.7;color:#3C382F">Léelos con calma y con tu Biblia abierta. Si algo te hace ruido o quieres conversarlo, escríbenos — la mesa está puesta. Y si quieres visitarnos: <strong>domingos 11:00 AM</strong> en C. 4 Nte. 207, Barrio, San Antonio, Amozoc.</p>'
          . '<p style="margin:28px 0 0"><a href="https://amorygraciapuebla.org/contacto" style="color:#25386A;font-weight:700">amorygraciapuebla.org/contacto</a></p>'
          . '<div style="margin-top:36px;padding:14px 16px;background:#FCF8EF;border-radius:10px">'
          . '<p style="font-size:11.5px;color:#6B675B;margin:0;line-height:1.6;font-family:Arial,sans-serif">Este es un correo automático (buzón sin supervisión). Para cualquier consulta escríbenos a '
          . '<a href="mailto:contacto@amorygraciapuebla.org" style="color:#8A5F1F">contacto@amorygraciapuebla.org</a></p>'
          . '</div></div></body></html>';

    return smtpEnviar($email, $nombre, 'Tu serie Crecer — MVI Amor y Gracia', $html, $plain, 'contacto@amorygraciapuebla.org');
}

/** Notificación interna a web@ (Reply-To: el visitante). */
function notificarInterno(string $nombreCompleto, string $email, string $ip): bool {
    $plain = "Nueva descarga de la serie Crecer\n\nNombre: $nombreCompleto\nCorreo: $email\nIP: $ip\nFecha: " . date('Y-m-d H:i:s') . "\n\nEnviado desde amorygraciapuebla.org/recursos/descargar";
    $html  = '<html><body style="font-family:sans-serif;color:#2B2620;max-width:560px;margin:auto;padding:28px">'
           . '<h2 style="color:#25386A;border-bottom:2px solid #DFA24E;padding-bottom:8px">Nueva descarga de la serie Crecer</h2>'
           . '<table style="width:100%;border-collapse:collapse">'
           . '<tr><td style="padding:8px;font-weight:bold;width:110px">Nombre</td><td style="padding:8px">' . $nombreCompleto . '</td></tr>'
           . '<tr style="background:#FCF8EF"><td style="padding:8px;font-weight:bold">Correo</td><td style="padding:8px">' . $email . '</td></tr>'
           . '<tr><td style="padding:8px;font-weight:bold">Fecha</td><td style="padding:8px">' . date('Y-m-d H:i:s') . '</td></tr>'
           . '</table>'
           . '<p style="margin-top:20px;font-size:.8rem;color:#6B675B">Enviado desde amorygraciapuebla.org/recursos/descargar</p>'
           . '</body></html>';

    if (smtpEnviar(MAIL_TO, 'MVI Web', 'Nueva descarga de la serie Crecer — ' . $nombreCompleto, $html, $plain, "$nombreCompleto <$email>")) {
        return true;
    }
    // Fallback nativo solo para la notificación interna
    return @mail(MAIL_TO, '=?UTF-8?B?' . base64_encode('Nueva descarga de la serie Crecer') . '?=', $html,
        'From: MVI Amor y Gracia <' . NOREPLY_USER . ">\r\nReply-To: $nombreCompleto <$email>\r\nContent-Type: text/html; charset=UTF-8\r\nMIME-Version: 1.0");
}

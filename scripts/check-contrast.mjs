// Verifica los pares de contraste críticos del sistema Equilibrio (WCAG AA).
// Uso: node scripts/check-contrast.mjs — sale con código 1 si algún par falla.
// Los valores deben coincidir con src/styles/tokens.css.

const T = {
  paper100: '#FCF8EF', paper200: '#F4EFE6', paper300: '#F0EADD',
  paper400: '#EFEAE0', paper500: '#EBE4D6',
  blue700: '#25386A', blueCta: '#22305A',
  amber500: '#DFA24E', ochre600: '#875D1E', ochre700: '#6E4C19', tan500: '#74634B',
  inkMuted: '#6B675B', inputBorder: '#8C8270',
  brandYoutube: '#C21807', brandSpotify: '#159743',
};

const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const lum = (hex) => {
  const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  const [r, g, b] = rgb(hex);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

// [nombre, fg, bg, mínimo requerido]
const PARES = [
  ['ink-muted / paper-100 (texto chico)', T.inkMuted, T.paper100, 4.5],
  ['ink-muted / paper-200', T.inkMuted, T.paper200, 4.5],
  ['ink-muted / paper-300', T.inkMuted, T.paper300, 4.5],
  ['ink-muted / paper-400 (migas en nav)', T.inkMuted, T.paper400, 4.5],
  ['ochre-700 / paper-200 (hover de enlaces)', T.ochre700, T.paper200, 4.5],
  ['ochre-700 / paper-400 (hover nav)', T.ochre700, T.paper400, 4.5],
  ['ochre-700 / paper-100', T.ochre700, T.paper100, 4.5],
  ['ochre-700 / paper-500 (indicador + FAQ)', T.ochre700, T.paper500, 3],
  ['ochre-600 / paper-500 (eyebrows, peor fondo)', T.ochre600, T.paper500, 4.5],
  ['ochre-600 / paper-100 (eyebrows y citas)', T.ochre600, T.paper100, 4.5],
  ['tan-500 / paper-500 (refs bíblicas, peor fondo)', T.tan500, T.paper500, 4.5],
  ['tan-500 / paper-100 (refs bíblicas)', T.tan500, T.paper100, 4.5],
  ['blue-cta-text / amber-500 (hover btn secundario)', T.blueCta, T.amber500, 4.5],
  ['borde input / paper-100 (1.4.11)', T.inputBorder, T.paper100, 3],
  ['blue-700 / paper-100 (foco acordeón)', T.blue700, T.paper100, 3],
  ['brand-youtube / paper-200 (solo titular grande)', T.brandYoutube, T.paper200, 3],
  ['brand-spotify / paper-200 (solo titular grande)', T.brandSpotify, T.paper200, 3],
];

let fallas = 0;
for (const [nombre, fg, bg, min] of PARES) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) fallas++;
  console.log(`${ok ? '✓' : '✗ FALLA'} ${nombre}: ${r.toFixed(2)}:1 (mín ${min}:1)`);
}
process.exit(fallas ? 1 : 0);

/* ============================================================================
   Tailwind — extensión de theme para el sistema "Equilibrio" (MVI Amor y Gracia)
   OPCIONAL: solo si el codebase usa Tailwind. Fusiona esto en tu
   tailwind.config.js (theme.extend). Valores idénticos a tokens.css.
   ============================================================================ */

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        // Cremas (papel cálido)
        paper: {
          100: '#FCF8EF',
          200: '#F4EFE6',
          300: '#F0EADD',
          400: '#EFEAE0',
          500: '#EBE4D6',
          line:  '#E4DAC6',
          line2: '#DECFB4',
          line3: '#DBCFB6',
        },
        // Azules de marca (profundos y cálidos)
        brand: {
          500: '#3A548C',
          700: '#25386A',  // azul primario
          800: '#243766',
          900: '#1E2C52',
          950: '#1A2747',
          cta: '#22305A',
        },
        // Ámbar / oro (calidez)
        amber: {
          400: '#E7B870',
          500: '#DFA24E',  // ámbar primario
          600: '#E7B262',
        },
        ochre: {
          500: '#C98A33',
          600: '#B07A2E',
        },
        tan: { 500: '#A8906C' },
        // Texto
        ink: {
          DEFAULT: '#2B2620',
          logo:  '#20242e',
          muted: '#7E7A6E',
          nav:   '#3C382F',
        },
        cream:  { DEFAULT: '#F4ECDD', 2: '#F2ECDD' },
        slate:  { warm: '#C2C9DB', warm2: '#C3CADB' },
        footer: { muted: '#9FA8BF', copy: '#8A93AD' },
        logomark: '#0B0B0C',
      },
      fontFamily: {
        display: ['Newsreader', 'Georgia', 'serif'],
        body: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        pill: '999px',
        photo: '20px',
        card: '18px',
        cardsm: '16px',
      },
      boxShadow: {
        // La firma: navy en reposo, ámbar en hover
        btn:            '0 10px 24px -12px rgba(30,44,90,0.6)',
        'btn-hover':    '0 16px 30px -12px rgba(223,162,78,0.6)',
        'btn-hero':     '0 16px 32px -12px rgba(30,44,90,0.55)',
        'btn-hero-hover':'0 18px 40px -12px rgba(223,162,78,0.62)',
        'card-hover':   '0 22px 48px -22px rgba(223,162,78,0.5)',
        'card-sm-hover':'0 18px 42px -16px rgba(223,162,78,0.5)',
        'cta-amber':    '0 16px 34px -12px rgba(223,162,78,0.55)',
        'cta-amber-hover':'0 20px 40px -12px rgba(223,162,78,0.7)',
        'cta-cream':    '0 16px 34px -14px rgba(0,0,0,0.4)',
        photo:          'inset 0 0 0 1px rgba(80,75,55,0.18), 0 20px 40px -22px rgba(50,55,90,0.4)',
      },
      backgroundImage: {
        // Gradientes de "luz de tarde"
        'warm-hero-light':
          'radial-gradient(120% 85% at 90% 10%, rgba(223,162,78,0.16) 0%, rgba(223,162,78,0) 55%), #F4EFE6',
        'warm-hero-dark':
          'radial-gradient(110% 90% at 85% 0%, rgba(223,162,78,0.18) 0%, rgba(223,162,78,0) 52%), linear-gradient(160deg,#243766 0%,#1E2C52 55%,#1A2747 100%)',
        'warm-cta-dark':
          'radial-gradient(100% 120% at 12% 0%, rgba(223,162,78,0.16) 0%, rgba(223,162,78,0) 55%), linear-gradient(150deg,#243766,#1A2747)',
        'warm-photo-light':
          'radial-gradient(80% 60% at 50% 40%, rgba(255,248,233,0.5), rgba(255,248,233,0) 70%)',
      },
      letterSpacing: {
        eyebrow: '0.2em',
        tight: '-0.01em',
        tighter: '-0.015em',
      },
      transitionDuration: {
        btn: '180ms',
        card: '200ms',
        link: '160ms',
      },
    },
  },
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FAF8F4',
        surface: '#FFFFFF',
        line: '#E7E2D9',
        mist: '#F2EFE9',
        ink: {
          DEFAULT: '#1B2A41',
          soft: '#3C4A5E',
          muted: '#5F6B7A',
          faint: '#8A93A0',
        },
        bronze: {
          DEFAULT: '#8C6A3F',
          light: '#C9AE84',
          wash: '#F4EDE2',
          dark: '#6E5130',
        },
        ok: '#3F6E4E',
        warn: '#9A5B2E',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'Cambria', 'serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(27,42,65,0.04), 0 2px 8px rgba(27,42,65,0.04)',
        lift: '0 4px 20px rgba(27,42,65,0.08)',
      },
      maxWidth: { prose: '68ch' },
    },
  },
  plugins: [],
};

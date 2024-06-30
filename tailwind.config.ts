import type { Config } from 'tailwindcss';
import theme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', ...theme.fontFamily.sans] },
      colors: {
        'surface-1': 'hsl(223, 21%, 6%)',
        'surface-2': 'hsl(222, 13%, 22%)',
        'foreground-1': 'hsl(210, 44%, 96%)',
        'foreground-2': 'hsl(210, 20%, 80%)',
        brand: 'hsl(238, 100%, 84%)',
        danger: 'hsl(0, 180%, 85%)',
      },
      borderColor: { DEFAULT: 'hsl(222, 13%, 33%)' },
      ringColor: { DEFAULT: 'hsl(210, 30%, 94%)' },
    },
  },
  future: { hoverOnlyWhenSupported: true },
  corePlugins: { fontSize: false },
  plugins: [
    require('tailwindcss-fluid-type'),
    require('tailwind-scrollbar')({ nocompatible: true }),
    plugin(({ theme, addUtilities }) => {
      addUtilities({
        '.bg-radial-grid': {
          position: 'absolute',
          inset: '0',
          height: '100%',
          width: '100%',
          zIndex: '-1',
          backgroundImage: `radial-gradient(${theme('colors.surface-2')} 1px, transparent 1px)`,
          backgroundSize: '16px 16px',
          maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 60%, transparent 100%)',
        },
      });
    }),
  ],
} satisfies Config;

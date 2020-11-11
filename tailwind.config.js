const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    inset: {
      0: 0,
      6: '6px',
    },
    extend: {
      colors: {
        kanban: {
          gray: '#2F495E',
          lightgreen: '#00C58E',
          green: '#108775',
        },
        light: {
          surface: '#F8FAFC',
          onSurfacePrimary: '#2F495E',
          onSurfaceSecondary: '#606F7B',
          elevatedSurface: defaultTheme.colors.white,
          border: defaultTheme.colors.gray['300'],
        },
        dark: {
          surface: '#2C3E50',
          onSurfacePrimary: '#e2e8f0',
          onSurfaceSecondary: '#B8C2CC',
          elevatedSurface: '#1a202c',
          border: defaultTheme.colors.gray['600'],
        },
      },
    },
    darkSelector: '.dark-mode',
  },
  variants: {
    borderColor: [
      'dark',
      'dark-hover',
      'dark-focus',
      'dark-focus-within',
      'hover',
    ],
    backgroundColor: [
      'dark',
      'dark-hover',
      'dark-group-hover',
      'dark-even',
      'dark-odd',
      'hover',
    ],
    textColor: [
      'dark',
      'dark-hover',
      'dark-active',
      'dark-placeholder',
      'hover',
    ],
  },
  plugins: [
    require('tailwindcss-dark-mode')(),
    require('@tailwindcss/custom-forms'),
  ],
}

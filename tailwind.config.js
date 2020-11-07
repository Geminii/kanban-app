const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  /**
   * Due to introduced of layers in new version of Tailwindcss
   * @see {@link https://tailwindcss.com/docs/upcoming-changes#purge-layers-by-default}
   */
  future: {
    purgeLayersByDefault: true,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Quicksand',
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        ],
      },
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
          onSurfacePrimary: '#F5F7FA',
          onSurfaceSecondary: '#B8C2CC',
          elevatedSurface: '#2F495E',
          border: defaultTheme.colors.gray['600'],
        },
      },
      fill: (theme) => ({
        'kanban-gray': theme('colors.nuxt.gray'),
        'kanban-lightgreen': theme('colors.nuxt.lightgreen'),
        'kanban-green': theme('colors.nuxt.green'),
      }),
      stroke: (theme) => ({
        'kanban-gray': theme('colors.nuxt.gray'),
        'kanban-lightgreen': theme('colors.nuxt.lightgreen'),
        'kanban-green': theme('colors.nuxt.green'),
      }),
    },
  },
  variants: {
    display: ['responsive', 'after'],
    margin: ['responsive', 'after'],
    width: ['responsive', 'after'],
    borderWidth: ['responsive', 'after'],
    borderRadius: ['responsive', 'after'],
    borderColor: [
      'responsive',
      'hover',
      'focus',
      'dark',
      'light',
      'after',
      'light:after',
      'dark:after',
    ],
    backgroundColor: [
      'responsive',
      'hover',
      'focus',
      'dark',
      'light',
      'dark:hover',
      'light:hover',
    ],
    textColor: [
      'responsive',
      'hover',
      'focus',
      'group-hover',
      'dark',
      'light',
      'dark:hover',
      'light:hover',
    ],
  },
  plugins: [
    plugin(function ({ addVariant, e }) {
      const colorModeVariants = ['light', 'dark']
      colorModeVariants.forEach((mode) => {
        addVariant(mode, ({ modifySelectors, separator }) => {
          modifySelectors(({ className }) => {
            return `.${mode}-mode .${e(`${mode}${separator}${className}`)}`
          })
        })
      })
      const pseudoVariants = ['after', 'before']
      pseudoVariants.forEach((pseudo) => {
        addVariant(pseudo, ({ modifySelectors, separator }) => {
          modifySelectors(({ className }) => {
            return `.${e(`${pseudo}${separator}${className}`)}::${pseudo}`
          })
        })
      })
      // generate chained color mode and pseudo variants
      colorModeVariants.forEach((mode) => {
        pseudoVariants.forEach((pseudo) => {
          addVariant(`${mode}:${pseudo}`, ({ modifySelectors, separator }) => {
            modifySelectors(({ className }) => {
              return `.${mode}-mode .${e(
                `${mode}${separator}${pseudo}${separator}${className}`
              )}::${pseudo}`
            })
          })
        })
      })
      // states for color modes
      const states = ['hover']
      colorModeVariants.forEach((mode) => {
        states.forEach((state) => {
          addVariant(`${mode}:${state}`, ({ modifySelectors, separator }) => {
            modifySelectors(({ className }) => {
              return `.${mode}-mode .${e(
                `${mode}${separator}${state}${separator}${className}`
              )}:${state}`
            })
          })
        })
      })
    }),
  ],
  purgeCSS: {
    whitelistPatternsChildren: [/dark-mode$/],
  },
}

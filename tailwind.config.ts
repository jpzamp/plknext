import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-chicken-sans)'],
        'chicken-script': ['var(--font-chicken-script)'],
        roboto: ['var(--font-roboto)'],
      },

      content: {
        'product-scribble': 'url("/icons/product-scribble.svg")',
      },

      backgroundImage: {
        'brick-wall-pattern': "url('/textures/brick-wall-texture.png')",
        'onboarding-auth-pattern':
          "url('/textures/onboarding-auth-texture.svg')",
        'brick-wall-pattern-w-hand-mixer':
          "url('/textures/brick-wall-texture-with-hand-mixer.png')",
      },

      dropShadow: {
        header: 'rgba(0, 0, 0, 0.1) 0px 0px 20px',
        cupom: '0px 12px 16px rgba(0, 0, 0, 0.12)',
      },

      gridTemplateRows: {
        app: 'min-content max-content min-content',
      },
    },

    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      primary: {
        100: '#FFE5CC',
        300: '#FFAC5C',
        500: '#FF7D00',
        700: '#8F4600',
      },
      secondary: {
        300: '#E8B0E3',
        500: '#911987',
        700: '#5C0A55',
      },
      tertiary: {
        150: '#E5E5E5',
        400: '#BDBDBD',
        600: '#757575',
        800: '#212121',
      },
      neutral: {
        100: '#F5F5F5',
        150: '#F6F6F6',
        200: '#EEEEEE',
        300: '#E0E0E0',
        400: '#BDBDBD',
        500: '#F5F1EF',
        700: '#757575',
        800: '#424242',
        900: '#000000',
      },
      brand: {
        50: '#FFF8F2',
        100: '#FFF2E5',
        200: '#FFE5CC',
        400: '#FFCB99',
        600: '#FFB166',
        800: '#FF9733',
      },
      highlight: {
        300: '#FF7B33',
        500: '#F25600',
        700: '#BD4300',
        900: '#8A3100',
      },
      error: {
        100: '#FFE2E0',
        300: '#FF8580',
        500: '#D90F06',
        700: '#990600',
      },
      warning: {
        100: '#FFF4CC',
        300: '#FFE37F',
        500: '#FFC800',
        700: '#735D0D',
      },
      helper: {
        100: '#D5F6F4',
        300: '#20DFD5',
        500: '#00B2A9',
        700: '#0A5B58',
      },
      support: {
        'light-gray': '#FAFAFA',
        warn: '#FFF8DD',
        tags: '#F3F3F3',
        alert: '#F9DBDA',
        label: '#929292',
      },
    },
  },
  plugins: [],
}
export default config

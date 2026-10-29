/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./tests/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Full sacred Vedic scales
        saffron: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#FF7722', // Primary Sacred Saffron
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
          950: '#431407',
        },
        gold: {
          50: '#FCF9EE',
          100: '#F8F1D4',
          200: '#EFE2A3',
          300: '#E5CF6E',
          400: '#DFBE47',
          500: '#D4AF37', // Primary Divine Gold
          600: '#B88E23',
          700: '#926D1D',
          800: '#77561D',
          900: '#64471D',
          950: '#3B270C',
        },
        maroon: {
          50: '#FDF2F2',
          100: '#FCE5E5',
          200: '#F9CECE',
          300: '#F3A7A7',
          400: '#E77474',
          500: '#B91C1C',
          600: '#991B1B',
          700: '#8B0000', // Deep Sanctum Maroon
          800: '#6B0505',
          900: '#4A0707',
          950: '#2D0303',
        },
        cream: {
          50: '#FDFBF7', // Pristine Chandan Cream Background
          100: '#FAF4EB', // Parchment Fill
          200: '#F2ECE0', // Subtle Sandalwood Divider
          300: '#E6DDCB',
          400: '#D5C6AA',
          500: '#BDA682',
        },
        stone: {
          50: '#F7F6F5',
          100: '#E6E4E2',
          200: '#CEC9C5',
          300: '#B0A8A3',
          400: '#8E847E',
          500: '#726761',
          600: '#5A504B',
          700: '#463E3A',
          800: '#2C2523',
          900: '#1A1412', // Sacred Basalt Stone
          950: '#0F0B0A',
        },
        // Temple alias tokens for legacy / alternative styling
        temple: {
          saffron: {
            DEFAULT: '#E05A17',
            light: '#F58220',
            dark: '#B83E00',
            gold: '#FA8C16'
          },
          gold: {
            DEFAULT: '#D4AF37',
            light: '#F3E5AB',
            dark: '#996515',
            shimmer: '#FFF275'
          },
          maroon: {
            DEFAULT: '#6D071A',
            dark: '#4A0E17',
            light: '#8B1E32',
            deep: '#36000B'
          },
          ivory: {
            DEFAULT: '#FFFDF9',
            warm: '#FDF8EC',
            dark: '#F3ECD8'
          },
          sanctum: {
            DEFAULT: '#1E0D06',
            surface: '#2C150B',
            border: '#452312'
          }
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'diya': '0 0 15px rgba(255, 119, 34, 0.45), 0 0 30px rgba(212, 175, 55, 0.25)',
        'diya-lg': '0 0 25px rgba(255, 119, 34, 0.60), 0 0 50px rgba(212, 175, 55, 0.35)',
        'gold-sm': '0 0 10px rgba(212, 175, 55, 0.35)',
        'gold-md': '0 0 20px rgba(212, 175, 55, 0.50)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.4)',
        'sacred': '0 10px 30px -5px rgba(26, 20, 18, 0.12), 0 0 0 1px rgba(212, 175, 55, 0.2)',
      },
      keyframes: {
        diyaFlicker: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.88', transform: 'scale(0.97)' },
          '75%': { opacity: '0.94', transform: 'scale(1.03)' },
        },
        sacredPulse: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(255, 119, 34, 0.45)' },
          '50%': { boxShadow: '0 0 30px rgba(212, 175, 55, 0.70)' },
        },
      },
      animation: {
        'diya-flicker': 'diyaFlicker 3s ease-in-out infinite',
        'sacred-pulse': 'sacredPulse 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

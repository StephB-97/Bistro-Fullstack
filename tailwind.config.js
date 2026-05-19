/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bistro: {
          bg:        '#FAFBFF',
          cream:     '#FEF8EE',
          ink:       '#2E2E3A',
          subtle:    '#5A5A72',
          mute:      '#8A8AA8',
          blueLite:  '#D6E9F8',
          blueSoft:  '#A8CCEB',
          blue:      '#5B9AC9',
          gold:      '#C8933A',
          goldLite:  '#F0C060',
          cream2:    '#FEE8A8',
          tan:       '#E8C49A',
          green:     '#3A8A3A',
          greenLite: '#D4F1D4',
          danger:    '#e00055',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body:    ['Nunito', 'sans-serif'],
        script:  ['"Dancing Script"', 'cursive'],
      },
      boxShadow: {
        card:   '0 6px 24px rgba(91, 154, 201, 0.12)',
        cardHi: '0 18px 50px rgba(91, 154, 201, 0.20)',
        gold:   '0 6px 20px rgba(200, 147, 58, 0.4)',
        hero:   '0 20px 60px rgba(91, 154, 201, 0.20)',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg) scale(1)' },
          '50%':      { transform: 'rotate(3deg) scale(1.05)' },
        },
        slideIn: {
          '0%':   { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        wiggle:  'wiggle 4s ease-in-out infinite',
        slideIn: 'slideIn 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};

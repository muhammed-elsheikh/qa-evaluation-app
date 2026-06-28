module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'var(--color-brand)',
          hover: 'var(--color-brand-hover)',
          active: 'var(--color-brand-active)',
          light: 'var(--color-brand-light)',
        },
        bg: 'var(--color-bg)',
        text: 'var(--color-text)',
        success: {
          DEFAULT: 'var(--color-success)',
          light: 'var(--color-success-light)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          light: 'var(--color-warning-light)',
        },
        error: {
          DEFAULT: 'var(--color-error)',
          light: 'var(--color-error-light)',
        },
        border: 'var(--color-border)',
        focus: 'var(--color-focus)',
        disabled: {
          bg: 'var(--color-disabled-bg)',
          text: 'var(--color-disabled-text)',
        },
        navy: 'var(--color-navy)',
      },
      fontFamily: {
        sans: ['var(--font-family)', 'sans-serif'],
      },
      spacing: {
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        'card-md': '0 4px 8px rgba(0,0,0,.08), 0 6px 18px rgba(0,0,0,.06)'
      },
      fontSize: {
        'xs': ['12px', '1.5'],
        'sm': ['14px', '1.5'],
        'base': ['16px', '1.5'],
        'lg': ['20px', '1.4'],
        'xl': ['24px', '1.4'],
        '2xl': ['32px', '1.4'],
      },
    },
  },
  plugins: [],
}
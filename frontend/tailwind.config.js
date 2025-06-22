module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Salesforce-inspired color palette
        'sf-blue': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Light blue accent
          600: '#0176d3', // Primary Salesforce blue
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        'sf-light-blue': '#00a1e0',
        'sf-dark-blue': '#032d42',
        'sf-navy': '#16325c',
        'sf-gray': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        'salesforce': ['Salesforce Sans', 'Arial', 'sans-serif'],
        'poppins': ['Poppins', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '1.5': '0.375rem',
        '18': '4.5rem',
      }
    },
  },
  plugins: [],
}
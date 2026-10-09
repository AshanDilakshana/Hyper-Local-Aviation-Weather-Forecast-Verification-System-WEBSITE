export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: '#F5C542',
        'brand-hover': '#EBB82E',
        'brand-soft': '#FFF5CC',
        'brand-ink': '#7A5C00',
        alt: '#FFFDF5',
        ink: '#202124',
        muted: '#626262',
        line: '#E8E3D5',
        'line-strong': '#D6CFBC',
        success: '#1E7A4C',
        danger: '#B42318',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: '80rem',
      },
    },
  },
  plugins: [],
};

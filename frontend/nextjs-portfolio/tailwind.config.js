/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './sections/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['var(--font-orbitron)', 'Orbitron', 'sans-serif'],
        inter: ['var(--font-inter)', 'Inter', 'sans-serif'],
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        mono: ['Courier New', 'monospace'],
      },
      colors: {
        cyber: {
          bg: '#0a0a0a',
          card: 'rgba(255,255,255,0.03)',
          cyan: '#00e5ff',
          purple: '#a855f7',
          blue: '#3b82f6',
          green: '#10b981',
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0,229,255,0.3), 0 0 40px rgba(0,229,255,0.1)',
        'glow-purple': '0 0 20px rgba(168,85,247,0.3), 0 0 40px rgba(168,85,247,0.1)',
        'glow-blue': '0 0 20px rgba(59,130,246,0.3), 0 0 40px rgba(59,130,246,0.1)',
        'glow-green': '0 0 20px rgba(16,185,129,0.3), 0 0 40px rgba(16,185,129,0.1)',
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'spin-slow': 'spin 10s linear infinite',
        'spin-medium': 'spin 15s linear infinite',
        'spin-fast': 'spin 6s linear infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'scan-line': 'scanLine 3s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        pulseGlow: {
          '0%': { boxShadow: '0 0 5px rgba(0,229,255,0.2), 0 0 10px rgba(0,229,255,0.1)' },
          '100%': { boxShadow: '0 0 20px rgba(0,229,255,0.6), 0 0 40px rgba(0,229,255,0.3)' },
        },
      },
    },
  },
  plugins: [],
};

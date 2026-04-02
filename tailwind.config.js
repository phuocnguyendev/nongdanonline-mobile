/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#00a86b',
        secondary: '#1d4ed8',
        danger: '#FF3333',
        background: '#f4f6f9',
        surface: '#ffffff',
        'text-primary': '#2c3e50',
        'text-secondary': '#7f8c8d',
        'text-dark': '#333333',
        'text-muted': '#555555',
        'border-light': '#ecf0f1',
        'green-primary': '#16a34a',
      },
    },
  },
  plugins: [],
};

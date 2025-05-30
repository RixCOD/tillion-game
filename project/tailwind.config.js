/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#3498db', // primary blue
          600: '#2196f3',
          700: '#1e88e5',
          800: '#1976d2',
          900: '#1565c0',
        },
        success: {
          50: '#e8f5e9',
          100: '#c8e6c9',
          200: '#a5d6a7',
          300: '#81c784',
          400: '#66bb6a',
          500: '#2ecc71', // available
          600: '#43a047',
          700: '#388e3c',
          800: '#2e7d32',
          900: '#1b5e20',
        },
        warning: {
          50: '#fff8e1',
          100: '#ffecb3',
          200: '#ffe082',
          300: '#ffd54f',
          400: '#ffca28',
          500: '#f39c12', // in use
          600: '#ffc107',
          700: '#ffb300',
          800: '#ffa000',
          900: '#ff8f00',
        },
        neutral: {
          50: '#f7f9fa',
          100: '#e6e9ec',
          200: '#cbd1d5',
          300: '#adb4b9',
          400: '#919699',
          500: '#7f8c8d', // offline
          600: '#636b6f',
          700: '#4d565a',
          800: '#323a40',
          900: '#1f2937',
        },
      },
    },
  },
  plugins: [],
};
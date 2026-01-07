/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'trajan': ['Cinzel', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        charcoal: {
          900: '#121212',
          800: '#1E1E1E',
          700: '#2C2C2C',
          600: '#3D3D3D',
        },
        primary: {
          50: '#eef8ff',
          100: '#d9f0ff',
          500: '#4FACFE',
          600: '#00F2FE',
          700: '#00c2cb',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%)',
        'gradient-accent': 'linear-gradient(135deg, var(--accent-start) 0%, var(--accent-end) 100%)',
        'gradient-success': 'linear-gradient(135deg, #43E97B 0%, #38F9D7 100%)',
        'gradient-dark': 'linear-gradient(to bottom right, #121212, #1E1E1E)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

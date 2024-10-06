module.exports = {
    content: [
      './src/**/*.{js,ts,jsx,tsx}',  
      './pages/**/*.{js,ts,jsx,tsx}', 
      './components/**/*.{js,ts,jsx,tsx}', 
      './public/index.html', 
    ],
    theme: {
      extend: {
        colors: {
          dark_primary: '#253D57', 
        },
        fontFamily: {
          Poppins: ['Poppins', 'sans-serif'],
          Inria: ['Inria Serif', 'serif'],
          Paprika: ['Paprika', 'sans-serif'],
        },
        
        textShadow: {
          glow: '0 0 5px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.7)', 
        },
      },
    },
    plugins: [
      function({ addUtilities }) {
        addUtilities({
          '.text-shadow-glow': {
            textShadow: '0 0 5px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.7)',
          },
          '.hover\\:text-shadow-glow:hover': {
            textShadow: '0 0 5px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.7)',
          },
        });
      },
    ],
  };
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF5A13',  // Primary Orange
        accent: '#159F25',   // Accent Green
        background: '#ffffff',
        text: '#000000',
      },
    },
  },
  plugins: [],
}
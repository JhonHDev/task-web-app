/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        malachite: '#0ac763',
        silver: '#bdbcbc',
        cocoabrown: '#332927',
        boulder: '#b8b4b4',
        scarlet: '#ff1f18',
        cobalt: '#0252bc',
      },
    },
  },
  plugins: [],
};

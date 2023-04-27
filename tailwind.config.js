/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            gridTemplateColumns: {
                'main': '300px 1fr'
            }
        }
    },
    plugins: [require('daisyui')],
};

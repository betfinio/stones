import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	important: '.stones',
	content: ['./src/**/*.{ts,tsx}'],
	plugins: [animate],
};

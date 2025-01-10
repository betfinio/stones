import preset from '@betfinio/components/tailwind-config';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
module.exports = {
	presets: [preset],
	darkMode: ['class'],
	important: '.stones',
	content: ['./src/**/*.{ts,tsx}'],
	plugins: [animate],
};

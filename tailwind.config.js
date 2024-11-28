/** @type {import('tailwindcss').Config} */
module.exports = {
	presets: [require('@betfinio/components/tailwind-config')],
	darkMode: ['class'],
	important: '.stones',
	content: ['./src/**/*.{ts,tsx}'],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};

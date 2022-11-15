/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#E14D2A',
				secondary: '#FD841F',
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
}

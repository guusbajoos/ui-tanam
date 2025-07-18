import typography from '@tailwindcss/typography';

export default {
	content: [
		'./src/features/**/*.{js,ts,jsx,tsx}',
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/shared/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		important: true,
		extend: {
			fontFamily: {
				centurygp: ['var(--font-centurygp)'],
			},
			colors: {
				primary: '#1c7c70',
				'primary-second': '#3D7E77',
				secondary: '#162326',
				'secondary-second': '#041E0C',
				'green-category': '#869289',
			},
			aspectRatio: {
				'1/1': '1 / 1',
				'2/1': '2 / 1',
				'2/3': '2 / 3',
				'3/2': '3 / 2',
				'4/3': '4 / 3',
				'16/9': '16 / 9',
			},
			backgroundColor: {
				'floating-whatsapp': '#05cb6a',
				'gray-100': '#f5f5f5',
			},
			spacing: {
				30: '1.875rem',
				50: '3.125rem',
				60: '3.75rem',
				70: '4.375rem',
				100: '6.25rem',
			},
			gridTemplateColumns: {
				'r1-max-w-254': 'repeat(1, minmax(0, 254px))',
				'r2-max-w-364': 'repeat(2, minmax(0, 364px))',
			},
			boxShadow: {
				header: '0 1px 0 rgba(0, 0, 0, 0.25)',
			},
			transitionDuration: {
				'3s': '0.3s',
			},
			borderRadius: {
				inherit: 'inherit',
			},
			transitionTimingFunction: {
				'header-menu': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
			},
			width: {
				'43%': '43%',
				'57%': '57%',
			},
			animation: {
				'floating-whatsapp': 'floating-whatsapp 1.5s infinite',
			},
			keyframes: {
				'floating-whatsapp': {
					'0%': {
						'box-shadow': '0 0 0 0 rgba(5, 203, 106, 0.7)',
					},
					'70%': {
						'box-shadow': '0 0 0 10px rgba(5, 203, 106, 0)',
					},
					'100%': {
						'box-shadow': '0 0 0 0 rgba(5, 203, 106, 0)',
					},
				},
			},
		},
	},
	plugins: [typography],
};

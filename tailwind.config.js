import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
    	extend: {
    		fontFamily: {
    			sans: [
    				'Figtree',
                    ...defaultTheme.fontFamily.sans
                ]
    		},
    		colors: {
    			'button-border-color': '#67CFD5',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		backgroundColor: {
    			mainColor: '#012424',
    			buttonColor: '#FFBB33'
    		},
    		backgroundImage: {
    			'custom-gradient-test-2': 'linear-gradient(0deg,rgba(1, 36, 36, 1) 17%, rgba(23, 155, 158, 1) 67%, rgba(16, 142, 158, 1) 78%, rgba(8, 84, 85, 1) 96%, rgba(1, 36, 36, 1) 100%)',
    			'custom-gradient-test': 'linear-gradient(0deg,rgba(1, 36, 36, 1) 20%, rgba(18, 155, 158, 1) 88%, rgba(18, 155, 158, 1) 86%, rgba(8, 84, 85, 1) 96%, rgba(1, 36, 36, 1) 100%)',
    			'custom-gradient': 'linear-gradient(0deg,rgba(1, 36, 36, 1) 20%, rgba(18, 155, 158, 1) 50%, rgba(18, 155, 158, 1) 54%, rgba(1, 36, 36, 1) 80%)',
    			'border-color': 'linear-gradient(90deg,rgba(113, 211, 213, 1) 0%, rgba(18, 155, 158, 1) 100%)',
    			'card-color': 'linear-gradient(125deg,rgba(18, 155, 158, 1) 100%, rgba(113, 211, 213, 0) 0%)',
    			'soft-green-gradient': '`linear-gradient(105.8deg,rgba(200, 237, 217, 0.22) 3.42%, rgba(177, 198, 186, 0.0484) 101.99%,rgba(115, 210, 159, 0) 134.85%)`'
    		},
    		textColor: {
    			'custom-word-color': '#FFBB33',
    			mainColor: '#012424'
    		},
    		borderRadius: {
    			'custom-radius': '50px',
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	}
    },

    plugins: [forms, require("tailwindcss-animate")],
};

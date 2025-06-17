import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors:{
                'button-border-color' : "#67CFD5",
                
            },
            backgroundColor:{
                'mainColor' : "#012424",
                'buttonColor' : "#FFBB33"
            },
            backgroundImage:{
                'custom-gradient-test-2' : "linear-gradient(0deg,rgba(1, 36, 36, 1) 17%, rgba(23, 155, 158, 1) 67%, rgba(16, 142, 158, 1) 78%, rgba(8, 84, 85, 1) 96%, rgba(1, 36, 36, 1) 100%)",
                'custom-gradient-test' : "linear-gradient(0deg,rgba(1, 36, 36, 1) 20%, rgba(18, 155, 158, 1) 88%, rgba(18, 155, 158, 1) 86%, rgba(8, 84, 85, 1) 96%, rgba(1, 36, 36, 1) 100%)",
                'custom-gradient' : "linear-gradient(0deg,rgba(1, 36, 36, 1) 20%, rgba(18, 155, 158, 1) 50%, rgba(18, 155, 158, 1) 54%, rgba(1, 36, 36, 1) 80%)",
                'border-color' :"linear-gradient(90deg,rgba(113, 211, 213, 1) 0%, rgba(18, 155, 158, 1) 100%)",
                'card-color' : "linear-gradient(125deg,rgba(18, 155, 158, 1) 100%, rgba(113, 211, 213, 0) 0%)"
            },
            textColor: {
                'custom-word-color': '#FFBB33',
                'mainColor' : "#012424",
            },
            borderRadius:{
                'custom-radius' : '50px',

            }
        },
    },

    plugins: [forms],
};

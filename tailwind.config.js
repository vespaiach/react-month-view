module.exports = {
    content: ['./src/**/*.tsx'],
    theme: {
        colors: {
            line: 'rgb(var(--color-line) / <alpha-value>)',
            sheet: 'rgb(var(--color-background) / <alpha-value>)',
            'dimmed-text': 'rgb(var(--color-dimmed-text) / <alpha-value>)',
            'grayed-out': 'rgb(var(--color-dimmed-text) / 0.7)',
            today: 'rgb(var(--color-today) / <alpha-value>)',
            'light-text': 'rgb(var(--color-light-text) / <alpha-value>)',
            'normal-text': 'rgb(var(--color-normal-text) / <alpha-value>)',
        },
        extend: {
            fontFamily: {
                inter: '"Inter", sans-serif;',
            },
        },
    },
    plugins: [],
};

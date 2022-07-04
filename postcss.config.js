module.exports = {
    plugins: {
        'postcss-import': {},
        tailwindcss: {
            content: ['./src/**/*.tsx'],
            theme: {
                colors: {
                    line: 'rgb(var(--mv-color-grid-line) / <alpha-value>)',
                    sheet: 'rgb(var(--mv-color-sheet-background) / <alpha-value>)',
                    today: 'rgb(var(--mv-color-today-circle) / <alpha-value>)',
                    'grayed-out': 'rgb(var(--mv-color-grayed-out-text) / 0.7)',
                    day: 'rgb(var(--mv-color-day-text) / <alpha-value>)',
                    light: 'rgb(var(--mv-color-light-text) / <alpha-value>)',
                    normal: 'rgb(var(--mv-color-normal-text) / <alpha-value>)',
                    'event-dot': 'rgb(var(--mv-color-event-dot) / <alpha-value>)',
                },
            },
            plugins: [],
        },
        'postcss-minify': {},
    },
};

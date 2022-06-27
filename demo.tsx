import React from 'react';
import { createRoot } from 'react-dom/client';

import MonthView from './src/MonthView';

const dt = new Date();
dt.setDate(dt.getDate() - 1);
const events = [
    { start: new Date(dt), minutes: 30, title: 'Test event with long title, yeah yeah.' },
    {
        start: new Date(dt.setHours(dt.getHours() + 2)),
        minutes: 30,
        title: 'Test 2 event with long title, yeah yeah.',
    },
    {
        start: new Date(dt.setDate(dt.getDate() + 2)),
        minutes: 30,
        title: 'Test 2 event with long title, yeah yeah.',
    },
];
const colors = {
    gridLine: '54 54 54',
};

function App() {
    return <MonthView month={5} year={2022} events={events} colors={colors} />;
}
const container = document.getElementById('app');

if (container) {
    const root = createRoot(container);
    root.render(<App />);
}

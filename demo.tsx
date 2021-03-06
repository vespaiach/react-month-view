import './src/base.css';
import './src/month.css';
import React from 'react';
import { createRoot } from 'react-dom/client';

import { MonthView } from './src/MonthView';

const dt = new Date();
dt.setDate(dt.getDate() - 1);
const events = [
    { start: new Date(), minutes: 30, title: 'Test event h.' },
    { start: new Date(), minutes: 30, title: 'Test event with long tiah.' },
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

function App() {
    return <MonthView month={6} year={2022} events={events} />;
}
const container = document.getElementById('app');

if (container) {
    const root = createRoot(container);
    root.render(<App />);
}

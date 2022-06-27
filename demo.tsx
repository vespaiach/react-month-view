import React from 'react';
import { createRoot } from 'react-dom/client';

import MonthView from './src/MonthView';

function App() {
    return <MonthView month={5} year={2022} />;
}
const container = document.getElementById('app');

if (container) {
    const root = createRoot(container);
    root.render(<App />);
}

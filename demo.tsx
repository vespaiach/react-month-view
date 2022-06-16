import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

import Calendar from './src';

function App() {
    return <Calendar />;
}
const container = document.getElementById('app');

if (container) {
    const root = createRoot(container);
    root.render(<App />);
}

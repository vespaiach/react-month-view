import React from 'react';
import { cx } from './utils';

interface CalendarProps {
    className?: string;
}

export default function Calendar({ className }: CalendarProps) {
    return <div className={cx(className)}>Hello calendar</div>;
}

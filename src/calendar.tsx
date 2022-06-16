import './calendar.css';

import React, { useCallback, useMemo, useState } from 'react';
import { cx, DAYS, MONTHS } from './utils';

interface CalendarProps {
    className?: string;
    start?: Date;
}

export default function Calendar({ className, start = new Date() }: CalendarProps) {
    const [startDate, setStartDate] = useState(new Date(start.getFullYear(), start.getMonth(), 1));

    const nextHandler = useCallback(() => {
        const dt = new Date(startDate);
        dt.setMonth(dt.getMonth() + 1);
        setStartDate(dt);
    }, [startDate, setStartDate]);

    const prevHandler = useCallback(() => {
        const dt = new Date(startDate);
        dt.setMonth(dt.getMonth() - 1);
        setStartDate(dt);
    }, [startDate, setStartDate]);

    return (
        <div className={cx(className)}>
            <div>
                <button onClick={prevHandler}>Prev</button>
                <button onClick={nextHandler}>Next</button>
            </div>
            <Sheet month={startDate.getMonth() as Month} year={startDate.getFullYear()} />
        </div>
    );
}

type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

interface SheetProps {
    month: Month;
    year: number;
}

function Sheet({ month, year }: SheetProps) {
    const dayEls = useMemo(() => {
        const start = new Date(year, month, 1);

        const nextMonth = new Date(start);
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        if (start.getDay() > 0) {
            start.setDate(start.getDate() - start.getDay());
        }

        const els = [];
        let count = 0;
        while (start < nextMonth || count % 7 > 0) {
            count++;
            els.push(
                <button
                    className={cx(
                        'c-sheet_body--date',
                        start.getMonth() !== month && 'c-sheet_body--date-gray-out',
                    )}
                    tabIndex={start.getMonth() !== month ? -1 : undefined}
                    key={start.getTime()}
                    data-dt={`${start.getFullYear()}/${start.getMonth()}/${start.getDate()}`}>
                    {start.getDate()}
                    {start.getDate() === 1 ? <div>{MONTHS[start.getMonth()]}</div> : null}
                </button>,
            );

            start.setDate(start.getDate() + 1);
        }

        return els;
    }, [month, year]);

    return (
        <>
            <div className="c-sheet_head">{MONTHS[month]}</div>
            <div className="c-sheet_body">
                {DAYS.map((name) => (
                    <div className="c-sheet_body--day" key={name}>
                        {name}
                    </div>
                ))}
                {dayEls}
            </div>
        </>
    );
}

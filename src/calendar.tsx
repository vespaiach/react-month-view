import './calendar.css';

import React, { useCallback, useMemo, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { cx, DAYS, MONTHS } from './utils';

interface CalendarProps {
    className?: string;
    start?: Date;
}

export default function Calendar({ className, start = new Date() }: CalendarProps) {
    const [startDate, setStartDate] = useState([new Date(start.getFullYear(), start.getMonth(), 1)]);
    const [direction, setDirection] = useState('to-left');

    const nextHandler = useCallback(() => {
        const dt = new Date(startDate[0]);
        dt.setMonth(dt.getMonth() + 1);
        setStartDate([dt]);
        setDirection('to-left');
    }, [startDate, setStartDate]);

    const prevHandler = useCallback(() => {
        const dt = new Date(startDate[0]);
        dt.setMonth(dt.getMonth() - 1);
        setStartDate([dt]);
        setDirection('to-right');
    }, [startDate, setStartDate]);

    return (
        <div className={cx('c-container', className, direction)}>
            <div>
                <button onClick={prevHandler}>Prev</button>
                <button onClick={nextHandler}>Next</button>
            </div>
            <TransitionGroup component={null}>
                {startDate.map((dt) => (
                    <CSSTransition key={dt.getTime()} timeout={50000} classNames="c-sheet--item">
                        <Sheet month={dt.getMonth() as Month} year={dt.getFullYear()} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    );
}

type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

interface SheetProps {
    month: Month;
    year: number;
}

function Sheet({ month, year }: SheetProps) {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const currentDate = today.getDate();

    const dayEls = useMemo(() => {
        const start = new Date(year, month, 1);

        const nextMonth = new Date(start);
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        if (start.getDay() > 0) {
            start.setDate(start.getDate() - start.getDay());
        }

        const els = [];
        let count = 1;
        while (count <= 42) {
            const isToday =
                start.getFullYear() === currentYear &&
                start.getMonth() === currentMonth &&
                start.getDate() === currentDate;

            els.push(
                <button
                    className={cx(
                        'c-sheet_body--date',
                        start.getMonth() !== month && 'c-sheet_body--date-gray-out',
                        count % 7 === 0 ? 'c-sheet_body--date-far-right' : '',
                        isToday && 'c-sheet_body--today',
                    )}
                    tabIndex={start.getMonth() !== month ? -1 : undefined}
                    key={start.getTime()}
                    data-dt={`${start.getFullYear()}/${start.getMonth()}/${start.getDate()}`}>
                    <span
                        className="c-sheet_body--date-number"
                        data-date={isToday ? start.getDate() : undefined}>
                        {start.getDate()}
                    </span>
                    {start.getDate() === 1 ? (
                        <span className="c-sheet_body--date-month">{MONTHS[start.getMonth()]}</span>
                    ) : null}
                </button>,
            );

            start.setDate(start.getDate() + 1);
            count++;
        }

        return els;
    }, [month, year, currentYear, currentMonth, currentDate]);

    return (
        <div className="c-sheet">
            <div className="c-sheet_head">{MONTHS[month]}</div>
            <div className="c-sheet_body">
                {DAYS.map((name, i) => (
                    <div
                        className={cx('c-sheet_body--day', i === 6 && 'c-sheet_body--date-far-right')}
                        key={name}>
                        {name}
                    </div>
                ))}
                {dayEls}
            </div>
        </div>
    );
}

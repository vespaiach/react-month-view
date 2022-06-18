import './calendar.css';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { addMonth, cx, DAYS, diffMonth, MONTHS } from './utils';

interface MonthData {
    date: Date;
    index: number;
}

interface CalendarProps {
    className?: string;
    start?: Date;
    animationDuration?: number;
}

export default function Calendar({ animationDuration = 800, className, start = new Date() }: CalendarProps) {
    const [dates, setDates] = useState<Array<MonthData>>([
        { date: new Date(start.getFullYear(), start.getMonth(), 1), index: 0 },
    ]);

    const nextHandler = useCallback(() => {
        const visible = dates.find((dt) => dt.index === 0);
        if (visible) {
            setDates([
                visible,
                { date: addMonth(visible.date, 1), index: 1 },
                { date: addMonth(visible.date, 2), index: 2 },
                { date: addMonth(visible.date, 3), index: 3 },
            ]);
        }
    }, [dates, setDates]);

    const prevHandler = useCallback(() => {
        const visible = dates.find((dt) => dt.index === 0);
        if (visible) {
            const prev = new Date(visible.date);
            prev.setMonth(prev.getMonth() - 1);
            setDates([visible, { date: prev, index: -1 }]);
        }
    }, [dates, setDates]);

    const handleTransitionEnd = useCallback(() => {
        setDates((dates) => [{ ...dates[dates.length - 1], index: 0 }]);
    }, [setDates]);

    useEffect(() => {
        const visible = dates.find((dt) => dt.index === 0);
        if (visible) {
            const diff = diffMonth(visible.date, start);
            const sign = diff >= 0 ? 1 : -1;
            if (Math.abs(diff) > 3) {
                setDates([
                    visible,
                    { date: addMonth(start, sign * 1), index: sign * 1 },
                    { date: addMonth(start, sign * 2), index: sign * 2 },
                    { date: addMonth(start, sign * 3), index: sign * 3 },
                ]);
            } else {
                for (let i = 0; i < diff; i++) {}
                setDates([
                    visible,
                    { date: addMonth(visible.date, sign * 1), index: sign * 1 },
                    { date: addMonth(start, sign * 2), index: sign * 2 },
                    { date: addMonth(start, sign * 3), index: sign * 3 },
                ]);
            }
        }
    }, [start]);

    const viewportStyle = useMemo(() => {
        return {
            '--calendar-animation-duration': `${animationDuration}ms`,
        } as React.CSSProperties;
    }, [animationDuration]);

    let containerStyle = undefined;
    if (dates.length > 1) {
        const direction = dates[dates.length - 1].index > 0 ? -1 : 1;
        containerStyle = {
            transform: `translate3d(${(dates.length - 1) * direction * 100}%,0,0)`,
            transition: 'transform ease-out var(--calendar-animation-duration)',
        };
    }

    return (
        <div className={cx('c-viewport', className)} style={viewportStyle}>
            <div className="c-container" style={containerStyle} onTransitionEnd={handleTransitionEnd}>
                {dates.map(({ date, index }) => (
                    <Sheet
                        index={index}
                        key={date.toDateString()}
                        month={date.getMonth() as Month}
                        year={date.getFullYear()}
                        onNext={index === 0 ? nextHandler : undefined}
                        onPrev={index === 0 ? prevHandler : undefined}
                    />
                ))}
            </div>
        </div>
    );
}

function generateMonthList(from: Date, to: Date): MonthData[] {
    const diff = diffMonth(from, to);
    const result: MonthData[] = [{ date: from, index: 0 }];
    if (diff > 3) {
        for (let i = 1; i <= 3; i++) {
            result.push({ date: addMonth(to, 3 - i), index: i });
        }
    } else if (diff >= 0) {
        for (let i = 1; i <= diff; i++) {
            result.push({ date: addMonth(from, i), index: i });
        }
    } else if (diff > -3) {
        for (let i = 1; i <= Math.abs(diff); i++) {
            result.push({ date: addMonth(to, 3-i), index: i });
        }
    }

    return result;
}

type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

interface SheetProps {
    month: Month;
    year: number;
    style?: React.CSSProperties;
    index: number;
    onPrev?: React.MouseEventHandler<HTMLButtonElement>;
    onNext?: React.MouseEventHandler<HTMLButtonElement>;
}

const Sheet = React.forwardRef<HTMLDivElement, SheetProps>(function SheetComponent(
    { month, year, style, index, onPrev, onNext },
    ref,
) {
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
        let count = 0;
        while (start < nextMonth || count % 7 > 0) {
            count++;
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
        }

        return els;
    }, [month, year, currentYear, currentMonth, currentDate]);

    return (
        <div style={style} className={cx('c-sheet', `c-sheet-${index}`)} ref={ref}>
            <div className="c-sheet_head">
                {index === 0 ? (
                    <div className="c-sheet_head--buttons">
                        <button onClick={onPrev}>Prev</button>
                        <button onClick={onNext}>Next</button>
                    </div>
                ) : null}
                {MONTHS[month]}
            </div>
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
});

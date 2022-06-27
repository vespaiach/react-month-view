import './month.css';

import React, { useMemo } from 'react';

import { Month } from './type';
import { cx, DAYS as DEFAULT_DAYS, MONTHS as DEFAULT_MONTHS } from './utils';

interface MonthViewProps {
    month: Month;
    year: number;
    onClick?: (date: Date, evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    DateComponent?: typeof DateButton;
    style?: React.CSSProperties;
    className?: string;
    DAYS?: string[];
    MONTHS?: string[];
}

const MonthView = React.forwardRef<HTMLDivElement, MonthViewProps>(function MonthComponent(
    {
        month,
        year,
        style,
        className,
        onClick,
        DAYS = DEFAULT_DAYS,
        MONTHS = DEFAULT_MONTHS,
        DateComponent = DateButton,
    },
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
                <DateComponent
                    date={new Date(start)}
                    standout={isToday}
                    className={cx(
                        'border-t border-line',
                        count % 7 !== 0 && 'border-r',
                        start.getMonth() !== month && 'text-grayed-out',
                    )}
                    tabIndex={start.getMonth() !== month ? -1 : undefined}
                    key={start.getTime()}
                    onClick={(evt) => void onClick?.(new Date(start), evt)}>
                    {start.getDate() === 1 ? <span>{MONTHS[start.getMonth()]}</span> : undefined}
                </DateComponent>,
            );

            start.setDate(start.getDate() + 1);
        }

        return els;
    }, [month, year, onClick, currentYear, currentMonth, currentDate]);

    return (
        <div
            style={style}
            className={cx(
                'bg-sheet grid grid-rows-[1fr_repeat(5,_2fr)] grid-cols-7 auto-rows-[2fr] h-full text-normal-text',
                className,
            )}
            ref={ref}>
            {DAYS.map((name, i) => (
                <div
                    className={cx(
                        i < 6 && 'border-r border-r-line',
                        'text-sm text-dimmed-text text-center pt-2',
                    )}
                    key={name}>
                    {name}
                </div>
            ))}
            {dayEls}
        </div>
    );
});

interface DateComponentProps {
    date: Date;
    className?: string;
    tabIndex?: number;
    standout?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children?: React.ReactNode;
}

const DateButton = React.forwardRef<HTMLButtonElement, DateComponentProps>(function DateComponent(
    { date, className, tabIndex, standout, children, onClick },
    ref,
) {
    return (
        <button
            className={cx('flex flex-col p-4', className)}
            tabIndex={tabIndex}
            title={`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
                date.getDate(),
            ).padStart(2, '0')}`}
            onClick={onClick}
            ref={ref}>
            {standout ? (
                <div className="w-9 h-9 flex justify-center items-center rounded-full bg-today text-light-text -mt-2 -ml-2">
                    <span>{date.getDate()}</span>
                </div>
            ) : (
                <span>{date.getDate()}</span>
            )}
            {children}
        </button>
    );
});

export default MonthView;

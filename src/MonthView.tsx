import './month.css';

import React, { useMemo } from 'react';

import { Event as EventType, MonthNum } from './type';
import { cx, dateToString, dateToTime, DAYS as DEFAULT_DAYS, MONTHS as DEFAULT_MONTHS } from './utils';

interface MonthViewProps {
    month: MonthNum;
    year: number;
    onClick?: (date: Date, events: EventType[], evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    DateComponent?: typeof DateButton;
    style?: React.CSSProperties;
    className?: string;
    DAYS?: string[];
    MONTHS?: string[];
    events?: EventType[];
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
        events,
    },
    ref,
) {
    const today = new Date();
    const currentDateString = dateToString(today);

    const eventsByStartDate = useMemo(
        () =>
            (events || [])
                .sort((a, b) => a.start.getTime() - b.start.getTime())
                .reduce((acc, evt) => {
                    acc[dateToString(evt.start)] = acc[dateToString(evt.start)] || [];
                    acc[dateToString(evt.start)].push(evt);
                    return acc;
                }, {} as Record<string, EventType[]>),
        [events],
    );

    const dayEls = useMemo(() => {
        const start = new Date(year, month, 1);

        const nextMonth = new Date(start);
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        if (start.getDay() > 0) {
            start.setDate(start.getDate() - start.getDay());
        }

        const curr = new Date();
        const els = [];
        let count = 0;
        while (start < nextMonth || count % 7 > 0) {
            count++;
            const dateString = dateToString(start);
            const isToday = dateString === currentDateString;
            const dateEvents = eventsByStartDate[dateString];

            els.push(
                <DateComponent
                    date={new Date(start)}
                    standout={isToday}
                    className={cx(
                        'flex flex-col p-4 border-t border-line',
                        count % 7 !== 0 && 'border-r',
                        start.getMonth() !== month && 'text-grayed-out',
                    )}
                    tabIndex={start.getMonth() !== month ? -1 : undefined}
                    key={start.getTime()}
                    onClick={(evt) => void onClick?.(new Date(start), dateEvents, evt)}>
                    {start.getDate() === 1 ? (
                        <div className="text-left">{MONTHS[start.getMonth()]}</div>
                    ) : null}
                    {dateEvents?.map((evt, i) => (
                        <p
                            key={i}
                            className={cx(
                                'w-full relative truncate text-xs text-dimmed-text pl-4 before:content-["*"]  before:text-xl before:absolute before:-top-1 before:left-0',
                                i === 0 ? 'mt-3' : 'mt-1',
                                start > curr && 'before:text-event-dot',
                            )}>
                            <strong>{`${dateToTime(evt.start)}`}</strong>
                            {` ${evt.title}`}
                        </p>
                    ))}
                </DateComponent>,
            );

            start.setDate(start.getDate() + 1);
        }

        return els;
    }, [month, year, onClick, currentDateString, eventsByStartDate]);

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
            className={className}
            tabIndex={tabIndex}
            title={dateToString(date)}
            onClick={onClick}
            ref={ref}>
            {standout ? (
                <div className="w-9 h-9 flex justify-center items-center rounded-full bg-today text-light-text -mt-2 -ml-2">
                    <span>{date.getDate()}</span>
                </div>
            ) : (
                <span className="text-left">{date.getDate()}</span>
            )}
            {children}
        </button>
    );
});

export default MonthView;

// import './calendar.css';

// import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import { addMonth, cx, DAYS, diffMonth, MONTHS } from './utils';

// interface MonthData {
//     date: Date;
//     index: number;
// }

// interface CalendarProps {
//     className?: string;
//     start?: Date;
//     animationDuration?: number;
// }

// export default function Calendar({ animationDuration = 600, className, start = new Date() }: CalendarProps) {
//     const [dates, setDates] = useState<Array<MonthData>>([
//         { date: new Date(start.getFullYear(), start.getMonth(), 1), index: 0 },
//     ]);

//     const nextHandler = useCallback(() => {
//         const currMonth = dates.find((dt) => dt.index === 0);
//         if (currMonth) {
//             setDates(generateMonthList(currMonth.date, addMonth(currMonth.date, 1)));
//         }
//     }, [dates, setDates]);

//     const prevHandler = useCallback(() => {
//         const currMonth = dates.find((dt) => dt.index === 0);
//         if (currMonth) {
//             setDates(generateMonthList(currMonth.date, addMonth(currMonth.date, -1)));
//         }
//     }, [dates, setDates]);

//     const handleTransitionEnd = useCallback(() => {
//         setDates((dates) => [{ ...dates[dates.length - 1], index: 0 }]);
//     }, [setDates]);

//     useEffect(() => {
//         const currMonth = dates.find((dt) => dt.index === 0);
//         if (currMonth) {
//             setDates(generateMonthList(currMonth.date, start));
//         }
//     }, [start.getFullYear(), start.getMonth(), start.getDate()]);

//     const viewportStyle = useMemo(() => {
//         return {
//             '--calendar-animation-duration': `${animationDuration}ms`,
//         } as React.CSSProperties;
//     }, [animationDuration]);

//     let containerStyle = undefined;
//     if (dates.length > 1) {
//         const direction = dates[dates.length - 1].index > 0 ? -1 : 1;
//         containerStyle = {
//             transform: `translate3d(${(dates.length - 1) * direction * 100}%,0,0)`,
//             transition: 'transform ease-out var(--calendar-animation-duration)',
//         };
//     }

//     return (
//         <div className={cx('c-viewport', className)} style={viewportStyle}>
//             <div className="c-container" style={containerStyle} onTransitionEnd={handleTransitionEnd}>
//                 {dates.map(({ date, index }) => (
//                     <Sheet
//                         index={index}
//                         key={date.toDateString()}
//                         month={date.getMonth() as Month}
//                         year={date.getFullYear()}
//                         onNext={index === 0 ? nextHandler : undefined}
//                         onPrev={index === 0 ? prevHandler : undefined}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// }

// function generateMonthList(from: Date, to: Date): MonthData[] {
//     const diff = diffMonth(from, to);
//     const last = Math.min(Math.abs(diff), 3);

//     const result: MonthData[] = [{ date: from, index: 0 }];

//     for (let i = 1; i <= last; i++) {
//         if (diff >= 0) {
//             result.push({ date: addMonth(to, i - last), index: i });
//         } else {
//             result.push({ date: addMonth(to, last - i), index: -i });
//         }
//     }

//     return result;
// }


// interface SheetProps {
//     month: Month;
//     year: number;
//     style?: React.CSSProperties;
//     index: number;
//     onPrev?: React.MouseEventHandler<HTMLButtonElement>;
//     onNext?: React.MouseEventHandler<HTMLButtonElement>;
// }


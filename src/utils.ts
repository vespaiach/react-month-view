export function cx(...name: unknown[]) {
    return name.filter(Boolean).map(String).join(' ') || undefined;
}
export function addMonth(dt: Date, month: number) {
    const next = new Date(dt);
    next.setMonth(next.getMonth() + month);
    return next;
}
export function diffMonth(fromMonth: Date, toMonth: Date): number {
    if (fromMonth > toMonth) {
        return diffMonth(toMonth, fromMonth);
    }

    return (toMonth.getFullYear() - fromMonth.getFullYear()) * 12 + toMonth.getMonth() - fromMonth.getMonth();
}
export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
export function dateToString(dt: Date): string {
    return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(
        2,
        '0',
    )}`;
}
export function dateToTime(dt: Date): string {
    const h = dt.getHours();
    return `${h <= 12 ? h : h % 12}:${String(dt.getMinutes()).padStart(2, '0')} ${h <= 12 ? 'am' : 'pm'}`;
}

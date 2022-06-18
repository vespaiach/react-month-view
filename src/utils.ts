export function cx(...name: unknown[]) {
    return name.filter(Boolean).map(String).join(' ') || undefined;
}

export function addMonth(dt: Date, month: number) {
    const next = new Date(dt);
    next.setMonth(next.getMonth() + month);
    return next;
}

export function diffMonth(fromMonth: Date, toMonth: Date) {
    return (
        (Math.abs(toMonth.getFullYear() - fromMonth.getFullYear()) * 12 +
            Math.abs(toMonth.getMonth() - fromMonth.getMonth())) *
        (toMonth >= fromMonth ? 1 : -1)
    );
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

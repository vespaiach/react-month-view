export function cx(...name: unknown[]) {
    return name.filter(Boolean).map(String).join(' ');
}

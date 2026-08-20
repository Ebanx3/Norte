export const orderByDateDesc = <T extends { date: string }>(items: T[]): T[] => {
    return [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
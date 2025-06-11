const levenshteinDistance = (a: string, b: string): number => {
    const matrix: number[][] = [];

    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            matrix[i][j] =
                b.charAt(i - 1) === a.charAt(j - 1)
                    ? matrix[i - 1][j - 1]
                    : Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
        }
    }

    return matrix[b.length][a.length];
};


const ByCoincidence = <T extends { id: string | number;[key: string]: any }>(
    array: T[],
    search: string,
    id: string | number
): T[] => {
    const currentItem = array.filter(item => item.id === id);
    const filteredArray = array.filter(item => item.id !== id);

    const sortedArray = filteredArray.sort((a, b) => {
        const firstValueA = String(Object.values(a)[0]).toLowerCase();
        const firstValueB = String(Object.values(b)[0]).toLowerCase();
        const searchLower = search.toLowerCase();

        const distanceA = levenshteinDistance(searchLower, firstValueA);
        const distanceB = levenshteinDistance(searchLower, firstValueB);

        const containsA = firstValueA.includes(searchLower) ? 0 : 1;
        const containsB = firstValueB.includes(searchLower) ? 0 : 1;

        const startsWithA = firstValueA.startsWith(searchLower) ? 0 : 1;
        const startsWithB = firstValueB.startsWith(searchLower) ? 0 : 1;

        if (startsWithA !== startsWithB) return startsWithA - startsWithB;
        if (containsA !== containsB) return containsA - containsB;
        if (distanceA !== distanceB) return distanceA - distanceB;

        return (b.Usage ?? 0) - (a.Usage ?? 0); // fallback si no hay Usage
    });

    return [...currentItem, ...sortedArray];
};

const Alphabetical = <T extends { [key: string]: any }>(array: T[], key: keyof T): T[] => {
    return [...array].sort((a, b) =>
        String(a[key]).localeCompare(String(b[key]))
    );
}

const ByDate = <T extends { date: string | Date }>(array: T[]): T[] => {
    return [...array].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

const ByUsage = <T extends { usage: number }>(array: T[]): T[] => {
    return [...array].sort((a, b) => b.usage - a.usage);
}

export const Sort = {
    ByCoincidence, Alphabetical, ByDate, ByUsage
}
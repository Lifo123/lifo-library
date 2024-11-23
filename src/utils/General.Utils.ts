const IDnumber = (): number => {
    return Date.now() + Math.random();
};

let counter = 0;
const IDstring = (): string => {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 8);
    const increment = (counter++).toString(36);

    return `${timestamp}-${increment}-${randomPart}`;
};

const timeTracker = async <T extends any[], R>(
    funct: (...args: T) => Promise<R> | R,
    ...args: T
) => {
    const startTime = performance.now();
    try {
        await funct(...args);
    } catch (e) {
        console.log(e);
    }finally{
        const endTime = performance.now();
        return endTime - startTime;
    }
};

export const Flifo = {
    IDnumber, IDstring, timeTracker
};

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


export const Flifo = {
    IDnumber, IDstring
};

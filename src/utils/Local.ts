const set = (path: string, value: any) => {
    const valueToStore = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(path, valueToStore);
}

const get = (path: string) => {
    const storedValue = localStorage.getItem(path);
    if (!storedValue) return {};

    try {
        return JSON.parse(storedValue);
    } catch (error) {
        console.error('Error parsing JSON from localStorage:', error);
        return storedValue;
    }
}

const remove = (key: string) => {
    let exists = localStorage.getItem(key);
    if (!exists) {
        console.log('Storage not found');
        return;
    }
    localStorage.removeItem(key)
}

const inmutable = (obj: any) => {
    return JSON.parse(JSON.stringify(obj));
}

const parse = (str: string) => {
    return JSON.parse(str);
}

const stringify = (obj: any) => {
    return JSON.stringify(obj);
}

export const Local = {
    set,
    get,
    remove,
    inmutable,
    parse,
    stringify
}
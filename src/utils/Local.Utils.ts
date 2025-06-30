
export const Local = (key: string) => {

    const set = (value: any) => {
        if (
            value === undefined ||
            value === null ||
            value === '' ||
            (typeof value === 'object' && Object.keys(value).length === 0)
        ) {
            return;
        }

        const valueToStore = typeof value === 'string' ? value : JSON.stringify(value);
        localStorage.setItem(key, valueToStore);
    }

    const get = (path?: string) => {
        const storedValue = localStorage.getItem(key);
        if (!storedValue) return null;

        let parsed: any;
        try {
            parsed = JSON.parse(storedValue);
        } catch (error) {
            console.error('Error parsing JSON from localStorage:', error);
            return storedValue;
        }

        if (!path) return parsed;

        const keys = path.split('/');
        let current = parsed;

        for (const k of keys) {
            if (typeof current !== 'object' || current === null || !(k in current)) {
                return null;
            }
            current = current[k];
        }

        return current;
    };

    const remove = () => {
        let exists = localStorage.getItem(key);
        if (!exists) {
            console.log('Storage not found');
            return;
        }
        localStorage.removeItem(key)
    }

    const update = (path: string, value: any) => {
        const data = get() || {};
        const keys = path.split("/");
        let current = data;

        for (let i = 0; i < keys.length - 1; i++) {
            const k = keys[i];
            if (typeof current[k] !== "object" || current[k] === null) {
                current[k] = {};
            }
            current = current[k];
        }

        current[keys[keys.length - 1]] = value;

        set(data);
    };

    return {
        set,
        get,
        remove,
        update
    }
}

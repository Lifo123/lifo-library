
function uuid(length: number = 6): string {
    const buffer = new Uint8Array(length / 2);
    crypto.getRandomValues(buffer);

    const id = Array.from(buffer, byte => {
        return byte.toString(16).padStart(2, '0');
    }).join('');

    return `${id.slice(0, length)}`;
}

interface uuidProps {
    length?: number
    prefix?: string
    name?: string
}
function customUUID(options: uuidProps = {}): string {
    let { length, name, prefix } = options;
    return `${name || 'lifo:'}:«${prefix || ''}${uuid(length)}»`;
}

export {
    uuid,
    customUUID
}
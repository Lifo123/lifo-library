
export function normalizePath(path: string): Array<string> {
  if (path === undefined) throw new Error('Path are required')
  const parts = path
    .replace(/\[(\d+)\]/g, '.$1')   // 'a.b[10]' -> 'a.b.10'
    .replace(/^\./, '')             // '[10]' -> '.10' -> '10'
    .split('.');                    // 'a.b.c' -> ['a', 'b', 'c']
  const keys = parts.filter(key => key !== '');
  return keys.length === 0 ? [''] : keys;
}

export function isObject(obj: any): boolean {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj)
}

export function getPath<
  K extends string,
  T extends unknown
>(
  path: K,
  obj: T
): Object {
  if (path === '') return obj as any;

  const keys = normalizePath(path);

  const result = keys.reduce((current, key) => {
    if (current === null || typeof current !== 'object') return undefined;
    return (current as any)[key];
  }, obj);

  return result as any;
}

export function setPath<
  K extends string,
  T extends unknown
>(
  path: K,
  value: Object | undefined,
  obj: T
): T {
  const keys = normalizePath(path)

  if (path === '') {
    return value as any;
  }

  const copy = (Array.isArray(obj) ? [...obj] : { ...obj as any }) as any;
  let pointer = copy;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const nextKey = keys[i + 1];

    const originalNode = pointer[key];
    const isNextNodeArray = /^\d+$/.test(nextKey);

    let newNode;
    if (isNextNodeArray) {
      newNode = Array.isArray(originalNode) ? [...originalNode] : [];
    } else {
      newNode = isObject(originalNode) ? { ...originalNode } : {};
    }

    pointer[key] = newNode;
    pointer = pointer[key];
  }

  const lastKey = keys[keys.length - 1];
  if (value === undefined) {
    if (Array.isArray(pointer) && /^\d+$/.test(lastKey)) {
      pointer.splice(Number(lastKey), 1);
    } else if (typeof pointer === 'object' && pointer !== null) {
      delete pointer[lastKey];
    }
  } else {
    pointer[lastKey] = value;
  }
  return copy;
}

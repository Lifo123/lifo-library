import { getPath, isObject, setPath } from "./path.js";

type LocalOptions = {
  prefix?: string
}

export function Local(key: string, options?: LocalOptions) {
  const formatKey = `${options?.prefix || ''}${key}`;

  function getKey(path: string) {
    let storedValue = localStorage.getItem(formatKey);

    if (!storedValue) return null;

    let parsedValue = JSON.parse(storedValue);
    const res = getPath(path, parsedValue);

    return res;
  }

  function setKey(path: string, value: any) {
    let storedValue = localStorage.getItem(formatKey);
    if (!storedValue) return null;

    let parsedValue = JSON.parse(storedValue);

    const res = setPath(path, value, parsedValue);
    localStorage.setItem(formatKey, JSON.stringify(res));
  }

  function updateKey(path: string, value: any) {
    const storedValue = localStorage.getItem(formatKey);
    if (!storedValue) return null;

    let parsedValue = JSON.parse(storedValue);
    const getValue = getPath(path, parsedValue);

    let newValue = value;

    if(isObject(getValue) && isObject(value)){
      newValue = { ...getValue, ...value };
    } else if(Array.isArray(getValue) && Array.isArray(value)){
      newValue = [...getValue, ...value];
    }

    const res = setPath(path, newValue, parsedValue);
    localStorage.setItem(formatKey, JSON.stringify(res));
  }

  function removeKey(path: string) {
    let storedValue = localStorage.getItem(formatKey);
    if (!storedValue) return null;
    if(path === '') return localStorage.removeItem(formatKey);

    let parsedValue = JSON.parse(storedValue);
    const res = setPath(path, undefined, parsedValue);
    localStorage.setItem(formatKey, JSON.stringify(res));
  }

  return{
    getKey, 
    setKey, 
    updateKey,
    removeKey,
    get: () => getKey(''),
    set: (value: any) => setKey('', value),
    update: (value: any) => updateKey('', value),
    remove: () => removeKey('')
  }

}
import { projectName } from "../Stores/config.js";

type LocalManager = {
  [key: string]: ReturnType<typeof Local>;
};

const normalizePath = (path: string) => path.replace(/\[(\d+)\]/g, ".$1");
const isIndex = (key: string) => !isNaN(Number(key));
function deepMerge(target: any, source: any): any {
  if (typeof target !== "object" || target === null) return source;
  if (typeof source !== "object" || source === null) return source;

  const output = Array.isArray(target) ? [...target] : { ...target };

  for (const key of Object.keys(source)) {
    if (key in target) {
      output[key] = deepMerge(target[key], source[key]);
    } else {
      output[key] = source[key];
    }
  }

  return output;
}

const Local = (key: string) => {
  const get = (path?: string) => {
    const storedValue = localStorage.getItem(projectName + key);
    if (!storedValue) return null;

    let parsed: any;
    try {
      parsed = JSON.parse(storedValue);
    } catch {
      return storedValue;
    }

    if (!path) return parsed;

    const keys = normalizePath(path).split(".");
    let current = parsed;

    for (const k of keys) {
      if (Array.isArray(current) && isIndex(k)) {
        const idx = Number(k);
        if (idx < 0 || idx >= current.length) return null;
        current = current[idx];
      } else if (typeof current === "object" && current !== null && k in current) {
        current = current[k];
      } else {
        return null;
      }
    }

    return current;
  };

  const update = (pathOrValue: string | Record<string, any>, maybeValue?: any) => {
    // Caso: merge superficial con objeto
    if (typeof pathOrValue !== "string") {
      const value = pathOrValue;
      if (value === undefined || value === null) return;
      const existing = get() || {};
      const merged = deepMerge(existing, value);
      localStorage.setItem(projectName + key, JSON.stringify(merged));
      return;
    }

    // Caso: path + value
    const path = normalizePath(pathOrValue);
    const value = maybeValue;

    const data = get() || {};
    const keys = path.split(".");
    let current = data;

    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (isIndex(k)) {
        const idx = Number(k);
        if (!Array.isArray(current)) current[k] = [];
        if (!current[idx]) current[idx] = {};
        current = current[idx];
      } else {
        if (typeof current[k] !== "object" || current[k] === null) {
          current[k] = {};
        }
        current = current[k];
      }
    }

    const lastKey = keys.at(-1)!;
    if (isIndex(lastKey)) {
      const idx = Number(lastKey);
      if (!Array.isArray(current)) current = [];
      current[idx] = value;
    } else {
      current[lastKey] = value;
    }

    localStorage.setItem(projectName + key, JSON.stringify(data));
  };

  const set = (value: any) => {
    // set duro → reemplaza todo
    if (
      value === undefined ||
      value === null ||
      value === "" ||
      (typeof value === "object" && Object.keys(value).length === 0)
    ) {
      return;
    }
    const valueToStore =
      typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(projectName + key, valueToStore);
  };

  const remove = () => {
    localStorage.removeItem(projectName + key);
  };

  return { set, get, update, remove };
};

export const ManageLocal = (() => {
  const registry: LocalManager = {};

  const create = (name: string) => {
    if (!registry[name]) {
      registry[name] = Local(name);
    }
    return registry[name];
  };

  return new Proxy(registry, {
    get(target, prop: string) {
      if (!(prop in target)) {
        return create(prop);
      }
      return target[prop];
    },
  });
})();

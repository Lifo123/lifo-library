export const isBrowser = typeof window !== "undefined";
export const projectName = isBrowser ? (window.location.pathname === '/' ? 'lifo/lib' : window.location.pathname.split('/').filter(Boolean)[0]) : 'lifo/libs';
export const localPrefsKey = `${projectName}-preferences`;
export const localUserKey = `${projectName}-user`;
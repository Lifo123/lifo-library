export const isBrowser = typeof window !== "undefined";
export const isMotionPrefers = isBrowser ?? window.matchMedia("(prefers-reduced-motion: reduce)").matches;


export const projectName = isBrowser ? (
    window.location.pathname === '/' ? 'lifo/lib-' :
        window.location.pathname.split('/').filter(Boolean)[0] + '-'
) : 'lifo/lib-';

export const isBrowser = typeof window !== "undefined";
export const isSSR = !isBrowser;

export const isMotionPrefers =
    isBrowser && window.matchMedia("(prefers-reduced-motion: reduce)").matches;


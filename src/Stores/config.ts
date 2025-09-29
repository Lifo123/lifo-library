import { Flifo } from "../utils/General.Utils.js";

export const isBrowser = typeof window !== "undefined";
export const isMobile = isBrowser ?? Flifo.isMobile();
export const isMotionPrefers = isBrowser ?? window.matchMedia("(prefers-reduced-motion: reduce)").matches;


export const projectName = isBrowser ? (
    window.location.pathname === '/' ? 'lifo/lib-' :
        window.location.pathname.split('/').filter(Boolean)[0] + '-'
) : 'lifo/lib-';

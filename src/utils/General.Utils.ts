'use client'
export const timeTracker = async <T extends any[], R>(
    funct: (...args: T) => Promise<R> | R,
    ...args: T
) => {
    const startTime = performance.now();
    try {
        await funct(...args);
    } catch (e) {
        console.log(e);
    } finally {
        const endTime = performance.now();
        return endTime - startTime;
    }
};

export function isMobile(): boolean {
    const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    return isSmallScreen || isTouch;
};

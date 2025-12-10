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

export const toPx = (value: string) => {
    if (/^\d+px$/.test(value)) return parseFloat(value);
    const el = document.createElement("div");
    el.style.width = value;
    el.style.visibility = "hidden";
    document.body.appendChild(el);
    const pixels = el.getBoundingClientRect().width;
    document.body.removeChild(el);
    return pixels;
}

export const getRect = (el: HTMLElement) => {
    const elRect = el.getBoundingClientRect();
    return {
        top: elRect.top,
        bottom: elRect.bottom,
        left: elRect.left,
        right: elRect.right,
        height: el.offsetHeight,
        width: el.offsetWidth,

        margin: {
            top: elRect.top,
            bottom: window.innerHeight - elRect.bottom,
            left: elRect.left,
            right: window.innerWidth - elRect.right,
        },
        center: {
            x: elRect.left + el.offsetWidth / 2,
            y: elRect.top + el.offsetHeight / 2,
        }
    }
}

export function isMobile(): boolean {
    const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    return isSmallScreen || isTouch;
};

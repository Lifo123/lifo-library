'use client'
import { isMobile } from "./General.Utils";

let scrollcount = 0;

export const hasVisibleVerticalScrollbar = (el: HTMLElement) => {
    const style = getComputedStyle(el);
    const overflowY = style.overflowY;

    const isOverflowing = el.scrollHeight > el.clientHeight;

    const allowsScroll =
        overflowY === "scroll" ||
        overflowY === "auto" ||
        (overflowY === "visible" && isOverflowing);

    return (allowsScroll && isOverflowing);
};

const set = (state: boolean, target?: HTMLElement) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const TARGET = target instanceof HTMLElement ? target : document.documentElement;
    const scrollbarWidth = window.innerWidth - TARGET.clientWidth;

    const shouldAdjustPadding = !isMobile() && hasVisibleVerticalScrollbar(TARGET);

    if (!state) {
        const nextCount = scrollcount + 1;

        if (nextCount === 1) {
            if (shouldAdjustPadding) {
                TARGET.style.paddingRight = `${scrollbarWidth}px`;
                document.documentElement.style.setProperty('--padding-cut', `${scrollbarWidth}px`);
            }
            TARGET.style.overflow = "hidden";
        }
    } else {
        scrollcount = Math.max(0, scrollcount - 1);

        if (scrollcount === 0) {
            TARGET.style.overflow = "";
            TARGET.style.paddingRight = "";
            document.documentElement.style.removeProperty('--padding-cut');
        }
    }

    return scrollcount;
};


const reset = (target?: HTMLElement) => {
    scrollcount = 0;
    const TARGET = target instanceof HTMLElement ? target : document.documentElement;
    TARGET.style.overflow = "";
    TARGET.style.paddingRight = "";
    document.documentElement.style.removeProperty('--padding-cut');
}


export const Scroll = {
    set,
    show: (target?: HTMLElement) => set(true, target),
    hide: (target?: HTMLElement) => set(false, target),
    reset
};

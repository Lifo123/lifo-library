export const isMobile = () => {
    const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    return isSmallScreen || isTouch;
};

export const hasVisibleVerticalScrollbar = (el: HTMLElement) => {
    const style = getComputedStyle(el);
    const overflowY = style.overflowY;

    const isOverflowing = el.scrollHeight > el.clientHeight;

    const allowsScroll =
        overflowY === "scroll" ||
        overflowY === "auto" ||
        (overflowY === "visible" && el.scrollHeight > el.clientHeight);

    return !(allowsScroll && isOverflowing);
};


const set = (state: boolean, target?: HTMLElement | React.ReactNode) => {
    const TARGET = target instanceof HTMLElement ? target : document.body;

    const scrollbarWidth = window.innerWidth - TARGET.clientWidth;
    const shouldAdjustPadding = !isMobile() && hasVisibleVerticalScrollbar(TARGET);

    if (!state) {
        // Ocultar scroll
        if (shouldAdjustPadding) {
            TARGET.style.paddingRight = `${scrollbarWidth}px`;
            document.documentElement.style.setProperty('--padding-cut', `${scrollbarWidth}px`);
        } else {
            document.documentElement.style.removeProperty('--padding-cut');
        }
        TARGET.style.overflow = "hidden";
    } else {
        // Mostrar scroll
        TARGET.style.overflow = "";
        if (shouldAdjustPadding) {
            TARGET.style.paddingRight = "";
            document.documentElement.style.removeProperty('--padding-cut');
        }
    }
};


export const Scroll = {
    set,
    show: (target?: HTMLElement | React.ReactNode) => set(true, target),
    hide: (target?: HTMLElement | React.ReactNode) => set(false, target),
};
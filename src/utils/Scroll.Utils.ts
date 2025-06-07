import type React from "react";

const set = (state: boolean, target?: HTMLElement | React.ReactNode) => {
    const TARGET = target instanceof HTMLElement ? target : document.documentElement;

    const scrollbarWidth = window.innerWidth - TARGET.clientWidth;
    document.documentElement.style.setProperty('--padding-cut', `${scrollbarWidth}px`);

    if (state) {
        // Habilitar scroll
        TARGET.style.overflow = "";
        TARGET.style.paddingRight = ""; // Restaurar padding
    } else {
        // Deshabilitar scroll y compensar el ancho del scrollbar
        TARGET.style.overflow = "hidden";
        TARGET.style.paddingRight = `${scrollbarWidth}px`;
    }
};


export const Scroll = {
    set,
    show: (target?: HTMLElement | React.ReactNode) => set(true, target),
    hide: (target?: HTMLElement | React.ReactNode) => set(false, target),
};
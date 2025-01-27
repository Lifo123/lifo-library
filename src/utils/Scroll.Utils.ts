import type React from "react";

const set = (state: boolean, target?: HTMLElement | React.ReactNode) => {
    const TARGET = target instanceof HTMLElement ? target : document.documentElement;

    if (!(TARGET instanceof HTMLElement)) {
        console.error("Invalid target element provided.");
        return;
    }

    const scrollbarWidth = window.innerWidth - TARGET.clientWidth;

    if (state) {
        // Habilitar scroll
        TARGET.style.overflow = "auto";
        TARGET.style.paddingRight = "0px"; // Restaurar padding
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

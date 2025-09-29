'use client';
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { hasVisibleVerticalScrollbar, Scroll } from "../utils/Scroll.Utils.js";

interface Props {
    margin?: number;
    horizontalMargin?: number;
    frezzeScroll?: boolean;
}

export function useDropdown({
    frezzeScroll = false,
    ...props
}: Props = {}) {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnim, setIsAnim] = useState(false);
    const [openDirection, setOpenDirection] = useState<"up" | "down">("down");


    const btnRef = useRef<HTMLSpanElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const margin = props.margin !== undefined ? props.margin : 10;

    //UPDATE POSICION
    const updatePosition = () => {
        const btn = btnRef.current;
        const dropdown = dropdownRef.current;
        const hasScroll = hasVisibleVerticalScrollbar(document.documentElement);

        if (!btn || !dropdown) return;

        const btnRect = btn.getBoundingClientRect();
        const dropdownHeight = dropdown.offsetHeight;
        const dropdownWidth = dropdown.offsetWidth;

        const spaceBelow = window.innerHeight - btnRect.bottom;
        const spaceAbove = btnRect.top;
        const openUpwards = dropdownHeight > spaceBelow && spaceAbove > spaceBelow;
        setOpenDirection(openUpwards ? "up" : "down");

        const maxHeight = openUpwards
            ? btnRect.top - margin * 2
            : window.innerHeight - btnRect.bottom - margin * 2;

        const top = openUpwards
            ? Math.max(margin, btnRect.top - dropdownHeight - margin)
            : Math.min(btnRect.bottom + margin, window.innerHeight - dropdownHeight - margin);


        // 🧠 Posicionamiento horizontal con margen respecto a los bordes del viewport
        let left = btnRect.left + window.scrollX;
        const rightEdge = left + dropdownWidth;
        const viewportWidth = window.innerWidth;
        const horizontalMargin = (props.horizontalMargin ?? 8) + (hasScroll ? 8 : 0);


        // Si se sale por la derecha, empújalo hacia la izquierda
        if (rightEdge + horizontalMargin > viewportWidth) {
            left = viewportWidth - dropdownWidth - horizontalMargin;
        }

        // Si se va muy a la izquierda, empújalo hacia la derecha
        if (left < horizontalMargin) {
            left = horizontalMargin;
        }

        const maxWidth = viewportWidth - horizontalMargin * 2;

        Object.assign(dropdown.style, {
            top: `${top}px`,
            left: `${left}px`,
            minWidth: `${btnRect.width}px`,
            maxWidth: `${maxWidth}px`,
            maxHeight: `${maxHeight}px`,
            overflowY: "auto",
            zIndex: "999",
        });
    };



    const toggle = (state: boolean) => {
        if (state) {
            setIsVisible(true);
            setTimeout(() => setIsAnim(true), 10);
        } else {
            setIsAnim(false);
            setTimeout(() => setIsVisible(false), 100);
        }
        if (frezzeScroll) {
            Scroll[state ? "hide" : "show"]()
        }
    };


    // Cierre al hacer clic fuera
    useEffect(() => {
        if (!isVisible) return;

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                !dropdownRef.current?.contains(target) &&
                !btnRef.current?.contains(target)
            ) {
                toggle(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isVisible]);

    // Reposicionar en scroll, resize y cambio de tamaño del botón
    useLayoutEffect(() => {
        if (!isVisible) return;

        updatePosition();

        const handleScrollOrResize = () => updatePosition();
        const resizeObserver = new ResizeObserver(() => updatePosition());

        window.addEventListener("scroll", handleScrollOrResize);
        window.addEventListener("resize", handleScrollOrResize);
        btnRef.current && resizeObserver.observe(btnRef.current);

        return () => {
            window.removeEventListener("scroll", handleScrollOrResize);
            window.removeEventListener("resize", handleScrollOrResize);
            resizeObserver.disconnect();
        };
    }, [isVisible]);

    // Cierre si cambia de pestaña o pierde foco
    useEffect(() => {
        const handleWindowBlur = () => toggle(false);
        const handleVisibilityChange = () => {
            if (document.hidden) toggle(false);
        };

        window.addEventListener("blur", handleWindowBlur);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            window.removeEventListener("blur", handleWindowBlur);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    return {
        isVisible,
        isAnim,
        btnRef,
        dropdownRef,
        toggle,
        openDirection,
    };

}

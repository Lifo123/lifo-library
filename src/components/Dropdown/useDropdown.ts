'use strict'
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Scroll } from "../../utils/Scroll.Utils.js";
import { DropDownAllTypes } from "./Dropdown.Types.js";


export function useDropdown({ ...props }: DropDownAllTypes = {}) {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnim, setIsAnim] = useState(false);

    const btnRef = useRef<HTMLSpanElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggle = (state: boolean) => {
        state ? setIsVisible(state) : setIsAnim(state);
        setTimeout(() => {
            state ? setIsAnim(state) : setIsVisible(state);
        }, props.animate?.duration || 100);

        Scroll[state ? "hide" : "show"]();
    };

    // Cierre al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                !btnRef.current?.contains(event.target as Node)
            ) {
                toggle(false);
            }
        };

        if (isVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isVisible]);

    // Cierre al hacer resize
    useEffect(() => {
        const handleResize = () => toggle(false);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Posicionamiento dinámico
    useLayoutEffect(() => {
        if (isVisible && btnRef.current && dropdownRef.current) {
            requestAnimationFrame(() => {
                const btnRect = btnRef.current!.getBoundingClientRect();
                const dropdown = dropdownRef.current!;

                const dropdownHeight = dropdown.offsetHeight;
                const spaceBelow = window.innerHeight - btnRect.bottom;
                const spaceAbove = btnRect.top;
                const shouldOpenUpwards = dropdownHeight > spaceBelow && spaceAbove > spaceBelow;

                dropdown.style.top = shouldOpenUpwards
                    ? `${btnRect.top - dropdownHeight - 8}px`
                    : `${btnRect.bottom + 8}px`;

                dropdown.style.left = `${btnRect.left}px`;
                dropdown.style.minWidth = `${btnRect.width}px`;
                dropdown.style.zIndex = "999";
            });
        }
    }, [isVisible]);

    return {
        isVisible,
        isAnim,
        btnRef,
        dropdownRef,
        toggle,
    };
}

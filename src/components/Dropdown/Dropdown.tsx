// Dropdown.tsx
'use client';
import React, { createContext, useRef, useState } from "react";
import { DropdownContextProps, DropdownPropsTypes } from "./Drop.types.js";
import { Scroll } from "../../utils/Scroll.Utils.js";

export const DropdownContext = createContext<DropdownContextProps>({
    dropRef: null,
    btnRef: null,

    isOpen: false,
    isAnim: false,
    duration: '10ms',

    handleOpen: () => { },
});

export default function Dropdown(props: Omit<DropdownPropsTypes, 'maxHeight' | 'minHeight'>) {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnim, setIsAnim] = useState(false);

    const dropRef = useRef<HTMLDivElement | any>(null);
    const btnRef = useRef<HTMLDivElement | any>(null);

    const handleOpen = (state: boolean) => {
        if (state) {
            props.frezzeScroll && Scroll.hide();
            setIsOpen(true); requestAnimationFrame(() => setIsAnim(true));
        } else {
            props.frezzeScroll && Scroll.show();
            setIsAnim(false); setTimeout(() => setIsOpen(false), 120);
        }
    };

    React.useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (!dropRef.current?.contains(target) && !btnRef.current?.contains(target)) {
                handleOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    return (
        <DropdownContext.Provider value={{
            dropRef, btnRef, isOpen, isAnim, duration: props.duration || '90ms', handleOpen
        }}>
            <div className="drop-all relative">
                {props.children}
            </div>
        </DropdownContext.Provider>
    );
}

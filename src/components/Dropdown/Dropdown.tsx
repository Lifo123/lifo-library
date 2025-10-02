'use client';
import React from "react";
import { DropdownPropsTypes } from "./Drop.types.js";
import { DropDownContext } from "./Drop.Context.js";
import { Scroll } from "../../utils/Scroll.Utils.js";

export interface DropdownProps extends Omit<DropdownPropsTypes, 'maxHeight' | 'minHeight'> { }

export default function Dropdown(props: DropdownProps) {

    const [isOpen, setIsOpen] = React.useState(false);
    const [isAnim, setIsAnim] = React.useState(false);

    const dropRef = React.useRef<any>(null);
    const btnRef = React.useRef<any>(null);


    const handleOpen = (state: boolean) => {
        if (state) {
            props.frezzeScroll && Scroll.hide();
            setIsOpen(true);
            requestAnimationFrame(() => setIsAnim(true));
        } else {
            props.frezzeScroll && Scroll.show();
            setIsAnim(false);
            setTimeout(() => setIsOpen(false), 120);
        }
    };


    React.useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                !dropRef.current?.contains(target) &&
                !btnRef.current?.contains(target)
            ) {
                handleOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    return (
        <DropDownContext.Provider value={{
            isOpen, isAnim, handleOpen,
            btnRef, dropRef, duration: props.duration ?? '120ms'
        }}>
            <div className="drop-all relative">
                {props.children}
            </div>
        </DropDownContext.Provider>
    )
}
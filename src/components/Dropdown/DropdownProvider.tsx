'use client';
import React from "react";
import { DropdownPropsTypes } from "./Drop.types.js";
import useDropdown, { returnValues, useDropdownProps } from "../../hooks/useDropdown.js";

interface DropdownContextProps {
    dropRef: React.RefObject<HTMLDivElement> | null;
    btnRef: React.RefObject<HTMLDivElement> | null;

    isOpen?: boolean;
    isAnim?: boolean;
    values?: returnValues;
    isPopover?: boolean;

    dir: useDropdownProps['dir'];
    handleOpen: (state: boolean) => void;
}

export const DropdownContext = React.createContext<DropdownContextProps>({
    dropRef: null,
    btnRef: null,
    dir: 'btr',
    handleOpen: () => { },
});

export function DropdownProvider(props: DropdownPropsTypes) {
    const btnRef = React.useRef<HTMLDivElement | any>(null);
    const dropRef = React.useRef<HTMLDivElement | any>(null);

    const { handleOpen, isOpen, isAnim, values, isPopover } = useDropdown({
        elementRef: btnRef,
        floatingRef: dropRef,
        dir: props.dir,
        autoAdjust: props.autoAdjust,
        overlap: props.overlap,
        els: props.els,
        offset: props.offset,
        margin: props.margin,
        duration: props.duration,
        minSpaceY: props.minSpaceY,
        minSpaceX: props.minSpaceX,
        frezzeScroll: props.frezzeScroll,
        popover: props.popover,
    });

    return (
        <DropdownContext.Provider value={{
            btnRef, dropRef,
            dir: props.dir,
            isOpen, isAnim, values, isPopover,
            handleOpen
        }}>
            {props.children}
        </DropdownContext.Provider>
    );
}

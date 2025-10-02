'use client';
import { createContext } from "react";

interface DropDownContextProps {
    dropRef: React.RefObject<HTMLDivElement> | null;
    btnRef: React.RefObject<HTMLDivElement> | null;

    isOpen: boolean;
    isAnim: boolean;
    duration: string;
    
    handleOpen: (state: boolean) => void;
}


export const DropDownContext = createContext<DropDownContextProps>({
    dropRef: null,
    btnRef: null,

    isOpen: false,
    isAnim: false,
    duration: '120ms',

    handleOpen: () => { },
});
'use strict';
import React, { createContext } from "react";
import { useStore } from "@nanostores/react";

import { BaseComponentProps } from "../../Types/GeneralTypes.js";
import { $interface } from "../../UI/Interface.Store.js";

interface AccordionContextProps {
    isOpen: boolean;
    handleClick: () => void;
    dropRef: React.RefObject<HTMLDivElement> | null;
}

export const AccordionContext = createContext<AccordionContextProps>({
    isOpen: false,
    handleClick: () => { },
    dropRef: null,
})

interface AccordionProps extends BaseComponentProps {
    children?: React.ReactNode;
    closeAll?: boolean;
}

export default function Accordion(props: AccordionProps) {
    const INTERFACE = useStore($interface);

    const [isOpen, setIsOpen] = React.useState(false);
    const dropRef = React.useRef<HTMLDivElement | any>(null);

    const handleClick = () => {
        if (props.closeAll) {
            $interface.setKey("accordionAllClose", true);

            setTimeout(() => {
                $interface.setKey("accordionAllClose", false);
            }, 0);
        }

        return setIsOpen(prev => !prev);
    };


    React.useEffect(() => {
        if (INTERFACE.accordionAllClose && !props.closeAll) {
            setIsOpen(false);
        }
    }, [INTERFACE.accordionAllClose]);


    return (
        <AccordionContext.Provider value={{
            isOpen, handleClick, dropRef
        }}>
            <div
                className={`f-col o-hidden w-full ${props.className || 'border-b border-lifo-border fs-2 text-lifo-text-high'}`}
                style={props.style}
            >
                {props.children}
            </div>
        </AccordionContext.Provider>
    );
}

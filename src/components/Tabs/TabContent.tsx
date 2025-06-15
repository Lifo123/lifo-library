'use client'
import React from "react";

import { BaseComponentProps } from "../../Types/GeneralTypes.js";
import { TabContext } from "./TabMenu.js";

interface TabContent extends BaseComponentProps {
    children?: React.ReactNode;
    animate?: {
        start?: React.CSSProperties;
        end?: React.CSSProperties;
        duration?: number;
    }
}

export default function TabContent(props: TabContent) {
    const { isOpen, setIsOpen, select, setSelect } = React.useContext(TabContext);
    const contentRef = React.useRef<HTMLDivElement>(null);


    React.useEffect(() => {
        if (!isOpen || !contentRef.current || !props?.animate) return;

        const clickOutside = (e: MouseEvent) => {
            const parent = contentRef.current?.parentElement as HTMLElement;
            if (parent?.contains(e.target as Node)) return;
            setIsOpen(false);

            if (props.animate || isOpen) {
                setTimeout(() => {
                    setSelect('');
                }, props.animate?.duration || 180);
            }
        };

        document.addEventListener("click", clickOutside);
        return () => {
            document.removeEventListener("click", clickOutside);
        };
    }, [select, isOpen]);


    return (
        <div className={`tab-content ${props.className || ''} ${props.animate ? `absolute ${isOpen ? 'visible' : 'delete no-select'}` : ''}`}
            style={{
                ...props.style,
                ...(isOpen ? props.animate?.end : props.animate?.start),
                ["--custom-duration" as any]: `${(props.animate?.duration || 0) / 1000}s`
            }}
            data-animation={props.animate ? 'custom' : null}
            data-duration={props.animate?.duration || 0}
            ref={contentRef}
        >
            {props.children}
        </div>
    );
}
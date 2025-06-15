'use client'
import React from "react";
import { TabContext } from "./TabMenu.js";

interface TabItemProps {
    children?: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void | Promise<void>;
    id?: string;
}

export default function TabItem(props: TabItemProps) {
    const {
        select, setSelect,
        isOpen, setIsOpen,
        customize
    } = React.useContext(TabContext);
    const itemRef = React.useRef<HTMLSpanElement>(null);

    const isActive = select === props.id;

    const defaultClass = "tab-item d-flex btn-fourth br-6 pointer fs-2 o-hidden px-3 py-2";
    const baseClass = customize?.item?.className || "";
    const activeClass = isActive ? customize?.activeItem?.className || "active-tab" : "";

    const baseStyle = customize?.item?.style || {};
    const activeStyle = isActive ? customize?.activeItem?.style || {} : {};

    const mergedStyle = { ...baseStyle, ...activeStyle };

    return (
        <span
            className={`${defaultClass} ${baseClass} ${activeClass} ${props.disabled ? 'no-select' : ''}`}
            onClick={async () => {
                if (props.disabled) return;
                if (props.id) {
                    setSelect(props.id);
                    setIsOpen(select === props.id ? !isOpen : true);

                    const ref = itemRef.current?.closest('[data-tabmenu]')?.querySelector('.tab-content') as HTMLElement;
                    const duration = Number(ref?.getAttribute('data-duration')) || 0;
                    const isAnimate = ref?.getAttribute('data-animation');

                    if (isAnimate) {
                        if (select === props.id) {
                            setTimeout(() => {
                                setSelect('');
                            }, duration);
                        }
                    }
                }
            }}
            style={{
                ...mergedStyle,
                ...(props.disabled ? { pointerEvents: 'none', cursor: 'not-allowed', opacity: .85 } : {})
            }}
            ref={itemRef}
        >
            {props.children}
        </span>
    );
}
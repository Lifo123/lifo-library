'use client'
import React, { useEffect } from "react";
import { BaseComponentProps } from "../../Types/GeneralTypes.js";
import { TabContext } from "./TabMenu.js";

interface TabListProps extends BaseComponentProps {
    children: React.ReactNode;
    active?: BaseComponentProps;
}

export default function TabList({ children, className, style, active }: TabListProps) {
    const { setActiveClassName, setActiveStyle } = React.useContext(TabContext);

    useEffect(() => {
        if (active?.className) setActiveClassName(active.className);
        if (active?.style) setActiveStyle(active.style);
    }, [active]);

    return (
        <div className={className || "f-row f-align-center g-2 tab-list"} style={style}>
            {children}
        </div>
    );
}

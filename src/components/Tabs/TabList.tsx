'use client'
import React from "react";
import { BaseComponentProps } from "../../Types/GeneralTypes.js";

interface TabListProps extends BaseComponentProps {
    children: React.ReactNode;
}

export default function TabList({ children, className, style }: TabListProps) {

    return (
        <div className={className || "f-row f-align-center g-2 tab-list"} style={style}>
            {children}
        </div>
    );
}

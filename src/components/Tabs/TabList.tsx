'use client'
import React from "react";
import { BaseComponentProps } from "../../Types/GeneralTypes.js";

interface TabListProps extends BaseComponentProps {
    children?: React.ReactNode;
    customize?: {
        isOpen?: BaseComponentProps
    }
}

export default function TabList({ className, ...props }: TabListProps) {


    return (
        <div className={className || "f-row f-align-center g-2 tab-list"} style={props.style}>
            {props.children}
        </div>
    );
}
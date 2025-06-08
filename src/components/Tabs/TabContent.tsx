'use client'
import React from "react";
import { BaseComponentProps } from "../../Types/GeneralTypes.js";
import { TabContext } from "./TabMenu.js";

interface TabContentProps extends BaseComponentProps {
    children?: React.ReactNode;
    id: string;
}

export default function TabContent(props: TabContentProps) {
    const { select } = React.useContext(TabContext);

    if (select !== props.id) return null;

    return (
        <div className={props.className || `tab-content p-3 f-col h-100 w-100 br-10 o-auto ${select !== props.id} `} style={props.style}>
            {props.children || `Contenido para ${props.id}`}
        </div>
    );
}
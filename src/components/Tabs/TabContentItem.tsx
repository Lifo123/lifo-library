'use client'
import React from "react";
import { BaseComponentProps } from "../../Types/GeneralTypes.js";
import { TabContext } from "./TabMenu.js";

interface TabContentItemProps extends BaseComponentProps {
    id?: string;
    children?: React.ReactNode;
}

export default function TabContentItem(props: TabContentItemProps) {
    const { select, customize } = React.useContext(TabContext);
    const contentitem = React.useRef<HTMLDivElement>(null);


    if (select !== props.id) return null;

    return (
        <div
            className={customize?.content?.className || `tab-content-item p-3 f-col h-full w-full rounded-lg`}
            style={customize?.content?.style}
            data-contentab-id={props.id}
            ref={contentitem}
        >
            {props.children || `Contenido para ${props.id}`}
        </div>
    );
}

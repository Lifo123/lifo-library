'use client'
import React from "react";
import { BaseComponentProps } from "../../Types/GeneralTypes.js";
import { TabContext } from "./TabMenu.js";

interface TabItemProps extends BaseComponentProps {
    custom?: React.ReactNode;
    id: string;
    text?: string;
}

export default function TabItem(props: TabItemProps) {
    const { select, setSelect, customize } = React.useContext(TabContext);

    const isActive = select === props.id;
    const defaultClass = "tab-item d-flex btn-fourth br-8 pointer fs-2 o-hidden";

    const finalClass = isActive
        ? customize?.activeItem?.className || props.className || `${defaultClass} active-tab`
        : props.className || defaultClass;

    const finalStyle = isActive
        ? customize?.activeItem?.style || props.style
        : props.style;

    return (
        <span
            className={defaultClass + ` ${isActive ? finalClass : ''}`}
            onClick={() => setSelect(props.id)}
            style={finalStyle}
        >
            {
                props.custom ||
                <span
                    className={`p-2`}
                >
                    {props.text || props.id}
                </span>
            }
        </span>
    );
}

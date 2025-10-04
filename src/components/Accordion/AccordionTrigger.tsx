'use client'
import React from "react";
import { AccordionContext } from "./Accordion.js";
import { BaseComponentProps } from "../../Types/GeneralTypes.js";
import Icons from "../Icons/Icons.js";

interface AccordionTriggerProps extends BaseComponentProps {
    children?: React.ReactNode;
    icon?: boolean;
    onClick?: (state: boolean) => void | Promise<void>;
}

export default function AccordionTrigger(props: AccordionTriggerProps) {
    const ctx = React.useContext(AccordionContext)

    return (
        <div
            className={props.className || 'noti-head pt-4 pb-3 fw-500 f-row items-center justify-between pointer select-none'}
            style={props.style}
            onClick={() => {
                ctx.handleClick();
                props.onClick?.(!ctx.isOpen);
            }}
        >
            {props.children || 'No text provided'}
            <span className="mr-1">
                <Icons icon="arrow" size={18} rotate={ctx.isOpen ? 0 : -180} y={ctx.isOpen ? -0.1 : 0} style={{
                    transition: 'rotate .1s ease'
                }} />
            </span>
        </div>
    )
}
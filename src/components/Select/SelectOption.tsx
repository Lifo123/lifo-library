'use client'
import React from "react";
import { DropdownItem } from "../Dropdown/index.js";
import { SelectContext } from "./Select.js";
import { BaseComponentProps } from "../../Types/GeneralTypes.js";

interface SelectOptionProps extends BaseComponentProps {
    children?: React.ReactNode;
    text: string;
    value?: string;
    onClick?: (value?: string) => void | Promise<void>;
}

export default function SelectOption({ text, value, ...props }: SelectOptionProps) {
    const ctx = React.useContext(SelectContext);
    const realValue = value ?? text;

    return (
        <>
            <DropdownItem
                text={text}
                onClick={async () => {
                    await props.onClick?.(realValue);
                    ctx.handleChange?.(realValue, text)
                }}
            >
                {
                    props.children ||
                    <span className={props.className || "flex fs-2 fw-500 py-1 px-1.5 hover:bg-lifo-bg-third pointer hover:text-lifo-title rounded-md"} style={props.style}>
                        {text}
                    </span>
                }
            </DropdownItem>
        </>
    );
}

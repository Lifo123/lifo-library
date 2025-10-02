'use client'
import React from "react";
import { DropdownItem } from "../Dropdown/index.js";
import { SelectContext } from "./Select.js";

interface SelectOptionProps {
    text: string;
    value?: string;
    onClick?: () => void | Promise<void>;
}

export default function SelectOption({ text, value }: SelectOptionProps) {
    const ctx = React.useContext(SelectContext);
    const realValue = value ?? text;

    return (
        <DropdownItem
            text={text}
            onClick={() => ctx.handleChange?.(realValue, text)}
        />
    );
}

'use client';
import React from "react";
import { DropdownItemPropsTypes } from "./Drop.types.js";
import { DropDownContext } from "./Drop.Context.js";

export default function DropdownItem({
    children, disabled, ...props
}: DropdownItemPropsTypes) {
    const ctx = React.useContext(DropDownContext)

    const handleClick = async () => {
        if (disabled) return;
        await props.onClick?.();

        ctx.handleOpen(false);
    }

    return (
        <li onClick={handleClick} aria-disabled={disabled}>
            {
                children || 
                <div className={`fs-2 fw-500 pr-6 pl-1.5 py-1  rounded-md ${disabled ? 'no-select text-lifo-text' : 'hover:bg-lifo-bg-third pointer hover:text-lifo-title'}`}>
                    {props.text || 'none'}
                </div>
            }
        </li>
    )
}
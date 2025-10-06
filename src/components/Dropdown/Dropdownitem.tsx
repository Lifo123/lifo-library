'use client';
import React from "react";
import { DropdownItemPropsTypes } from "./Drop.types.js";
import Icons from "../Icons/Icons.js";
import { DropdownContext } from "./DropdownProvider.js";

export default function DropdownItem({
    children, disabled, ...props
}: DropdownItemPropsTypes) {
    const ctx = React.useContext(DropdownContext)

    const handleClick = async () => {
        if (disabled) return;
        await props.onClick?.();

        ctx.handleOpen(false);
    }

    return (
        <li onClick={handleClick} aria-disabled={disabled}>
            {
                children ||
                <div className={`f-row gap-2 fs-2 fw-500 px-1.5 py-1.5  rounded-md ${disabled ? 'no-select text-lifo-text' : 'hover:bg-lifo-bg-third pointer hover:text-lifo-title'}`}>
                    {props.icon && <span className="aspect-square flex f-center"><Icons icon={props.icon} /></span>}
                    <div className="f-row gap-12 justify-between f-grow items-center pr-2 f-nowrap text-nowrap">
                        {props.text || 'none'}
                        {props.shortCut && <span className="fw-400 fs-2 flex f-center">{props.shortCut}</span>}
                    </div>
                </div>
            }
        </li>
    )
}
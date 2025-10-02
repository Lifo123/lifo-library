import React from "react"
import { DropDownContext } from "./Drop.Context.js"
import { BaseComponentProps } from "../../Types/GeneralTypes.js";

interface DropTriggerProps extends BaseComponentProps {
    text?: string;
    children?: React.ReactNode;
}

export default function DropdownTrigger(props: DropTriggerProps) {
    const ctx = React.useContext(DropDownContext)

    return (
        <div className="drop-trigger flex"
            onClick={() => ctx.handleOpen(!ctx.isOpen)}
            ref={ctx.btnRef}
        >
            {
                props.children ||
                <span className={props.className || 'btn btn-third rounded-md'} style={props.style}>
                    {props.text || 'Dropdown'}
                </span>
            }
        </div>
    )
}
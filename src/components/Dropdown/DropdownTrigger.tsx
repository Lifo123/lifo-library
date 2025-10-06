import React from "react"
import { BaseComponentProps } from "../../Types/GeneralTypes.js";
import { DropdownContext } from "./DropdownProvider.js";

interface DropTriggerProps extends BaseComponentProps {
    text?: string;
    children?: React.ReactNode;
}

export default function DropdownTrigger(props: DropTriggerProps) {
    const ctx = React.useContext(DropdownContext)

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
import React from "react";
import type { BaseComponentProps } from "../../Types/GeneralTypes.js";

interface NotesProps extends BaseComponentProps {
    type?: "info" | "warn" | "error" | "success" | "default";
    note?: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
}

export default function Notes({
    type = "default",
    note,
    icon,
    ...props
}: NotesProps) {
    return (
        <div className={`note-${type} f-row g-3 f-align-center o-hidden ${props.className || 'p-3 fs-custom-15 br-4'}`} style={props.style}>
            {icon && icon}
            {
                props.children || <span
                    className="msg-text"
                >
                    {note || 'Wasa'}
                </span>
            }
        </div>
    );
}

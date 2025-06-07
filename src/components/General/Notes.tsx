import React from "react";
import type { BaseComponentProps } from "../../Types/GeneralTypes.js";

interface NotesProps extends BaseComponentProps {
    type?: "info" | "warn" | "error" | "success" | "default";
    note?: string;
    icon?: React.ReactNode;
    custom?: React.ReactNode;
}

export default function Notes({
    type = "default",
    note,
    icon,
    custom,
    ...props
}: NotesProps) {
    return (
        <div className={`msg-${type} f-row g-3 f-align-center ${props.className || 'p-3'}`} style={props.style}>
            {icon && icon}
            {custom ? (
                custom
            ) : note ? (
                <span
                    className="msg-text"
                    
                >
                    {note}
                </span>
            ) : (
                <span className="msg-text">Need some text or custom component</span>
            )}
        </div>
    );
}

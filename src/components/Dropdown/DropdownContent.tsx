'use client';
import React from "react";
import { createPortal } from "react-dom";

import { DropdownContext } from "./DropdownProvider.js";
import { DropdownContentPropsTypes } from "./Drop.types.js";

export default function DropdownContent({
    ...props
}: DropdownContentPropsTypes) {
    const ctx = React.useContext(DropdownContext);

    //Custom variables
    const vars: Record<string, string | number> = {
        "--duration": ctx.values?.duration || '90ms',
    };

    return ctx.isOpen
        ? createPortal(
            <div
                className={`drop-content fixed min-w-max oy-auto w-max h-max select ${props.className || 'f-col bg-lifo-bg-secondary rounded-lg'} ${ctx.isAnim && 'active'}`}
                style={{
                    minWidth: `${ctx.btnRef?.current?.offsetWidth}px`,
                    top: `${ctx!.values?.y}px`,
                    left: `${ctx!.values?.x}px`,
                    ...props.style,
                    ...vars,
                }}
                data-dir={ctx.dir}
                ref={ctx.dropRef}
            >
                {props.children}
            </div>,
            document.body
        )
        : null;
}
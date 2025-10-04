'use client';
import React from "react";
import { createPortal } from "react-dom";

import { DropdownContext } from "./Dropdown.js";
import { DropdownContentPropsTypes } from "./Drop.types.js";
import { Flifo } from "../../utils/General.Utils.js";
import useInside from "../Tooltip/useInside.js";

export default function DropdownContent({
    margin = '6px',
    dir = 'btr',
    ...props
}: DropdownContentPropsTypes) {
    const ctx = React.useContext(DropdownContext)

    const { styles, values } = useInside({
        targetRef: ctx.btnRef,
        floatingRef: ctx.dropRef,
        isVisible: ctx.isOpen,
        margin: margin,
        dir: dir,
        popover: props.popover,
    })

    //Custom variables
    const vars: Record<string, string | number> = {
        "--margin": margin,
        "--duration": ctx.duration
    };

    return ctx.isOpen
        ? createPortal(
            <div
                className={`drop-content fixed min-w-max oy-auto w-max h-max select ${props.className || 'f-col bg-lifo-bg-secondary rounded-lg'} ${ctx.isAnim && 'active'}`}
                style={{
                    ...styles,
                    maxHeight: `${styles.maxHeight}`,
                    ...props.style,
                    ...vars,
                }}
                data-dir={values.dir}
                ref={ctx.dropRef}
            >
                {props.children}
            </div>,
            document.body
        )
        : null;
}
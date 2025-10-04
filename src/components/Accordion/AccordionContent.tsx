'use client'
import React from "react"
import { AccordionContext } from "./Accordion.js"
import { BaseComponentProps } from "../../Types/GeneralTypes.js"

interface AccordionContentProps extends BaseComponentProps {
    children?: React.ReactNode
}

export default function AccordionContent(props: AccordionContentProps) {
    const ctx = React.useContext(AccordionContext)

    return (
        <div
            className={`noti-details o-hidden`}
            style={{
                pointerEvents: ctx.isOpen ? 'auto' : 'none',
                userSelect: ctx.isOpen ? 'auto' : 'none',
                maxHeight: ctx.isOpen ? ctx.dropRef?.current.scrollHeight + "px" : "0px",
                opacity: ctx.isOpen ? 1 : 0,
            }}
            ref={ctx.dropRef}
        >
            <div className={`${props.className || 'details-container f-col gap-4 pb-4 max-w-3xl fw-400 w-full leading-relaxed'}`}>
                {props.children}
            </div>
        </div>
    )
}
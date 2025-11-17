'use client'
import React from "react"
import { FocusableOptions, TooltipTriggerProps } from "react-aria"
import { TooltipTrigger, Tooltip as Too, Focusable, TooltipProps } from "react-aria-components"

interface TooltipLibProps extends TooltipTriggerProps {
    children?: React.ReactNode
    custom?: React.ReactNode
    text?: string
    offset?: number
    focusableProps?: FocusableOptions
    tooltipProps?: TooltipProps
}

export function Tooltip({
    children, focusableProps, tooltipProps,
    custom, text, offset, ...props
}: TooltipLibProps) {

    return (
        <TooltipTrigger
            {...props}
            delay={props.delay || 50}
            closeDelay={props.closeDelay || 50}
        >
            <Focusable {...focusableProps}>
                {
                    React.isValidElement(children)
                        ? React.cloneElement(children as any, {
                            role: 'button',
                            tabIndex: 0,
                        })
                        : <span role="button" tabIndex={0}>{children}</span>
                }
            </Focusable>
            <Too
                {...tooltipProps}
                offset={tooltipProps?.offset || offset || 4}

            >
                {custom || text || 'tooltip'}
            </Too>
        </TooltipTrigger>
    )
}
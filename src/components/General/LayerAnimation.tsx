'use client'
import React from "react";
import { useEnterAnimation, useExitAnimation } from "@react-aria/utils";

interface LayerAnimateProps extends React.HTMLAttributes<HTMLDivElement> {
    isOpen: boolean;
    children?: React.ReactNode;
}

export function LayerAnimation({
    isOpen = false,
    children,
    ...props
}: LayerAnimateProps) {
    const ref = React.useRef<HTMLDivElement>(null);
    const isExiting = useExitAnimation(ref, isOpen as boolean);

    React.useEffect(() => {
        if (isOpen && props.autoFocus && ref.current) {
            ref.current?.focus();
        }
    }, [isOpen, props.autoFocus]);

    if (!children) {
        console.error('LayerAnimate: children is required');
        return null;
    }

    if (!isOpen && !isExiting) {
        return null;
    }

    return (
        <Inner
            ref={ref}
            isExiting={isExiting}
            isOpen={isOpen}
            {...props}
        >
            {children}
        </Inner>
    )
}

const Inner = React.forwardRef<HTMLDivElement, LayerAnimateProps & { isExiting: boolean }>(
    (props, ref: any) => {
        const {
            isOpen,
            isExiting,
            children,
            ...rest
        } = props

        const isEntering = useEnterAnimation(ref as React.RefObject<HTMLDivElement>) || false;

        return (
            <div
                ref={ref}
                data-open={isOpen}
                tabIndex={-1}
                data-entering={isEntering || undefined}
                data-exiting={isExiting || undefined}
                {...rest}
            >
                {children}
            </div>
        )
    })

"use client";
import React from "react";
import { createPortal } from "react-dom";

import { TooltipProps } from "./Tooltip.Types.js";
import useInside from "./useInside.js";

export default function Tooltip({
    text, custom, children, ...props
}: TooltipProps) {
    const [visible, setVisible] = React.useState(false);
    const [coords, setCoords] = React.useState<{ top: number; left: number }>({
        top: 0,
        left: 0,
    });

    const ref = React.useRef<HTMLDivElement | any>(null);
    const floatingRef = React.useRef<HTMLDivElement | any>(null);

    const { styles } = useInside({
        targetRef: ref,
        floatingRef: floatingRef,
        isVisible: visible,
        margin: props.margin,
        dir: props.dir,
    });

    console.log(styles);

    React.useEffect(() => {
        if (visible && ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setCoords({
                top: rect.top + window.scrollY - 40, // arriba del elemento
                left: rect.left + rect.width / 2 + window.scrollX,
            });
        }
    }, [visible]);

    return (
        <>
            <div
                ref={ref}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
            >
                {children}
            </div>

            {visible &&
                createPortal(
                    <div
                        style={{
                            top: coords.top,
                            left: coords.left,
                            transform: "translateX(-50%)",
                        }}
                        className="absolute z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded shadow-md pointer-events-none"
                        ref={floatingRef}
                    >
                        {custom ?? text}
                    </div>,
                    document.body
                )}
        </>
    );
}

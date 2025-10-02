'use client';
import React from "react";
import { DropDownContext } from "./Drop.Context.js";
import { DropdownContentPropsTypes } from "./Drop.types.js";


export default function DropdownContent({
    margin = '6px',
    offset = '0px',
    dir, ...props
}: DropdownContentPropsTypes) {
    const ctx = React.useContext(DropDownContext)

    const [styles, setStyles] = React.useState<Record<string, string | number>>({
        maxHeight: 'auto'
    });

    //Custom variables
    const vars: Record<string, string | number> = {
        "--margin": margin,
        "--offset": offset,
        "--duration": ctx.duration
    };

    const updatePosition = () => {
        if (!ctx.btnRef?.current || !ctx.dropRef?.current) return;

        const btnRect = ctx.btnRef.current.getBoundingClientRect();
        const dropRect = ctx.dropRef.current.getBoundingClientRect();

        const viewportW = window.innerWidth;
        const viewportH = window.innerHeight;

        let direction = dir || "btr"; // por defecto: abajo-izq
        let maxHeight = `calc(${viewportW - btnRect.bottom}px - var(--margin) * 2)` as string | number;

        let styles: Record<string, string | number> = {};

        // --- Chequeo vertical
        const spaceBelow = viewportH - btnRect.bottom;
        const spaceAbove = btnRect.top;

        const MIN_HEIGHT = 320;
        const MAX_HEIGHT = 675;

        if (direction.startsWith("b") || direction.startsWith("l")) {
            if (spaceBelow >= MAX_HEIGHT) {
                maxHeight = `${MAX_HEIGHT}px`;
            } else if (spaceBelow >= MIN_HEIGHT) {
                maxHeight = `calc(${spaceBelow}px - var(--margin) * 2)`;
            } else {
                // rebotar arriba
                direction = direction.replace(/^b/, "t");
                maxHeight = `min(calc(${spaceAbove}px - var(--margin) * 2), ${MAX_HEIGHT}px)`;
            }
        } else if (direction.startsWith("t") || direction.startsWith("r")) {
            if (spaceAbove >= MAX_HEIGHT) {
                maxHeight = `${MAX_HEIGHT}px`;
            } else if (spaceAbove >= MIN_HEIGHT) {
                maxHeight = `calc(${spaceAbove}px - var(--margin) * 2)`;
            } else {
                // rebotar abajo
                direction = direction.replace(/^t/, "b");
                maxHeight = `min(calc(${spaceBelow}px - var(--margin) * 2), ${MAX_HEIGHT}px)`;
            }
        }



        // --- Chequeo horizontal
        const overflowLeft = btnRect.left < 0;
        const overflowRight = btnRect.left + dropRect.width > viewportW;

        //esto es si empieza por t or b
        if (dir?.startsWith("t") || dir?.startsWith("b")) {
            if (overflowLeft) {
                styles["--offset"] = `calc(${btnRect.left * -1}px + var(--margin) * 2)`;
                styles.left = "calc(0px + var(--offset))";

                direction = direction.replace(/tl$/, "tr").replace(/bl$/, "br");
            } else if (overflowRight) {
                styles["--offset"] = `calc(${viewportW - (btnRect.left + dropRect.width)}px - var(--margin) * 2)`;
                styles.left = "calc(0px + var(--offset))";

                direction = direction.replace(/tr$/, "tl").replace(/br$/, "bl");
            }
        } else {
            if (dropRect.left + dropRect.width > viewportW) {
                direction = 'btl';
                styles.right = `calc(0px + var(--offset))`;
            } else if (dropRect.left < 0) {
                direction = 'btr';
                styles.left = `calc(0px + var(--offset))`;
            }
        }


        setStyles({
            maxHeight,
            ...styles,
            direction,
        });
    };



    React.useLayoutEffect(() => {
        if (!ctx.isOpen) return;

        updatePosition();

        const handleScrollOrResize = () => updatePosition();
        const resizeObserver = new ResizeObserver(() => updatePosition());

        window.addEventListener("scroll", handleScrollOrResize);
        window.addEventListener("resize", handleScrollOrResize);
        ctx.btnRef!.current && resizeObserver.observe(ctx.btnRef!.current);

        return () => {
            window.removeEventListener("scroll", handleScrollOrResize);
            window.removeEventListener("resize", handleScrollOrResize);
            resizeObserver.disconnect();
        };
    }, [ctx.isOpen]);

    React.useEffect(() => {
        updatePosition();
    }, [])

    React.useEffect(() => {
        if (!ctx.isOpen) return;

        const test = () => {
            console.log('wadas');

        }

        document.addEventListener('blur', test);

        return () => {
            document.removeEventListener('blur', test);
        }

    }, [ctx.isOpen])


    return (

        ctx.isOpen &&
        <div
            className={`drop-content absolute min-w-full o-hidden w-max ${props.className || 'f-col bg-lifo-bg-secondary rounded-md'} ${ctx.isAnim && 'active'}`}
            style={{
                maxHeight: `${styles.maxHeight}px`,
                ...vars,
                ...styles,
                ...props.style
            }}
            data-dir={styles.direction}
            ref={ctx.dropRef}
        >
            {props.children}
        </div>
    )
}
'use client';

import React from "react";
import { Flifo } from "../../utils/General.Utils.js";

interface useInsideProps {
    targetRef: React.RefObject<HTMLDivElement> | null;
    floatingRef: React.RefObject<HTMLDivElement> | null;
    isVisible: boolean;

    dir?: 'btl' | 'btr' | 'ttb' | 'ttr' | 'rtt' | 'rtb' | 'ltt' | 'ltb' | string;
    popover?: boolean;
    margin?: string;
}

export default function useInside({
    targetRef, floatingRef,
    isVisible,
    margin = '6px', dir = 'btr', ...props
}: useInsideProps) {

    const [styles, setStyles] = React.useState<React.CSSProperties>({});
    const [values, setValues] = React.useState({
        dir: dir
    });


    const updatePosition = () => {
        const btn = targetRef?.current;
        const drop = floatingRef?.current;

        if (!drop || !btn) return;

        const btnRect = btn.getBoundingClientRect();
        const dropRect = drop.getBoundingClientRect();
        const marginPx = Flifo.toPx(margin);

        let styles: React.CSSProperties = { zIndex: 500 };
        let values: any = {};


        const spaceBelow = window.innerHeight - btnRect.bottom;
        const spaceAbove = btnRect.top;
        const openUpwards = dropRect.height > spaceBelow && spaceAbove > spaceBelow;

        //Vertical its ok
        const maxHeight = openUpwards
            ? btnRect.top - marginPx * 2
            : window.innerHeight - btnRect.bottom - marginPx * 2;

        const top = openUpwards
            ? Math.min(marginPx, btnRect.top - dropRect.height - marginPx)
            : Math.min(btnRect.bottom + marginPx, window.innerHeight - dropRect.height - marginPx);

        values.dir = dir.replace(openUpwards ? "bt" : "tt", openUpwards ? "tt" : "bt");

        //Adjust in X axis
        const viewportWidth = window.innerWidth;

        const horizontalMargin = (marginPx * 2);

        if (viewportWidth <= 360) {
            styles.width = 'calc(100% - var(--margin) * 2)';
            styles.left = '50%';
            styles.transform = 'translateX(-50%)';
            styles.transformOrigin = openUpwards ? 'bottom left' : 'top left';

        } else {
            if (props.popover) {
                styles.left = `calc(${btnRect.left + btn.offsetWidth / 2}px)`;
                styles.transform = 'translateX(-50%)';
                styles.transformOrigin = openUpwards ? 'bottom left' : 'top left';

            } else {
                const align = dir.slice(-1);

                if (align === "r") {
                    const left = btnRect.left;
                    styles.left = `${left}px`;

                    if (left + drop.offsetWidth + marginPx > viewportWidth) {
                        styles.left = `${viewportWidth - drop.offsetWidth - marginPx}px`;
                    }
                    //Ends in left "btl" or "ttl"
                } else {
                    styles.left = `${Math.max(marginPx, btnRect.right - drop.offsetWidth)}px`;

                    if (btnRect.left + drop.offsetWidth + marginPx > viewportWidth) {
                        styles.left = `${viewportWidth - drop.offsetWidth - marginPx}px`;
                    }

                }
            }
        }

        const maxWidth = viewportWidth - horizontalMargin;

        styles = {
            ...styles,
            top: `${top}px`,
            minWidth: `${btnRect.width}px`,
            maxWidth: `${maxWidth}px`,
            maxHeight: `${maxHeight}px`,
            overflowY: "auto",
        }

        values = {
            ...values,
        }

        setStyles(styles);
        setValues(values);
    };


    React.useLayoutEffect(() => {
        if (!isVisible) return;

        const handleScrollOrResize = () => updatePosition();
        const resizeObserver = new ResizeObserver(() => updatePosition());

        window.addEventListener("scroll", handleScrollOrResize);
        window.addEventListener("resize", handleScrollOrResize);
        targetRef && resizeObserver.observe(targetRef.current);

        return () => {
            window.removeEventListener("scroll", handleScrollOrResize);
            window.removeEventListener("resize", handleScrollOrResize);
            resizeObserver.disconnect();
        };
    }, [isVisible]);

    React.useLayoutEffect(() => {
        if (!isVisible) return;
        updatePosition();
    }, [isVisible]);

    return {
        styles, values
    };
}
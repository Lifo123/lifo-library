'use client';
import React, { createContext } from "react";
import { Scroll } from "../utils/Scroll.Utils.js";
import { Flifo } from "../utils/General.Utils.js";

export interface useDropdownProps {
    elementRef: React.RefObject<HTMLDivElement> | null;
    floatingRef: React.RefObject<HTMLDivElement> | null;
    els?: string[];

    isOpen?: boolean;
    frezzeScroll?: boolean;
    overlap?: boolean;
    popover?: boolean;

    offset?: string;
    margin?: string;
    duration?: string;

    minSpaceY?: number;
    minSpaceX?: number;

    autoAdjust?: boolean;

    dir: 'btl' | 'btr' | 'ttl' | 'ttr' | 'rtt' | 'rtb' | 'ltt' | 'ltb' | 'tb' | 'bt' | 'rl' | 'lr';
}

export interface returnValues {
    isCenter?: boolean;
    originalDir?: string;
    x: number;
    y: number;
    dir?: string;
    offset?: number;
    width?: number;
    duration?: string;

    widthAdjusted?: boolean;
    overflowTop?: boolean;
    overflowBottom?: boolean;
    overflowLeft?: boolean;
    overflowRight?: boolean;
}

export default function useDropdown({
    elementRef, floatingRef,
    autoAdjust = true, overlap = true,
    ...props
}: useDropdownProps) {
    const [isOpen, setIsOpen] = React.useState(props.isOpen || false);
    const [isAnim, setIsAnim] = React.useState(false);

    const [values, setValues] = React.useState<returnValues>({
        dir: props.dir,
        x: 0,
        y: 0
    });

    const isPopoverRef = React.useRef(props.popover || false);

    const originalWidthRef = React.useRef(0);


    const calculatePosition = React.useCallback(async () => {
        const target = elementRef?.current;
        const floating = floatingRef?.current;
        if (!target || !floating) return;

        const targetRect = Flifo.getRect(target);
        const floatingRect = Flifo.getRect(floating);

        if (!originalWidthRef.current || originalWidthRef.current === 0) {
            originalWidthRef.current = floatingRect.width;
        }

        const offsetPx = Flifo.toPx(props.offset || '8px');
        const margin = Flifo.toPx(props.margin || '8px');

        const vw = document.documentElement.clientWidth;
        const vh = document.documentElement.clientHeight;

        let newValues: returnValues = {
            x: 0,
            y: 0,
            isCenter: false,
            originalDir: props.dir
        };

        const from = props.dir.charAt(0);
        const to = props.dir.slice(-1);

        newValues.width = originalWidthRef.current

        const positionByPopover = (from: string) => {
            if (isPopoverRef.current) {
                if (from === 'l' || from === 'r') {
                    newValues.y = targetRect.bottom - floatingRect.height / 2;
                    newValues.dir = from === 'l' ? 'rl' : 'lr';
                } else {
                    newValues.x = targetRect.center.x - floatingRect.width / 2;
                    newValues.dir = from === 't' ? 'bt' : 'tt';
                }
            }
        }

        const positionByTarget = (from: string, to: string) => {
            if (from === 'b') {
                newValues.y = targetRect.bottom + offsetPx;
            } else if (from === 't') {
                newValues.y = targetRect.top - floatingRect.height - offsetPx;
            } else if (from === 'r') {
                newValues.x = targetRect.right + offsetPx;
            } else if (from === 'l') {
                newValues.x = targetRect.left - floatingRect.width - offsetPx;
            }
            if (to === 'r') {
                newValues.x = targetRect.left;
            } else if (to === 'l') {
                newValues.x = targetRect.right - floatingRect.width;
            } else if (to === 't') {
                newValues.y = targetRect.bottom - floatingRect.height;
            } else if (to === 'b') {
                newValues.y = targetRect.top;
            }
        }

        //Primero: calculamos respecto al target (no importa si es overFlow)
        positionByTarget(from, to);

        //Segundo: si tiene autoAdjust recalculamos
        if (autoAdjust) {
            if (from === 'b') {
                if (targetRect.margin.bottom + offsetPx <= (props.minSpaceY ?? floatingRect.height * .8)) {
                    newValues.y = targetRect.top - floatingRect.height - offsetPx;
                    newValues.dir = props.dir.replace('bt', 'tt');
                }
            } else if (from === 't') {
                if (targetRect.top - offsetPx <= (props.minSpaceY ?? floatingRect.height * .8)) {
                    newValues.y = targetRect.bottom + offsetPx;
                    newValues.dir = props.dir.replace('tt', 'bt');
                }
            } else if (from === 'r' || from === 'l') {
                if (vh - targetRect.top <= (props.minSpaceY ?? floatingRect.height * .8)) {
                    newValues.y = targetRect.bottom - floatingRect.height;
                    newValues.dir = props.dir.replace(`tb`, 'tt');
                }
            }

            positionByPopover(from);
        }

        if (vw <= 540) {
            newValues.isCenter = true;
            isPopoverRef.current = true;
            newValues.width = vw - margin * 2;
            newValues.x = margin;

            if (targetRect.margin.bottom + offsetPx <= (props.minSpaceY ?? floatingRect.height * .5)) {
                newValues.y = targetRect.top - floatingRect.height - offsetPx;
                newValues.dir = 'bt';
            } else {
                newValues.y = targetRect.bottom + offsetPx;
                newValues.dir = 'tb';
            }
        }

        if (overlap) {
            //Keep inside
            newValues.y = Math.max(newValues.y, margin);
            newValues.y = Math.min(newValues.y, vh - floatingRect.height - margin);
            newValues.x = Math.max(newValues.x, margin);
            newValues.x = Math.min(newValues.x, vw - floatingRect.width - margin);
        }

        setValues({
            ...newValues,
            dir: newValues.dir ?? props.dir,
            offset: offsetPx,
            duration: props.duration || '90ms',
            widthAdjusted: values.width !== originalWidthRef.current,
            overflowTop: newValues.y < margin,
            overflowBottom: newValues.y + floatingRect.height > vh - margin,
            overflowLeft: newValues.x < margin,
            overflowRight: newValues.x + floatingRect.width > vw - margin,
        });

    }, [elementRef, floatingRef]);

    const handleOpen = (state: boolean) => {
        if (state) {
            props.frezzeScroll && Scroll.hide();
            setIsOpen(true); requestAnimationFrame(() => setIsAnim(true));
        } else {
            props.frezzeScroll && Scroll.show();
            setIsAnim(false); setTimeout(() => setIsOpen(false), 120);
        }
    };

    React.useLayoutEffect(() => {
        if (isOpen) {
            calculatePosition();

            const handle = () => requestAnimationFrame(calculatePosition);
            window.addEventListener("scroll", handle);
            window.addEventListener("resize", handle);

            return () => {
                window.removeEventListener("scroll", handle);
                window.removeEventListener("resize", handle);
            };
        }
    }, [isOpen]);

    React.useEffect(() => {
        if (!isOpen || !floatingRef || !elementRef) return;

        const handleClickOutside = (event: MouseEvent) => {
            event.preventDefault();
            const target = event.target as Node;
            if (
                floatingRef.current?.contains(target) ||
                elementRef.current?.contains(target)
            ) {
                return;
            }

            let clickOutside = true;
            if (props.els) {
                for (let i = 0; i < props.els.length; i++) {
                    const all = document.querySelectorAll(props.els[i]);

                    for (let j = 0; j < all.length; j++) {
                        const el = all[j];
                        if (el?.contains(target)) clickOutside = false;
                    }
                }
            }

            if (clickOutside) handleOpen(false);
        };


        setTimeout(() => {
            document.addEventListener("mousedown", handleClickOutside);
        }, 0);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen]);

    return {
        isOpen,
        isPopover: isPopoverRef.current,
        isAnim,
        values,
        handleOpen
    }
}
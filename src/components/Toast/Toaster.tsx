//Fix animation on max Toasts
'use client'
import React from "react";
import { useStore } from "@nanostores/react"
import type { ToasterItemProps, ToasterProps } from "./Toast.Types.js"
import { $toast, LocalToast, toast } from "./Toast.Store.js"
import { ToastIcons } from "./ToastAssets.js";
import ButtonPromise from '../General/ButtonPromise.js'
import Icons from "../Icons/Icons.js";

export default function Toaster({
    toastID = 'init',
    position = 'top-center',
    duration = 2500,
    animation = 'slide',
    maxToasts = 3,
    ...props
}: ToasterProps) {
    const ToastData = useStore($toast);

    if (!ToastData[toastID]) return

    const AvailableToast = ToastData[toastID];

    return (
        <span className="flifo-portal fixed no-select" data-toaster-id={toastID}>
            {AvailableToast.map((toast, i) => (
                <ToastRow
                    key={toast.id}
                    index={i}
                    toastID={toastID}
                    position={position}
                    duration={duration}
                    animation={animation}
                    maxToasts={maxToasts}
                    avalibleToasts={AvailableToast.length}
                    {...toast}
                />
            ))}
        </span>
    )
}

interface SolutionRow extends ToasterItemProps {
    maxToasts: number;
    index: number;
    avalibleToasts: number;
}

const ToastRow = ({
    scaleOffset = 'center',
    maxToasts,
    index,
    ...props
}: SolutionRow) => {
    const [isVisible, setIsVisible] = React.useState<boolean>(false);
    const [isHovered, setIsHovered] = React.useState<boolean>(false);

    const generateCSSVariables = (
        prefix: '--custom-start-' | '--custom-end-',
        styles: React.CSSProperties | undefined
    ): Record<string, string> => {
        if (!styles) return {};
        return Object.entries(styles).reduce((vars, [key, value]) => {
            vars[`${prefix}${key}`] = String(value);
            return vars;
        }, {} as Record<string, string>);
    };

    const AllOffsets = {
        ...generateCSSVariables('--custom-start-', props.animate?.start),
        ...generateCSSVariables('--custom-end-', props.animate?.end),
    };

    React.useEffect(() => {
        if (props.avalibleToasts > maxToasts && index === 0) {
            setIsVisible(false);
        }
    }, [index, maxToasts, props.avalibleToasts]);

    React.useEffect(() => {
        const visible = props.state !== false;
        if (!visible) {
            setIsVisible(false);
        } else {
            const timeout = setTimeout(() => setIsVisible(true), 50);
            return () => clearTimeout(timeout);
        }
    }, [props.state]);

    React.useEffect(() => {
        if (props.noDissapear || props.action) return;

        let timeout: NodeJS.Timeout;

        if (!isHovered) {
            timeout = setTimeout(() => {
                setIsVisible(false); // inicia animación de salida
            }, props.duration);
        }

        return () => clearTimeout(timeout);
    }, [props.duration, props.noDissapear, props.action, isHovered]);


    React.useEffect(() => {
        if (!isVisible) {
            const timeout = setTimeout(() => {
                LocalToast.removeDelay(props.toastID, props.id, 0);
            }, 350); // espera que la animación termine

            return () => clearTimeout(timeout);
        }
    }, [isVisible, props.toastID, props.id]);

    return (
        <div className={`toast-container d-flex f-center w-max h-max select ${isVisible ? 'visible' : 'delete'} ${props.theme || ''} absolute`}
            data-axis-y={props.position?.split('-')[0]}
            data-axis-x={props.position?.split('-')[1]}
            data-scale-offset={scaleOffset}
            data-animation={props?.animation}
            style={{
                zIndex: isHovered ? 'inherit' : 0,
                ...AllOffsets
            }}
            onMouseEnter={() => props.noDissapear ? null : setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {
                props?.children ?? (
                    <span
                        className={`toast-item f-row f-nowrap justify-between items-center rounded-md gap-2 o-hidden`}
                        data-toast-type={props.type}
                        data-iscolor={props.richColors}
                    >
                        <div className="f-row gap-2 items-center justify-start">
                            {props.customIcon || props.icon || props.type && (
                                <span className="toast-icon mr-1 d-flex f-center">
                                    {props.type ? ToastIcons[props.type] : props.customIcon ?? props.icon}
                                </span>
                            )}

                            <div className="toast-detail f-col justify-center gap-0.5">
                                {props.title && <span className="fs-2 fw-500" style={{ color: `var(--lifo-toast-${props.richColors ? props.type : 'title'})`, fontWeight: 550 }}>{props?.title}</span>}
                                <p className="fs-2 m-0 leading-tight" style={{ textWrap: 'nowrap', color: `var(--lifo-toast-${props.richColors ? props.type : 'description'})`, fontWeight: 450 }}>{props?.message}</p>
                                {props.href && <a className="info fs-custom-12-5 rounded-md w-max fw-500" href={props.href}>More</a>}

                            </div>
                        </div>
                        {
                            props.customAction ??
                                props.action ?
                                <ButtonPromise className="pointer btn-primary rounded-sm fw-500"
                                    text={props.actionText || 'Continue'}
                                    size={18}
                                    style={{ padding: '.3rem .65rem', fontSize: 12.5 }}
                                    onClick={async () => {
                                        setIsHovered(true);
                                        await props.action!()
                                        toast.dismiss(props.toastID, props.id)
                                    }}
                                />
                                : props.closeBtn ? <Icons icon="close" size={26} onClick={() => {
                                    toast.dismiss(props.toastID, props.id)
                                }} /> : null
                        }
                    </span>
                )
            }
        </div>
    )
}

//Fix animation on max Toasts
'use client'
import React from "react";
import { useStore } from "@nanostores/react"
import type { ToasterItemProps, ToasterProps } from "./Toast.Types.js"
import { $toast, LocalToast, toast } from "./Toast.Store.js"
import { ToastIcons } from "./ToastAssets.js";
import ButtonPromise from '../General/ButtonPromise.js'
import CloseBtn from '../General/CloseBtn.js'

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
        if (props.noDissapear) return;

        const timeout = setTimeout(() => {
            setIsVisible(false); // inicia animación de salida
        }, props.duration);

        return () => clearTimeout(timeout);
    }, [props.duration, props.noDissapear]);

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
                props?.children && (
                    props.children
                ) || (
                    <span
                        className={`toast-item f-row f-justify-between f-align-center br-6 sd-1`}
                    >
                        <div className="f-row g-1 f-center">
                            {props.customIcon || props.icon || props.type && (
                                <span className="toast-icon mr-2 d-flex f-center">
                                    {props.customIcon ? props.customIcon : ToastIcons[props.type]}
                                </span>
                            )}

                            <div className="f-col f-justify-center">
                                {props.title && <h3 className="fs-custom-14-5" style={{ color: 'rgb(var(--lb-title))' }}>{props?.title}</h3>}
                                <p className="fs-2 m-0" style={{ fontWeight: '450' }}>{props?.message}</p>
                                {props.href && <a className="info fs-custom-13 br-6 w-max" href={props.href}>More</a>}

                            </div>
                        </div>
                        {
                            props.customAction ? props.customAction :
                                props.action ?
                                    <ButtonPromise className="fs-custom-12-5 pointer btn-secondary br-6"
                                        text={props.actionText || 'Continue'}
                                        size={16}
                                        style={{ padding: '.3rem .65rem' }}
                                        stroke="rgb(var(--lb-white))"
                                        onClick={async () => {
                                            setIsHovered(true);
                                            await props.action!()
                                            toast.dismiss(props.toastID, props.id)
                                        }}
                                    />
                                    : props.closeBtn ? <span className="ml-3 d-block" onClick={() => { toast.dismiss(props.toastID, props.id) }}>
                                        <CloseBtn size={24} />
                                    </span> : null
                        }
                    </span>
                )
            }
        </div>
    )
}

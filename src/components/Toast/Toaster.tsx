'use client'
import React from "react";
import { useStore } from "@nanostores/react"
import type { ToasterItemProps, ToasterProps } from "./Toast.Types.js"
import { $firstToast, $toast, LocalToast, toast } from "./Toast.Store.js"
import { ToastIcons } from "./ToastAssets.js";
import { ButtonPromise, CloseBtn } from '../index.js'

export default function Toaster({
    toastID = 'init',
    position = 'top-center',
    duration = 2500,
    animation = 'slide',
    maxToasts = 3,
    ...props
}: ToasterProps) {
    const ToastData = useStore($toast)

    if (!ToastData[toastID]) return

    const AvailableToast = ToastData[toastID].slice(-maxToasts - 1);

    return (
        <span className="lifo-portal fixed h-100 w-100 no-select" data-toaster-id={toastID}>
            {AvailableToast.map((toast, i) => (
                <ToastRow
                    key={toast.id}
                    index={i}
                    toastID={toastID}
                    position={position}
                    duration={duration}
                    animate={animation}
                    maxToasts={maxToasts}
                    {...toast}
                />
            ))}
        </span>
    )
}

const ToastRow = ({
    scaleOffset = 'center',
    startAnim,
    endAnim,
    ...props
}: ToasterItemProps) => {
    const first = useStore($firstToast)
    const [isVisible, setIsVisible] = React.useState<boolean>(false);
    const [isHovered, setIsHovered] = React.useState<boolean>(false);
    const AllOffsets = {
        '--custom-start-top': startAnim?.top,
        '--custom-start-bottom': startAnim?.bottom,
        '--custom-start-left': startAnim?.left,
        '--custom-start-right': startAnim?.right,
        '--custom-end-top': endAnim?.top,
        '--custom-end-bottom': endAnim?.bottom,
        '--custom-end-left': endAnim?.left,
        '--custom-end-right': endAnim?.right,
    };

    React.useEffect(() => {

        setIsVisible(props.state !== undefined ? props.state : true);
        if (props.state === false) {
            LocalToast.removeDelay(props.toastID, props.id, props.animate === 'none' ? 0 : 350);
        } else {
            setTimeout(() => {
                setIsVisible(true);
            }, 50)
        }
    }, [props.state]);

    React.useEffect(() => {
        if (props.index !== undefined && props.maxToasts !== undefined) {
            if (props.index + 1 > props.maxToasts) {
                toast.dismiss(first.toastID, first.id);
            }
        }
    }, [first, props.index, props.maxToasts]);

    React.useEffect(() => {
        if (props.noDissapear) return;
        if (props.noDissapear && isHovered) return;

        const hideTimeout = setTimeout(() => {
            toast.dismiss(props.toastID, props.id);
        }, props.duration);

        return () => clearTimeout(hideTimeout);
    }, [isHovered, props.duration, props.noDissapear]);

    return (
        <div className={`toast-container d-flex f-center w-max h-max${isVisible ? ' visible' : ' delete'} ${props.theme || ''} absolute`}
            data-axis-y={props.position?.split('-')[0]}
            data-axis-x={props.position?.split('-')[1]}
            data-scale-offset={scaleOffset}
            data-animate={props?.animate}
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

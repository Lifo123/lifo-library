'use client'
import React from "react";
import { useStore } from "@nanostores/react"
import type { ToasterItemProps, ToasterProps } from "./Toast.Types.js"
import { $firstToast, $toast, LocalToast, toast } from "./Toast.Store.js"
import { ToastIcons } from "./ToastAssets.js";
import { ButtonPromise, CloseBtn } from '../../index.js'
import FlifoPortal from "../FlifoPortal/FlifoPortal.js";

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
        <FlifoPortal portalID={toastID} portalType="Toaster" {...props} bgClose={false} state={true}>
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
        </FlifoPortal>
    )
}

const ToastRow = ({
    scaleOffset = 'center',
    startOffset,
    endOffset,
    ...props
}: ToasterItemProps) => {
    const first = useStore($firstToast)
    const [isVisible, setIsVisible] = React.useState<boolean>(false);
    const [isHovered, setIsHovered] = React.useState<boolean>(false);
    const AllOffsets = {
        '--toast-start-top': startOffset?.top,
        '--toast-start-bottom': startOffset?.bottom,
        '--toast-start-left': startOffset?.left,
        '--toast-start-right': startOffset?.right,
        '--toast-end-top': endOffset?.top,
        '--toast-end-bottom': endOffset?.bottom,
        '--toast-end-left': endOffset?.left,
        '--toast-end-right': endOffset?.right,
    };

    React.useEffect(() => {
        setIsVisible(props.state !== undefined ? props.state : true);
        if (props.state === false) {
            LocalToast.removeDelay(props.toastID, props.id, props.animate === 'none' ? 0 : 350);
        }else{
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
        if(props.noDissapear) return;
        if(props.noDissapear && isHovered) return;
        
        const hideTimeout = setTimeout(() => {
            toast.dismiss(props.toastID, props.id);
        }, props.duration);

        return () => clearTimeout(hideTimeout);
    }, [isHovered, props.duration, props.noDissapear]);

    return (
        <div className={`toast-container d-flex f-center w-max h-max${isVisible ? ' visible' : ' delete'} ${props.theme || ''}${props.isRelative ? ' fixed' : ' absolute'}`}
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
                                {props.title && <h3 className="fs-2" style={{ color: 'rgb(var(--lb-title))' }}>{props?.title}</h3>}
                                <p className="fs-2 m-0">{props?.message}</p>
                                {props.href && <a className="info fs-custom-13 br-6 w-max" href={props.href}>More</a>}

                            </div>
                        </div>
                        {
                            props.action ?
                                <ButtonPromise className="fs-custom-13 pointer btn-fourth br-6"
                                    text={props.actionText || 'Continue'}
                                    size={16}
                                    style={{ padding: '.35rem .8rem' }}
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

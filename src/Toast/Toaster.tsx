'use client'
import React from "react";
import { useStore } from "@nanostores/react"
import { $toast, LocalToast } from "./Toast.Store.js"
import type { SetProps, ToasterProps } from "./Toast.Types.js"
import ButtonPromise from "../General/ButtonPromise.js"
import CloseBtn from "../Alert/CloseBtn.js"
import { ToastIcons } from "./ToastAssets.js";

export default function Toaster({
    id = 'init',
    position = 'bottom-center',
    duration = 2250,
    animate = 'normal',
    maxToasts = 3,
    parent,
}: ToasterProps) {

    const ToastData = useStore($toast)
    React.useEffect(() => {
        const existingToasters = document.querySelectorAll(`[data-toaster-id="init"]`);
        
        if (existingToasters.length > 1) {
            console.warn(`Toaster with id "${id}" already exists. Skipping render.`);
        }
    }, [id]);
    
    if (!ToastData[id]) return null;
    const AvailableToast = ToastData[id]!.slice(-maxToasts - 1);

    return (
        <section className={`toaster-container ${parent ? 'absolute' : 'fixed'} h-100 w-100`} data-toaster-id={id}>
            {AvailableToast && AvailableToast.map((toast, i) => (
                <ToastRow key={toast.id}
                    {...toast} duration={toast.duration || duration}
                    position={toast.position || position}
                    animate={toast.animate || animate}
                    closeBtn={toast.closeBtn}
                    state={i === 0 && AvailableToast.length > maxToasts ? false : true}
                />
            ))}
        </section>
    )
}

const ToastRow = (props: SetProps) => {
    const [isVisible, setIsVisible] = React.useState<boolean>(false);
    const [isRemoved, setIsRemoved] = React.useState<boolean>(false);
    const [isHovered, setIsHovered] = React.useState<boolean>(false);

    const handleDelete = async () => {
        setIsVisible(false);
        setTimeout(() => {
            if (props.toastID && props.id !== undefined && props.duration !== undefined) {
                LocalToast.removeKey(props.toastID, props.id);
                setIsRemoved(true);
            }
        }, 300);
    }

    React.useEffect(() => {
        const visibleTimeout = setTimeout(() => setIsVisible(true), 10);
        return () => clearTimeout(visibleTimeout);
    }, []);

    React.useEffect(() => {
        if (isRemoved) return;
        const hideTimeout = setTimeout(() => {
            if (!isHovered) handleDelete();
        }, props.duration);

        return () => clearTimeout(hideTimeout);
    }, [isHovered, props.duration, isRemoved])

    React.useEffect(() => {
        if (!props.state) {
            setTimeout(() => {
                handleDelete();
            }, 50)
        }
    }, [props.state]);

    if (isRemoved) return null;

    return (
        props?.children && (
            <span className="d-flex" style={{ pointerEvents: 'visible' }}>
                {props.children}
            </span>
        ) || (
            <span
                className={`toast-row f-row f-justify-between f-align-center absolute br-6 sd-1 ${isVisible ? 'visible' : 'delete'} ${props.animate} ${props.className || ''}`}
                data-position={props.position}
                data-axis-y={props.position?.split('-')[0]}
                data-axis-x={props.position?.split('-')[1]}
                data-animate={props?.animate}
                style={{ ...props.style, zIndex: props.id }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="f-row g-1">
                    {props.customIcon || props.icon || props.type && (
                        <span className="toast-icon mr-2 d-flex f-center">
                            {props.customIcon ? props.customIcon : ToastIcons[props.icon || props.type]}
                        </span>
                    )}


                    <div className="f-col g-1 f-justify-center">
                        {props.title && <h3 className="fs-2">{props?.title}</h3>}
                        <p className="fs-custom-13-5 m-0">{props?.message}</p>
                        {props.link && <a className="info fs-2 br-6 w-max" href={props.link}>More</a>}

                    </div>
                </div>
                {props.action ? <ButtonPromise text={props.actionText || 'Continue'} funct={async () => {
                    await props.action!()
                    handleDelete()
                }} /> : props.closeBtn ? <span className="ml-3 d-block" onClick={() => { handleDelete() }}><CloseBtn size={24} /></span> : null}
            </span>
        ))
}

'use client'
import React from "react";
import { useStore } from "@nanostores/react";
import type { AlertDialogerProps, AlertProps } from "./Alert.Types.js";
import FlifoPortal from "../FlifoPortal/FlifoPortal.js";
import { EventManager } from '../../utils/ManageDocument.js'
import { CloseBtn, ButtonPromise } from '../../index.js';
import { $Alert, Alert } from "./Alert.Store.js";



export default function AlertDialoger(props: AlertDialogerProps) {
    const data = useStore($Alert);
    const AvailableDialog = data[data.length - 1];
    if (!AvailableDialog) return null;

    const bgClose = AvailableDialog.bgClose !== undefined ? AvailableDialog.bgClose : (props.bgClose !== undefined ? props.bgClose : false);
    const bgColor = AvailableDialog.bgColor || '#00000095';

    return (
        <FlifoPortal
            portalID={'init'}
            portalType="Dialoger"
            state={AvailableDialog.state}
            bgClose={props.bgClose}
            bgColor={bgColor}
        >
            <Dialoger key={AvailableDialog?.id} {...AvailableDialog} bgClose={bgClose} />
        </FlifoPortal>
    );
};



const Dialoger = (props: AlertProps) => {
    const dialogRef = React.useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        setIsVisible(props.state !== undefined ? props.state : true);

        if (props.state === false) {
            Alert.removeDelay(props.id, props.animate === 'none' ? 0 : 150);
        }
    }, [props.state]);

    React.useEffect(() => {

        if (props.id) {
            if (isVisible && props.bgClose) {
                EventManager.OutsideClick(props.id, dialogRef.current, () => Alert.dismiss(props.id));
            }
            if (props.closeResize) {
                EventManager.Resize(props.id, () => Alert.dismiss(props.id));
            }
        }
        return () => {
            if (props.bgClose && props.id || props.closeResize && props.id) {
                EventManager.removeOutsideClick(props.id);
                EventManager.removeResize(props.id);
            }
        };
    }, [isVisible, props.bgClose, props.id]);

    return (
        <>
            <div className={`dialog-container fixed d-flex f-center w-max ${isVisible ? 'visible' : 'delete'}`}
                data-animate={props.animate || 'scale'}
                ref={dialogRef}
            >
                {props.children ? React.isValidElement(props.children) ? React.cloneElement(props.children, { ...props }) : props.children : (
                    <div className={`dialog-content p-4 f-col g-2 br-8 relative ${props.className || ''}`} style={{ ...props.style, transform: props.style?.transform || 'translateY(-40px)' }}>
                        <div className='f-row f-justify-between f-align-start g-3'>
                            <div className="f-col g-1">
                                {props.title && <h4 className="fs-4 m-0 fw-600 mb-2">{props.title}</h4>}
                                <p className="fs-2 text-common m-0 f-row f-wrap g-1">{props.message || 'Message'} {props.href && (
                                    <a className='w-max link fs-custom-13-5 text-common fw-500' href={props.href}>
                                        More information
                                    </a>
                                )}</p>
                            </div>
                            {props.closeBtn && <span><CloseBtn size={24} onClick={() => Alert.dismiss(props.id)} /></span>}
                        </div>
                        <div className="f-row g-2 f-wrap f-justify-between mt-1">
                            <span className="btn btn-third br-6 fs-2 pointer" onPointerDown={() => Alert.dismiss(props.id)}>
                                Cancel
                            </span>
                            <ButtonPromise className="btn-primary btn br-6" text="Continue" onClick={async () => {
                                try {
                                    await props.onClick?.();
                                    Alert.dismiss(props.id)
                                } catch (e) {
                                    Alert.dismiss(props.id)
                                }
                            }} />
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
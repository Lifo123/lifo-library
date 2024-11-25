'use client'
import React from "react";
import { useStore } from "@nanostores/react";
import type { AlertDialogerProps, Storeitem } from "./Alert.Types.js";
import { CloseBtn, ButtonPromise } from '../index.js';
import { $Alert, Alert } from "./Alert.Store.js";
import { $loading } from "../../Stores/Loading.Store.js";



export default function AlertDialoger({
    loadingID = 'G_fetch',
    ...props
}: AlertDialogerProps) {
    const ALERT = useStore($Alert);

    const AvailableAlerts = Object.values(ALERT).filter(alert => alert.state).slice(0, 1);

    const bgClose = AvailableAlerts[0]?.bgClose !== undefined ? AvailableAlerts[0]?.bgClose : (props?.bgClose !== undefined ? props?.bgClose : false);
    const bgColor = AvailableAlerts[0]?.bgColor !== undefined ? AvailableAlerts[0]?.bgColor : (props?.bgColor !== undefined ? props?.bgColor : '#00000095');


    return (
        <span className='flifo-portal h-100 w-100 o-hidden fixed'>
            {
                AvailableAlerts.map(alert => {
                    return (
                        <Dialoger key={alert.id} {...alert} bgClose={bgClose} bgColor={bgColor} />
                    )
                })
            }
        </span>
    );
};

const Dialoger = (props: Storeitem) => {
    const loading = useStore($loading);
    const dialogRef = React.useRef<HTMLSpanElement | null>(null);

    const AllOffsets = {
        '--custom-start-top': props.startAnim?.top,
        '--custom-start-bottom': props.startAnim?.bottom,
        '--custom-start-left': props.startAnim?.left,
        '--custom-start-right': props.startAnim?.right,
        '--custom-start-opacity': props.startAnim?.opacity,
        '--custom-start-transform': props.startAnim?.transform,
        '--custom-end-top': props.endAnim?.top,
        '--custom-end-bottom': props.endAnim?.bottom,
        '--custom-end-left': props.endAnim?.left,
        '--custom-end-right': props.endAnim?.right,
        '--custom-end-opacity': props.endAnim?.opacity,
        '--custom-end-transform': props.endAnim?.transform
    };

    React.useEffect(() => {
        if (props.state !== undefined) {
            setTimeout(() => {
                $Alert.setKey(props.id, {
                    ...props,
                    isVisible: props.state,
                });
            }, 50);
        }
    }, [props.state]);

    return (
        <div className={`dialog-container fixed d-flex f-center h-100 w-100`}
            style={{ backgroundColor: props.bgColor }}
            onClick={() => {
                if (props.bgClose) Alert.dismiss(props.id);
            }}
        >
            <span className={`dialog-controller d-flex f-center relative ${props.isVisible ? 'visible' : 'delete'}`}
                style={{ ...props.style, ...AllOffsets }}
                data-animate={props.animate}
                onClick={(e) => {
                    e.stopPropagation();
                }}
                ref={dialogRef}
            >
                {props.children || (
                    <div className={`dialog-content p-4 f-col g-2 br-8 ${props.className || ''}`}
                    >
                        <div className='f-row f-justify-between f-align-start g-3'>
                            <div className="f-col g-1">
                                {props.title && <h4 className="fs-4 m-0 fw-600 mb-2">{props.title}</h4>}
                                <p className="fs-2 text-common m-0 f-row f-wrap g-1">{props.message || 'Message'} {props.href && (
                                    <a className='w-max link fs-custom-13-5 text-common fw-500' href={props.href}>
                                        More information
                                    </a>
                                )}</p>
                            </div>
                            {props.closeBtn && <span><CloseBtn size={24} onClick={() => {
                                Alert.dismiss(props.id)
                            }} /></span>}
                        </div>
                        <div className="f-row g-2 f-wrap f-justify-between mt-1">
                            <span className="btn btn-third br-6 fs-2 pointer" onPointerDown={() => {
                                if (loading[props.loadingID || 'G_fetch']) return;
                                Alert.dismiss(props.id)
                            }}>
                                Cancel
                            </span>
                            <ButtonPromise className="btn-primary btn br-6" text="Continue" onClick={async () => {
                                await props.onClick?.()
                                Alert.dismiss(props.id)
                            }} />
                        </div>
                    </div>
                )}
            </span>
        </div>
    )
}
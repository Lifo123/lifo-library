'use client'
import React from "react";
import { useStore } from "@nanostores/react";
import type { AlertDialogerProps } from "./Alert.Types.js";
import { CloseBtn, ButtonPromise } from '../index.js';
import { $Alert, Alert } from "./Alert.Store.js";
import { $loading } from "../../Stores/Loading.Store.js";



export default function AlertDialoger({
    loadingID = 'G_fetch',
    ...props
}: AlertDialogerProps) {
    const ALERT = useStore($Alert);
    const loading = useStore($loading);
    const portalRef = React.useRef<HTMLSpanElement | null>(null);
    const dialogRef = React.useRef<HTMLSpanElement | null>(null);

    const [isVisible, setIsVisible] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);

    const bgClose = ALERT.bgClose !== undefined ? ALERT.bgClose : (props.bgClose !== undefined ? props.bgClose : false);
    const bgColor = ALERT.bgColor !== undefined ? ALERT.bgColor : (props.bgColor !== undefined ? props.bgColor : '#00000095');
    const AllOffsets = {
        '--custom-start-top': ALERT.startAnim?.top,
        '--custom-start-bottom': ALERT.startAnim?.bottom,
        '--custom-start-left': ALERT.startAnim?.left,
        '--custom-start-right': ALERT.startAnim?.right,
        '--custom-start-opacity': ALERT.startAnim?.opacity,
        '--custom-start-transform': ALERT.startAnim?.transform,
        '--custom-end-top': ALERT.endAnim?.top,
        '--custom-end-bottom': ALERT.endAnim?.bottom,
        '--custom-end-left': ALERT.endAnim?.left,
        '--custom-end-right': ALERT.endAnim?.right,
        '--custom-end-opacity': ALERT.endAnim?.opacity,
        '--custom-end-transform': ALERT.endAnim?.transform
    };

    const handleBgClose = React.useCallback((e: MouseEvent) => {
        const ref = dialogRef.current;
        if (ref && !ref.contains(e.target as Node)) {
            Alert.dismiss();
        }
    }, []);


    React.useEffect(() => {
        if (ALERT.state) {
            setIsVisible(true);
            setTimeout(() => setIsAnimating(true), 10);
        } else {
            setIsAnimating(false);
            setTimeout(() => {
                setIsVisible(false);
                Alert.remove();
            }, 180);
        }
    }, [ALERT.state]);

    React.useEffect(() => {
        if (bgClose && isVisible) {
            document.addEventListener('click', handleBgClose);
        }

        return () => {
            document.removeEventListener('click', handleBgClose);
        };
    }, [bgClose, isVisible, handleBgClose]);


    return (
        isVisible && (
            <span
                className={`flifo-portal h-100 w-100 o-hidden fixed ${isAnimating ? 'visible' : 'delete'}`}
                ref={portalRef}
                style={{
                    backgroundColor: bgColor,
                    pointerEvents: isVisible ? 'visible' : 'none'
                }}
            >
                <div className={`dialog-container fixed d-flex f-center w-max ${isAnimating ? 'visible' : 'delete'}`}>
                    <span className={`relative h-100 w-100 ${isAnimating ? 'visible' : 'delete'}`}
                        data-animate={ALERT.animate}
                        style={{
                            ...ALERT.style,
                            ...AllOffsets
                        }}
                        ref={dialogRef}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        {ALERT.children || (
                            <div className={`dialog-content p-4 f-col g-2 br-8 relative ${ALERT.className || ''}`}
                            >
                                <div className='f-row f-justify-between f-align-start g-3'>
                                    <div className="f-col g-1">
                                        {ALERT.title && <h4 className="fs-4 m-0 fw-600 mb-2">{ALERT.title}</h4>}
                                        <p className="fs-2 text-common m-0 f-row f-wrap g-1">{ALERT.message || 'Message'} {ALERT.href && (
                                            <a className='w-max link fs-custom-13-5 text-common fw-500' href={ALERT.href}>
                                                More information
                                            </a>
                                        )}</p>
                                    </div>
                                    {ALERT.closeBtn && <span><CloseBtn size={24} onClick={() => Alert.dismiss()} /></span>}
                                </div>
                                <div className="f-row g-2 f-wrap f-justify-between mt-1">
                                    <span className="btn btn-third br-6 fs-2 pointer" onPointerDown={() => {
                                        if (loading[loadingID]) return;
                                        Alert.dismiss()
                                    }}>
                                        Cancel
                                    </span>
                                    <ButtonPromise className="btn-primary btn br-6" text="Continue" onClick={async () => {
                                        await ALERT.onClick?.()
                                        Alert.dismiss()
                                    }} />
                                </div>
                            </div>
                        )}
                    </span>
                </div>
            </span>
        )
    );
};


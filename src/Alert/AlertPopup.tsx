'use client'
import React from "react";
import { useStore } from "@nanostores/react";
import { type AlertPopupProps } from "./Alert.Types.js";
import { $bgProps, $currentPopup, $custom, $isOpen, $isVisible, $normal, Alert } from "./Alert.Store.js";
import CloseBtn from "./CloseBtn.js";

export default function AlertPopup({ className, style, backgroundColor, id, bgClose, closeBtn }: AlertPopupProps) {
    const popupRef = React.useRef<HTMLSpanElement | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const isOpen = useStore($isOpen);
    const isVisible = useStore($isVisible);
    const popup = useStore($currentPopup);

    const bgProps = useStore($bgProps)
    const custom = useStore($custom);
    const normal = useStore($normal);

    closeBtn = bgProps.closeBtn || closeBtn

    const handleBG = (e: React.PointerEvent) => {
        bgClose = bgProps.bgClose;
        if (!bgClose) return;

        if (popupRef.current && popupRef.current === e.target) {
            Alert.close();
        }
    };

    const handleAccept = async (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsLoading(true)
        await normal.funct?.();
        await Alert.close();

        setTimeout(() => {
            setIsLoading(false)
        }, 50)
    };

    return (
        <span className='portal-popup' id={id ?? 'init'}>
            {isOpen && popup === (id ?? 'init') && (
                <span
                    className={`lb-popup fixed d-flex h-100 w-100 f-center o-hidden ${isVisible ? 'active' : ''}`}
                    onPointerDown={handleBG}
                    style={{ backgroundColor: bgProps?.backgroundColor || backgroundColor }}
                    ref={popupRef}
                >
                    <div className='lb-popup-div relative d-flex f-center'>
                        {custom.children || (
                            <div className={`lb-popup-content p-4 f-col g-2 br-8 relative ${className || ''}`} style={style}>
                                <div className='f-row f-nowrap f-justify-between f-align-center'>
                                    {normal.title && <h4 className="fs-4 m-0 fw-600">{normal.title}</h4>}
                                    {closeBtn && <CloseBtn size={30} />}
                                </div>
                                <p className="fs-2 text-common m-0 f-row f-wrap g-1">{normal.description || 'Message'} {normal.link && (
                                    <a className='w-max link fs-custom-13-5 text-common fw-400' href={normal.link}>
                                        More information
                                    </a>
                                )}</p>
                                {normal.children}
                                <div className="lb-popup-btn-sec f-row g-2 f-wrap f-justify-between mt-1">
                                    <span className="btn btn-third br-6 fs-2" onPointerDown={Alert.close}>
                                        Cancel
                                    </span>
                                    <span className='btn btn-primary br-6 relative d-flex f-center' onClick={handleAccept} style={style}>
                                        {
                                            isLoading && (
                                                <span className="lb-loading-indicator absolute">
                                                    <span className="lb-circular-root" style={{ height: 20 }}>
                                                        <svg viewBox="22 22 44 44" stroke={'rgb(var(--lb-white))'}>
                                                            <circle cx="44" cy="44" r="20.2" fill="none" strokeWidth='4'></circle>
                                                        </svg>
                                                    </span>
                                                </span>
                                            )
                                        }
                                        <p className={`m-0 opacity-${isLoading && '0'}`}>Continue</p>
                                    </span >
                                </div>
                            </div>
                        )}
                    </div>
                </span>
            )}
        </span>
    );
};

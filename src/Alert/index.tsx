'use client'
import React from 'react';
import { useStore } from '@nanostores/react'
import { $children, $currentPopup, $isOpen, $isVisible, $normal, setPopup, setState } from './Alert.Store'
import { CustomProps, NormalProps } from './Alert.Types';

interface AlertPopupProps {
    id?: string
    className?: string;
    style?: React.CSSProperties;
    backgroundColor?: string;
}


const normal = ({
    title, description, link, children, id, funct = () => {
        console.log('Without Function');

    }
}: NormalProps) => {
    setState(true)
    setPopup(id || '')


    $normal.set({
        title: title,
        description: description,
        link: link,
        children: children,
        funct: funct
    });
}

const custom = (children: any, props?: CustomProps) => {
    setState(true)
    setPopup(props?.id || '')
    $children.set(children)
}

const close = () => {
    setState(false)
}

const Alert = {
    normal, custom, close
}

const AlertPopup = ({ className, style, backgroundColor, id }: AlertPopupProps) => {
    const popupRef = React.useRef<HTMLSpanElement | null>(null)

    const isOpen = useStore($isOpen)
    const isVisible = useStore($isVisible);
    const popup = useStore($currentPopup);

    const children = useStore($children);
    const normal = useStore($normal)


    const handleBG = (e: React.PointerEvent) => {
        if (popupRef.current && popupRef.current === e.target) {
            Alert.close()
        }
    };

    const handleAccept = (e: React.PointerEvent) => {
        e.stopPropagation();
        normal.funct?.();
        Alert.close();
    }

    return (
        <span className='portal-popup' id={id || 'init'}>
            {
                isOpen && popup === (id || 'init') && (
                    <span className={`lb-popup fixed d-flex h-100 w-100 f-center o-hidden ${isVisible ? 'active' : ''}`} onPointerDown={handleBG} style={{ backgroundColor: backgroundColor }} ref={popupRef}>
                        <div className='lb-popup-div relative d-flex f-center'>
                            {
                                children || <div className={`lb-popup-content p-4 f-col g-2 br-8 relative${className || ''}`} style={style}>
                                    {normal.title && <p className="fs-4 m-0 fw-600">{normal.title}</p>}
                                    <p className="fs-2 text-common m-0 ">{normal.description || 'Message'}</p>
                                    {normal.link && <a className='w-max link p-1 fs-2 text-common fw-500' href={normal.link}>More info</a>}
                                    {normal.children && normal.children}
                                    <div className="lb-popup-btn-sec f-row g-2 f-wrap f-justify-between mt-3">
                                        <span className="btn btn-third br-6 fs-2" onPointerDown={Alert.close}>Cancel</span>
                                        <span className="btn btn-primary br-6 fs-2" onPointerDown={handleAccept}>Continue</span>
                                    </div>
                                </div>
                            }
                        </div>
                    </span>
                )
            }
        </span>
    )
}

export { Alert, AlertPopup }
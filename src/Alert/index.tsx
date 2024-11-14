'use client'
import React from 'react';
import { useStore } from '@nanostores/react'
import { atom, map } from "nanostores";

interface NormalProps {
    title: string;
    description: string;
    link?: string | undefined;
    children?: React.ReactNode;
    funct?: () => void;
    id?: string
}

interface CustomProps {
    closeButton?: boolean;
    id?: string | undefined;
}

interface AlertPopupProps {
    id?: string
    className?: string;
    style?: React.CSSProperties;
    backgroundColor?: string;
}

const $isOpen = atom(false);
const $isVisible = atom(false);
const $currentPopup = atom<string | null>(null);
const $children = atom<React.ReactNode>(null)
const $normal = map<NormalProps>()

const setBodyScroll = (disable: boolean) => {
    const body = document.body;
    const html = document.documentElement;
    const hasVerticalScroll = html.scrollHeight > html.clientHeight;

    if (disable) {
        if (hasVerticalScroll) {
            body.style.paddingRight = `11px`;
        }
        body.style.overflow = 'hidden';
    } else {
        setTimeout(() => {
            body.style.paddingRight = '0px';
            body.style.overflow = 'auto';
        }, 160)
    }
};

const setState = (state: boolean) => {
    if (state) {
        $isOpen.set(true);
        setTimeout(() => $isVisible.set(true), 5);
    } else {
        $isVisible.set(false);
        setTimeout(() => {
            $isOpen.set(false);
            $children.set(null);
            $currentPopup.set(null);
            $normal.set({ title: '', description: '' });
        }, 150);
    }
    setBodyScroll(state);
}

const setPopup = (id: string) => {
    if (id) {
        $currentPopup.set(id);
    } else {
        const firstPopup = document.querySelector('.portal-popup');
        const newID = firstPopup?.getAttribute('id') || 'init';
        $currentPopup.set(newID);
    }
}

const normal = ({
    title, description, link, children, id, funct = () => {
        console.log('Without Function');
    }
}: NormalProps) => {
    setState(true);
    setPopup(id || '');
    $normal.set({ title, description, link, children, funct });
};

const custom = (children: React.ReactNode, props?: CustomProps) => {
    setState(true);
    setPopup(props?.id || '');
    $children.set(children);
};

const close = () => {
    setState(false)
}

export const Alert = {
    normal, custom, close
}

const AlertPopup = ({ className, style, backgroundColor, id }: AlertPopupProps) => {
    const popupRef = React.useRef<HTMLSpanElement | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const isOpen = useStore($isOpen);
    const isVisible = useStore($isVisible);
    const popup = useStore($currentPopup);
    const children = useStore($children);
    const normal = useStore($normal);

    const handleBG = (e: React.PointerEvent) => {
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
                    style={{ backgroundColor }}
                    ref={popupRef}
                >
                    <div className='lb-popup-div relative d-flex f-center'>
                        {children || (
                            <div className={`lb-popup-content p-4 f-col g-2 br-8 relative ${className || ''}`} style={style}>
                                {normal.title && <p className="fs-4 m-0 fw-600">{normal.title}</p>}
                                <p className="fs-2 text-common m-0 f-row f-wrap">{normal.description || 'Message'} {normal.link && (
                                    <a className='w-max link py-1 fs-2 text-common fw-400' href={normal.link}>
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
export default AlertPopup
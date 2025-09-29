'use strict';
import React from "react";
import { Icons } from "../Icons/index.js";
import UI from "../../UI/index.js";

interface NotificationProps {
    id?: string;
    title?: string;
    source?: string;
    description: string;
    href?: string;
    time?: number;
    custom?: React.ReactNode;
    closeBtn?: boolean;
}

export default function Notification(props: NotificationProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const detailsRef = React.useRef<HTMLSpanElement>(null);

    const toggleAccordion = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <section
            className="noti-container f-col rounded-lg select o-hidden w-full border border-lifo-border"
        >
            <div
                className="noti-head f-row py-2.5 px-3.5 items-center justify-between cursor-pointer select-none text-lifo-text"
                onClick={toggleAccordion}
            >
                <div className="f-row gap-1.5 f-center fs-1 ">
                    <Icons icon="user" size={20} />
                    {props.source && <span className="">{props.source}</span>}
                    <span className="f-row gap-1.5">•<span>33 min</span></span>
                </div>
                <span className="f-row gap-1.5">
                    <Icons icon="arrow" size={24} rotate={isOpen ? 0 : 180} y={isOpen ? -0.1 : 0} />
                    {props.closeBtn && <Icons icon="close" size={24} onClick={(e) => {
                        e.stopPropagation();
                        UI.toast.dismiss(props.id || 'wasa')
                    }} />}
                </span>
            </div>
            <div className="f-col px-3.5 pb-2.5">
                {props.title && <p className="fs-custom-15 text-lifo-title">{props.title}</p>}
                <p className={`fs-2 text-lifo-text leading-normal ${!isOpen ? 'line-clamp-1 overflow-hidden' : ''}`}>
                    {props.description} {props.href && <a className="info rounded-md w-max" href={props.href} target="_blank">More</a>}
                </p>
            </div>

            <span
                className="noti-details o-hidden"
                style={{
                    maxHeight: isOpen ? detailsRef.current?.scrollHeight + "px" : "0px"
                }}
                ref={detailsRef}
            >
                {
                    props.custom ?? (
                        <div className="f-col leading-snug gap-0.5 h-max w-full px-3.5 pb-2.5 fs-2 ">
                            <div className="f-row w-full justify-between items-center">
                                <span>

                                </span>
                            </div>
                        </div>
                    )
                }
            </span>
        </section>
    );
}

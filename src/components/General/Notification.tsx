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
}

export default function Notification(props: NotificationProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const detailsRef = React.useRef<HTMLSpanElement>(null);

    const toggleAccordion = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <section
            className="noti-container f-col rounded-md select o-hidden w-full"
        >
            <div
                className="noti-head f-row py-2.5 px-3.5 items-center justify-between cursor-pointer select-none "
                onClick={toggleAccordion}
            >
                <div className="f-row gap-1.5 f-center fs-custom-13">
                    <Icons icon="setting" size={20} />
                    {props.source && <span className="fs-custom-12-5 fw-500">{props.source}</span>}
                    <span>time</span>
                </div>
                <Icons icon="arrow" size={26} rotate={isOpen ? 0 : 180} y={isOpen ? -0.1 : 0} />
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
                        <div className="f-col leading-snug gap-0.5 h-max w-full px-3.5 pb-3">
                            {props.title && <p className="fs-3 text-lifo-title">{props.title}</p>}
                            <p className="fs-2 text-lifo-text">{props.description}</p>
                            <span className="btn btn-third rounded-md" onClick={() => {
                                UI.toast.dismiss(props.id || 'wasa')
                            }}>close</span>
                        </div>
                    )
                }
            </span>
        </section>
    );
}

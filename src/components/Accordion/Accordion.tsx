'use strict';
import React from "react";
import { Icons } from "../Icons/index.js";
import { BaseComponentProps } from "../../Types/GeneralTypes.js";
import { $interface } from "../../UI/Interface.Store.js";
import { useStore } from "@nanostores/react";

interface AccordionProps extends BaseComponentProps {
    title?: string;
    description: string;
    href?: string;
    custom?: React.ReactNode;
    closeAll?: boolean;
}

export default function Accordion(props: AccordionProps) {
    const INTERFACE = useStore($interface);

    const [isOpen, setIsOpen] = React.useState(false);
    const detailsRef = React.useRef<HTMLDivElement>(null);

    const handleClick = () => {
        if (props.closeAll) {
            $interface.setKey("accordionAllClose", true);

            setTimeout(() => {
                $interface.setKey("accordionAllClose", false);
            }, 0);
        }

        setIsOpen(prev => !prev);
    };


    React.useEffect(() => {
        if (INTERFACE.accordionAllClose && !props.closeAll) {
            setIsOpen(false);
        }
    }, [INTERFACE.accordionAllClose]);


    return (
        <section
            className={`f-col o-hidden w-full ${props.className || 'border-b border-lifo-border fs-2 fw-300 text-lifo-text-high'}`}
            style={props.style}
        >
            <div
                className="noti-head pt-4 pb-3 f-row items-center justify-between cursor-pointer select-none "
                onClick={handleClick}
            >
                <span className="fw-500">{props.title || 'No tittle defined.'}</span>
                <span className="mr-1">
                    <Icons icon="arrow" size={18} rotate={isOpen ? 0 : -180} y={isOpen ? -0.1 : 0} />
                </span>
            </div>

            <div className="noti-details o-hidden" style={{
                maxHeight: isOpen ? detailsRef.current?.scrollHeight + "px" : "0px",
                opacity: isOpen ? 1 : 0,
            }}
                ref={detailsRef}
            >
                {
                    props.custom ?? (
                        <div className="details-container f-col gap-2 pb-4 fw-200">
                            <p>
                                {props.description}
                                {props.href && <a className="text-blue-400" href={props.href}>more.</a>}
                            </p>
                        </div>
                    )
                }
            </div>
        </section>
    );
}

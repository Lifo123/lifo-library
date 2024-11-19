'use client';
import React from "react";
import { EventManager } from "../../utils/ManageDocument.js";
import type { DropdownButtonProps, DropdownProps, ListDropProps } from "./Dropdown.Types.js";

export default function Dropdown(props: DropdownProps) {
    const [isVisible] = React.useState(false);
    const dropRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (dropRef.current && props.id) {
            EventManager.OutsideClick(props.id, dropRef.current, () => console.log('wasa'));
        }
        return () => {
            if (props.id) {
                EventManager.removeOutsideClick(props.id);
            }
        };
    }, [props.id]);

    return (
        <div
            className={`dropdown-menu f-col fixed br-6 sd-1 ${isVisible ? 'visible' : 'delete'} ${props.animation}`}
            style={{ ...props.style, top: props.top, left: props.left, transform: props.transform }}
            data-offset={props.offset}
            ref={dropRef}
        >
            {props.title && (
                <p className="dropdown-menu-head m-0 fs-2 fw-600">{props.title}</p>
            )}
            {props.contents?.map((data, i) => (
                <DropmenuSection key={i} props={data} id={props.id} />
            ))}
        </div>
    );
}
export const DropmenuSection = ({ props, id }: { props: ListDropProps[], id?: number }) => {
    return (
        <ul className="dropmenu-section f-col">
            {props.map((data, i) => (
                <DropmenuItem key={i} {...data} id={id} />
            ))}
        </ul>
    );
};

export const DropmenuItem = (props: ListDropProps) => {

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault()
        await props.onClick?.();

        if (props.href) {
            if (!props.href.startsWith('http')) {
                return;
            }
            window.location.href = props.href;
        }
    };

    return (
        <li className="dropmenu-item br-4 f-row f-justify-between pointer" onClick={handleClick}>
            {props.href ? (
                <a className="fs-2 fw-500 m-0 mr-6 w-100" href={props.href}>
                    {props.text}
                </a>
            ) : (
                <p className="fs-2 fw-500 m-0 mr-6w-100">
                    {props.text}
                </p>
            )}
        </li>
    );
};


export const OpenDropdown = (data: DropdownButtonProps) => {
    


    return (
        <span className={`drop-btn btn  ${data?.className || 'btn-third br-6'}`}>
            {data?.text || 'Open'}
        </span>
    )
}
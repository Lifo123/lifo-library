'use strict'
import { DropdownItems } from "./Dropdown.Types.js";
import Dropdownitem from "./Dropdownitem.js";

interface Props {
    items: DropdownItems[];
    close?: (state?: any) => void;
    index?: number;
}

export default function DropdownSection({ items, close, index }: Props) {

    return (
        <ul className="dropdown-section f-col" style={{ borderTop: index === 0 ? 'none' : `solid 1px var(--color-lifo-border-low)` }}>
            {items.map((data, i) => (
                <Dropdownitem key={i} {...data} close={close} />
            ))}
        </ul>
    )
}
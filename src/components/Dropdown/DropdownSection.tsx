import { DropdownItems } from "./Dropdown.Types.js";
import Dropdownitem from "./Dropdownitem.js";

interface Props {
    items: DropdownItems[];
    close?: (state?: any) => void;
}

export default function DropdownSection({ items, close }: Props) {

    return (
        <ul className="dropdown-section f-col">
            {items.map((data, i) => (
                <Dropdownitem key={i} {...data} close={close} />
            ))}
        </ul>
    )
}
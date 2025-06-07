import { DropdownItems } from "./Dropdown.Types";
import Dropdownitem from "./Dropdownitem";

interface Props {
    items: DropdownItems[];
    close?: (state?: any) => void | Promise<void> | void;
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
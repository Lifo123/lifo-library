import { DropdownItems } from "./Dropdown.Types.js";

interface Props {
    close?: (state?: boolean) => void;
}

export default function Dropdownitem(props: DropdownItems & Props) {
    return (
        <span className="dropdown-item pointer rounded-md fs-2 f-row f-nowrap justify-between items-center" onClick={async () => {
            await props.onClick?.();
            props.close?.(false);
        }}>
            {props.text}
            {props.icon ?? null}
        </span>
    )
}
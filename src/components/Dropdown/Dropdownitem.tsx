import { DropdownItems } from "./Dropdown.Types";

interface Props {
    close?: (state?: boolean) => void;
}

export default function Dropdownitem(props: DropdownItems & Props) {
    return (
        <span className="dropdown-item pointer br-4 fs-2" onClick={async () => {
            await props.onClick?.();
            props.close?.(false);
        }}>
            {props.text}
        </span>
    )
}
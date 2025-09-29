'use client'
import { DropDownAllTypes } from "./Dropdown.Types.js";
import DropdownSection from "./DropdownSection.js";
import { useDropdown } from "../../hooks/useDropdown.js";


export default function Dropdown({ ...props }: DropDownAllTypes) {
    const {
        isVisible,
        isAnim,
        btnRef,
        dropdownRef,
        toggle,
        openDirection,
    } = useDropdown({ ...props });

    if (typeof window === "undefined") {
        console.error("DropDown: Is only available in the browser (Client Side)");
        return null;
    };


    return (
        <span className="">
            <span className="w-max" onClick={() => toggle(!isVisible)}
                ref={btnRef}>
                {
                    props.children || <span
                        className={`d-flex relative ${props.className || ''} pointer`}
                        style={props.style}
                    >
                        {props.text || "Open Dropdown"}
                    </span>
                }
            </span>

            {isVisible && (
                <div
                    className={`dropdown-content fixed ${props?.dropdown?.className || `f-col o-hidden rounded-md`} ${isAnim ? " visible" : " delete"}`}
                    ref={dropdownRef}
                    style={{
                        ...props?.dropdown?.style,
                        transformOrigin: `${openDirection !== "up" ? "top" : "bottom"} center`
                    }}
                >
                    {props.title && <p className="dropdown-head fs-2 fw-500 m-0">{props.title}</p>}
                    {props.items?.map((data, i) => (
                        <DropdownSection key={i} items={data} close={toggle} index={i} />
                    ))}
                </div >
            )
            }
        </span>
    );
}

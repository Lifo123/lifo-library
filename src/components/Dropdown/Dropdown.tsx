'use client'
import { DropDownAllTypes } from "./Dropdown.Types.js";
import DropdownSection from "./DropdownSection.js";
import { useDropdown } from "./useDropdown.js";


export default function Dropdown({ ...props }: DropDownAllTypes) {
    const {
        isVisible,
        isAnim,
        btnRef,
        dropdownRef,
        toggle,
        openDirection,
    } = useDropdown({ ...props });


    return (
        <>
            <span className="d-flex w-max" onClick={() => toggle(!isVisible)}
                ref={btnRef}>
                {
                    props.custom || <span
                        className="d-flex relative br-6 btn btn-secondary pointer"
                    >
                        {props.text || "Open Dropdown"}
                    </span>
                }
            </span>

            {isVisible && (
                <div
                    className={`dropdown-content absolute ${props.className || `f-col o-hidden br-10`} ${isAnim ? " visible" : " delete"}`}
                    ref={dropdownRef}
                    style={{
                        ...props.style,
                        transformOrigin: `${openDirection !== "up" ? "top" : "bottom"} center`
                    }}
                >
                    {props.title && <p className="dropdown-head fs-2 fw-600 m-0">{props.title}</p>}
                    {props.items?.map((data, i) => (
                        <DropdownSection key={i} items={data} close={toggle} />
                    ))}
                </div >
            )
            }
        </>
    );
}

import { DropDownAllTypes } from "./Dropdown.Types";
import DropdownSection from "./DropdownSection";
import { useDropdown } from "./useDropdown";


export default function Dropdown({ ...props }: DropDownAllTypes) {
    const {
        isVisible,
        isAnim,
        btnRef,
        dropdownRef,
        toggle
    } = useDropdown({ ...props });

    return (
        <>
            <span
                className="d-flex relative br-6 btn btn-secondary pointer"
                onClick={() => toggle(!isVisible)}
                ref={btnRef}
            >
                {props.text || "Open Dropdown"}
            </span>

            {isVisible && (
                <div
                    className={`dropdown-content f-col o-hidden br-8 absolute ${isAnim ? "visible" : "delete"}`}
                    ref={dropdownRef}
                    data-animate={props.animate}
                >
                    {props.text && <p className="dropdown-head fs-2 fw-600 m-0">{props.text}</p>}
                    {props.items?.map((data, i) => (
                        <DropdownSection key={i} items={data} close={toggle} />
                    ))}
                </div>
            )}
        </>
    );
}

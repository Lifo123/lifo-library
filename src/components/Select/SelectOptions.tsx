import React from "react";
import Dropdown from "../Dropdown/Dropdown.js";

interface SelectProps {
    className?: string;
    title?: string;
    text?: string;
    options?: string[];
    onChange?: (value: any) => void;
}

export default function SelectOptions({ className, title, text = "Select", options = [], ...props }: SelectProps) {
    const dropdownRef = React.useRef<any>(null); // Ref para manejar el Dropdown
    const [selected, setSelected] = React.useState(text);

    React.useEffect(() => {
        setSelected(text);
    }, [text]);

    return (
        <>
            <Dropdown ref={dropdownRef} text={selected} dir="dtb" className={`${className} mt-1`}>
                {title ? <h4 className="dropdown-title">{title}</h4> : null}
                <div className="f-col w-100">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className="dropdown-option w-100 px-2 py-2"
                            onClick={async () => {
                                setSelected(option);
                                await props.onChange?.(option);
                                dropdownRef.current?.close();
                            }}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            </Dropdown>
        </>
    );
}

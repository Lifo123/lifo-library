import React from "react";

interface TestProps {

}

export default function TestDrop() {
    const [isOpen, setIsOpen] = React.useState(false);

    const targetRef = React.useRef<HTMLDivElement>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    return (
        <>
            <div className="btn btn-fourth rounded-md pointer"
                ref={targetRef}
            >
                Button
            </div>

            <div className="bg-lifo-bg-secondary h-64 w-24 rounded-s-md"
                ref={dropdownRef}
            >

            </div >
        </>


    )
}
import React from "react"
import { UI } from "../UI/index"
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger, Icons } from "../components";
import { Accordion } from "../components/Accordion";
import { useStore } from "@nanostores/react";
import { $preferences } from "../Stores";
import UploadBtn from "../components/General/ButtonUpload";
import Select from "../components/Select/Select";
import SelectOption from "../components/Select/SelectOption";


interface Props {
    children?: React.ReactNode;
}

export default function Test({ children }: Props) {
    const PREFS = useStore($preferences);

    React.useEffect(() => {
        setTimeout(() => {
            UI.Loading.setKey("page_load", false)
        }, 100)
    }, [])


    return (
        <div className="f-col f-center gap-2 ">
            <div className="mt-5">
                <label className="px-3 rounded-md input-wrapper f-row gap-3 f-center border border-lifo-border bg-lifo-bg-secondary w-max min-w-2xs">
                    <Icons icon="search" size={20} />
                    <input type="search" className="fs-2 fw-300 f-grow py-2" placeholder="Search..." />
                </label>
            </div>

            <p className="mt-10">daw</p>
            <p className="mt-10">daw</p>
            <p className="mt-10">daw</p>
            <p className="mt-10">daw</p>
            <p className="mt-10">daw</p>
            <div className="f-row gap-4 f-center">
                <Dropdown frezzeScroll>
                    <DropdownTrigger text="Hola mundo">
                        <span className="f-row select-none gap-2 fw-500 f-center py-1 px-3 rounded-md bg-lifo-bg-third border border-lifo-border fs-2">
                            Normal
                            <Icons icon="arrow" size={16} />
                        </span>
                    </DropdownTrigger>

                    <DropdownContent dir="btr" >
                        <ul className="f-col w-full border-b border-lifo-border fs-1  py-1 px-1 fw-400 text-lifo-text">
                            <DropdownItem text="Normal" disabled />
                        </ul>
                        <ul className="f-col w-full fs-2 py-1 px-1 fw-400 text-lifo-text border-b border-lifo-border">
                            <DropdownItem text="Darken" />
                            <DropdownItem text="Multiply" />
                            <DropdownItem text="Color Burn" />
                            <DropdownItem text="Linear Burn" />
                            <DropdownItem text="Darker Color" />
                        </ul>
                        <ul className="f-col w-full fs-2 py-1 px-1 fw-400 text-lifo-text border-b border-lifo-border">
                            <DropdownItem text="Lighten" />
                            <DropdownItem text="Screen" />
                            <DropdownItem text="Color Dodge" />
                            <DropdownItem text="Linear Dodge" />
                            <DropdownItem text="Lighter Color dawd awd aw aw daw daw d" />
                        </ul>
                        <ul className="f-col w-full fs-2 py-1 px-1 fw-400 text-lifo-text border-b border-lifo-border">
                            <DropdownItem text="Overlay" />
                            <DropdownItem text="Soft Light" />
                            <DropdownItem text="Hard Light" />
                            <DropdownItem text="Vivid Light" />
                            <DropdownItem text="Linear Light" />
                            <DropdownItem text="Pin Light" />
                            <DropdownItem text="Hard Mix" />
                        </ul>
                        <ul className="f-col w-full fs-2 py-1 px-1 fw-400 text-lifo-text border-b border-lifo-border">
                            <DropdownItem text="Difference" />
                            <DropdownItem text="Exclusion" />
                            <DropdownItem text="Subtract" />
                            <DropdownItem text="Divide" />
                        </ul>
                        <ul className="f-col w-full fs-2 py-1 px-1 fw-400 text-lifo-text">
                            <DropdownItem text="Hue" />
                            <DropdownItem text="Saturation" />
                            <DropdownItem text="Color" />
                            <DropdownItem text="Luminosity" />
                        </ul>
                    </DropdownContent>
                </Dropdown>

            </div>
            <p className="mt-10">daw</p>
            <p className="mt-10">daw</p>
            <p className="mt-10">daw</p>
            <p className="mt-10">daw</p>
            <p className="mt-10">daw</p>
            <p className="mt-10">daw</p>
            <p className="mt-10">daw</p>
            <p className="mt-10">daw</p>
            <p className="mt-10">daw</p>
            <p className="mt-10">daw</p>
        </div >
    )
}

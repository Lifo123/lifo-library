import React from "react"
import { UI } from "../UI/index"
import { DarkmodeIcon, Dropdown, DropdownContent, DropdownItem, DropdownTrigger, Icons, Select, SelectOption } from "../components";
import { useStore } from "@nanostores/react";
import { $preferences } from "../Stores";
import { Accordion } from "../components/Accordion";
import AccordionTrigger from "../components/Accordion/AccordionTrigger";
import AccordionContent from "../components/Accordion/AccordionContent";
import Tooltip from "../components/Tooltip/Tooltip";


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
        <div className="f-col f-center gap-2 oy-hidden">
            <Tooltip text="Button" custom={<span className="flex btn btn-third rounded-md">dawdawd test</span>}>
                <span className="flex btn btn-third rounded-md">Button for test</span>
            </Tooltip>

            <div className="f-row justify-end w-full">
                <Select
                    onChange={(value) => console.log(value)}
                    dir="btl"
                    margin="8px"
                >
                    <ul className="f-col w-full fs-1 py-1 px-1 fw-400 text-lifo-text">
                        <SelectOption text="Light" value="light" />
                        <SelectOption text="Dark" value="dark" />
                        <SelectOption text="System" value="system" />
                    </ul>
                </Select>
            </div>
            <div className="f-col w-md">
                <Accordion closeAll>
                    <AccordionTrigger>
                        Hola title
                    </AccordionTrigger>
                    <AccordionContent >
                        <span className="text-wrap flex">CONTENIDOD PES djnawkdn awdn awdawndkwa d</span>
                        <span className="text-wrap flex">CONTENIDOD PES djnawkdn awdn awdawndkwa d Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet placeat voluptate assumenda doloribus dignissimos blanditiis a saepe, quae laborum ut quis quidem temporibus commodi quos nihil vitae expedita deleniti earum?</span>
                        <span className="text-wrap flex">CONTENIDOD PES djnawkdn awdn awdawndkwa d</span>
                    </AccordionContent>
                </Accordion>
                <Accordion >
                    <AccordionTrigger>
                        Hola title
                    </AccordionTrigger>
                    <AccordionContent >
                        <span className="text-wrap flex">CONTENIDOD PES djnawkdn awdn awdawndkwa d</span>
                        <span className="text-wrap flex">CONTENIDOD PES djnawkdn awdn awdawndkwa d Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet placeat voluptate assumenda doloribus dignissimos blanditiis a saepe, quae laborum ut quis quidem temporibus commodi quos nihil vitae expedita deleniti earum?</span>
                        <span className="text-wrap flex">CONTENIDOD PES djnawkdn awdn awdawndkwa d</span>
                    </AccordionContent>
                </Accordion>
            </div>
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
            <div className="f-row justify-end w- gap-4 f-center">
                <Dropdown >
                    <DropdownTrigger text="Hola mundo">
                        <span className="f-row select-none gap-2 fw-500 f-center py-1 px-2 rounded-md bg-lifo-bg-third border border-lifo-border fs-3">
                            da
                            <Icons icon="arrow" size={16} />
                        </span>
                    </DropdownTrigger>

                    <DropdownContent >
                        <ul className="f-col w-full border-b border-lifo-border fs-1  py-1 px-1 fw-400 text-lifo-text items-start">
                            <DropdownItem text="Normal" disabled />
                        </ul>
                        <ul className="f-col w-full fs-2 py-1 px-1 fw-400 text-lifo-text border-b border-lifo-border">
                            <DropdownItem text="Darken" />
                            <DropdownItem text="Multiply" />
                            <DropdownItem text="Color Burn" />
                            <DropdownItem text="Linear Burn" />
                            <DropdownItem text="Darker Color" shortCut="⌘ + B" icon="user" onClick={() => {
                                UI.Dialog.show({
                                    title: 'Test',
                                    description: 'Test',
                                    onClick: () => {
                                        UI.toast.show('wada')
                                    }
                                })

                            }} />
                        </ul>
                        <ul className="f-col w-full fs-2 py-1 px-1 fw-400 text-lifo-text border-b border-lifo-border">
                            <DropdownItem text="Lighten" />
                            <DropdownItem text="Screen" />
                            <DropdownItem text="Color Dodge" />
                            <DropdownItem text="Linear Dodge" />
                            <DropdownItem text="Lighter Color" />
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
            <Dropdown duration="95ms" frezzeScroll>
                <DropdownTrigger text="Hola mundo">
                    <span className="f-row select-none gap-2 fw-500 f-center py-1 px-2 rounded-md bg-lifo-bg-third border border-lifo-border fs-3">
                        da
                        <Icons icon="arrow" size={16} />
                    </span>
                </DropdownTrigger>

                <DropdownContent
                    className="wasa"
                    style={{}}
                    dir={'btl'}
                    margin={'20px'}
                    popover
                >
                    <ul className="f-col w-full border-b border-lifo-border fs-1  py-1 px-1 fw-400 text-lifo-text items-start">
                        <DropdownItem text="Normal" disabled />
                    </ul>
                    <ul className="f-col w-full fs-2 py-1 px-1 fw-400 text-lifo-text border-b border-lifo-border">
                        <DropdownItem text="Darken" />
                        <DropdownItem text="Multiply" />
                        <DropdownItem text="Color Burn" />
                        <DropdownItem text="Linear Burn" />
                        <DropdownItem text="Darker Color" shortCut="⌘ + B" icon="user" onClick={() => {
                            UI.Dialog.show({
                                title: 'Test',
                                description: 'Test',
                                onClick: () => {
                                    UI.toast.show('wada')
                                }
                            })

                        }} />
                    </ul>
                    <ul className="f-col w-full fs-2 py-1 px-1 fw-400 text-lifo-text border-b border-lifo-border">
                        <DropdownItem text="Lighten" />
                        <DropdownItem text="Screen" />
                        <DropdownItem text="Color Dodge" />
                        <DropdownItem text="Linear Dodge" />
                        <DropdownItem text="Lighter Color daw dawd awd awd" />
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

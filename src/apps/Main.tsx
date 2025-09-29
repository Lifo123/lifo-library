import React from "react"
import { UI } from "../UI/index"
import { DarkmodeDrop, DarkmodeIcon, DarkmodeToggle, Dropdown, Icons, Notification } from "../components";
import { Accordion } from "../components/Accordion";
import DropdownSection from "../components/Dropdown/DropdownSection";
import { ManageLocal } from "../utils";
import { useStore } from "@nanostores/react";
import { $preferences } from "../Stores";
import { Darkmode } from "../components/Darkmode/Darkmode.Store";
import UploadBtn from "../components/General/ButtonUpload";
import { $files } from "../Stores/File.Store";


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

            <UploadBtn />

            <div className="f-row gap-4 mt-2">
                <button className="btn btn-third rounded-md" onClick={() => {

                }}>
                    Set new value
                </button>
                <button className="btn btn-third rounded-md" onClick={() => {

                }}>
                    Get value
                </button>
                <button className="btn btn-third rounded-md" onClick={() => ManageLocal.prefs.remove()}>
                    Delete store
                </button>
                <button className="btn btn-third rounded-md" onClick={() => {

                }}>
                    Update data
                </button>
            </div>

            <div className="mt-2">
                <div className="px-3 py-2 rounded-md input-wrapper f-row gap-3 f-center border border-lifo-border bg-lifo-bg-secondary w-max min-w-2xs">
                    <Icons icon="search" size={20} />
                    <input type="search" className="fs-2 fw-300 f-grow" placeholder="Search..." />
                </div>
            </div>

                <button className="btn p-3 bg-lifo-bg-fourth">dawdwa</button>

            <div className="mt-2 w-xl">
                <Accordion description="Pregunta 1" title="Pregunta 1" />
                <Accordion description="wasa dawd" title="Pregunta 2" closeAll />
                <Accordion description="Perro toad " title="Pregunta 3" />
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
            <p className="mt-10">daw</p>
            <p className="mt-10">daw</p>
            <p className="mt-10">daw</p>
            <p className="mt-10">daw</p>
            <p className="mt-10">daw</p>
        </div >
    )
}

import React from "react"
import { UI } from "../UI/index"
import { useStore } from "@nanostores/react";
import { $preferences } from "../Stores";
import Test from "./Test";
import { DarkmodeDrop, Dropdown, DropdownContent, DropdownTrigger } from "../components";


interface Props {
    children?: React.ReactNode;
}

export default function Main({ children }: Props) {
    const PREFS = useStore($preferences);


    React.useEffect(() => {
        setTimeout(() => {
            UI.Loading.setKey("page_load", false)
        }, 100)
    }, [])

    return (
        <div className="f-col f-center gap-2 oy-hidden">
            <Test />
            <Test />
            <DarkmodeDrop />
            <p className="mt-40">dawdwa</p>
            <p className="mt-40">dawdwa</p>
            <p className="mt-40">dawdwa</p>
            <p className="mt-40">dawdwa</p>
            <p className="mt-40">dawdwa</p>
            <p className="mt-40">dawdwa</p>
            <p className="mt-40">dawdwa</p>
            <p className="mt-40">dawdwa</p>
            <p className="mt-40">dawdwa</p>
            <p className="mt-40">dawdwa</p>
            <p className="mt-40">dawdwa</p>
            <p className="mt-40">dawdwa</p>
            <p className="mt-40">dawdwa</p>
        </div >
    )
}

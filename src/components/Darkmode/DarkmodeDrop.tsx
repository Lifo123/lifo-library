'use client'
import { useStore } from "@nanostores/react";
import { $theme, Darkmode } from "./Darkmode.Store.js";
import type { DarkmodeProps } from "./Darkmode.types.js";

export default function DarkmodeDrop(props: DarkmodeProps) {
    const theme = useStore($theme);

    const handleSelect = (e: any) => {
        const value = e.target.value;
        Darkmode.change(props.storage, value);
    }

    return (
        <select className={`lb-dm-drop ${props.className || ''}`} value={theme} onChange={handleSelect} style={props.style}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system" >System</option>
        </select>
    );
}
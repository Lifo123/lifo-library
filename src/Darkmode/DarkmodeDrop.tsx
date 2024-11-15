import { useStore } from "@nanostores/react";
import { $darkmode, Darkmode } from "./Darkmode.Store.js";
import { type DarkmodeDropProps } from "./Darkmode.types.js";

export default function DarkmodeDrop({ storage = 'F-Theme', className, style = {} }: DarkmodeDropProps) {
    const theme = useStore($darkmode);

    const handleSelect = (e: any) => {
        const value = e.target.value;
        Darkmode.change(storage, value);
    }

    return (
        <select className={`lb-dm-drop ${className || ''}`} value={theme} onChange={handleSelect} style={style}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system" >System</option>
        </select>
    );
}
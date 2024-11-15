import { useStore } from "@nanostores/react";
import { type DarkmodeDropProps } from "./Darkmode.types.js";
import { $isDark, Darkmode, } from "./Darkmode.Store.js";

export default function DarkmodeToggle({ storage = 'F-Theme', className, style }: DarkmodeDropProps) {
    const isDark = useStore($isDark)

    return (
        <span className={`lb-dm-togle ${isDark ? 'active' : ''} ${className || ''}`} onClick={() => Darkmode.toggle(storage)} style={style}>
            <span className='no-select'></span>
        </span>
    );
}
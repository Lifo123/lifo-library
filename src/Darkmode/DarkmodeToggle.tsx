import { useStore } from "@nanostores/react";
import { DarkmodeDropProps } from "./Darkmode.types.js";
import { $darkmode, Darkmode, } from "@Stores/Darkmode.Store.js";

export default function DarkmodeToggle({ storage = 'F-Theme', className, style }: DarkmodeDropProps) {
    const isDark = useStore($darkmode) === 'dark';

    return (
        <span className={`lb-dm-togle ${isDark ? 'active' : ''} ${className || ''}`} onClick={() => Darkmode.toggle(storage)} style={style}>
            <span className='no-select'></span>
        </span>
    );
}
'use client'
import { useStore } from "@nanostores/react";
import type { DarkmodeProps } from "./Darkmode.types.js";
import { $theme, Darkmode, } from "./Darkmode.Store.js";

export default function DarkmodeToggle({ storage = 'F-Theme', className, style }: DarkmodeProps) {
    const theme = useStore($theme);
    const isDark = theme === 'system' ? Darkmode.preferTheme() : theme === 'dark';

    return (
        <span className={`lb-dm-togle ${isDark ? 'active' : ''} ${className || ''}`} onClick={() => Darkmode.toggle(storage)} style={style}>
            <span className='no-select'></span>
        </span>
    );
}
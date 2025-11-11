'use client'
import { useStore } from "@nanostores/react";
import { Darkmode } from "./Darkmode.Store.js";
import { $preferences } from "../../Stores/Preferences.Store.js";
import { BaseComponentProps } from "../../Types/GeneralTypes.js";

export default function DarkmodeToggle({ className, style }: BaseComponentProps) {
    const PREFERENCES = useStore($preferences);

    return (
        <span className={`lb-dm-togle ${PREFERENCES.isDark ? 'active' : ''} ${className || ''}`} onClick={() => Darkmode.toggle()} style={style}>
            <span></span>
        </span>
    );
}
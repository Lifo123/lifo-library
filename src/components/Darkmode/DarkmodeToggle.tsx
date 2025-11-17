'use client'
import { useStore } from "@nanostores/react";
import { Darkmode } from "./Darkmode.Store.js";
import { $preferences } from "../../Stores/Preferences.Store.js";
import { Button } from "react-aria-components";

type Props = {
    className?: string;
    style?: React.CSSProperties;
}

export default function DarkmodeToggle({ className, style }: Props) {
    const PREFERENCES = useStore($preferences, { keys: ['isDark'] });

    return (
        <Button
            className={`lb-dm-togle ${PREFERENCES.isDark ? 'active' : ''} ${className || ''}`}
            onPress={() => Darkmode.toggle()}
            style={style}
        >
            <span></span>
        </Button>
    );
}
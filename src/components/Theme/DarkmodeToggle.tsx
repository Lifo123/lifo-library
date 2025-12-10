'use client'
import { useStore } from "@nanostores/react";
import { $darkmode, darkmode } from "./theme.store";
import { Button } from "react-aria-components";
import React from "react";

type Props = {
    className?: string;
    style?: React.CSSProperties;
}

export default function DarkmodeToggle({ className, style }: Props) {
    const THEME = useStore($darkmode);

    const [isDark, setIsDark] = React.useState(false);

    React.useEffect(() => {
        if (THEME === 'system') {
            const isDark = darkmode.preferTheme();
            setIsDark(isDark);
        } else {
            setIsDark(THEME === 'dark');
        }
    }, [THEME])

    return (
        <Button
            className={`lb-dm-togle ${isDark ? 'active' : ''} ${className || ''}`}
            onPress={() => darkmode.toggle()}
            style={style}
        >
            <span></span>
        </Button>
    );
}

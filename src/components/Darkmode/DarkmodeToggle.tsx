import React, { useState } from 'react';


interface DarkmodeDropProps {
    storage: string;
    className?: string;
    style?: React.CSSProperties;
}

export default function DarkModeToggle({ storage = 'dm-theme', className, style }: DarkmodeDropProps) {
    if (typeof window === 'undefined') return null;

    // States
    const [initialDark, setInitialDark] = useState(() => {
        const savedTheme = localStorage.getItem(storage) || 'system';
        if (savedTheme === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return savedTheme === 'dark';
    });

    // Functions
    const Toggle = () => {

        const theme = localStorage.getItem(storage) || 'system';
        console.log(theme);
        const DROPS = document.querySelectorAll('.lb-dm-drop');
        const TOGGLES = document.querySelectorAll('.lb-dm-togle');

        if (theme === 'system') {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            DROPS.forEach((d: any) => {
                d.value = isDark ? 'light' : 'dark';
            });
            TOGGLES.forEach((t) => {
                t.classList[isDark ? 'remove' : 'add']('active');
            });
            document.documentElement.style.colorScheme = isDark ? 'light' : 'dark';
            document.documentElement.classList[isDark ? 'remove' : 'add']('dark');

            localStorage.setItem(storage, isDark ? 'light' : 'dark');
            return
        }

        DROPS.forEach((d: any) => {
            d.value = theme === 'dark' ? 'light' : 'dark';
        });
        TOGGLES.forEach((t) => {
            t.classList[theme === 'dark' ? 'remove' : 'add']('active');
        });
        document.documentElement.style.colorScheme = theme === 'dark' ? 'light' : 'dark';
        document.documentElement.classList[theme === 'dark' ? 'remove' : 'add']('dark');


        localStorage.setItem(storage, theme === 'dark' ? 'light' : 'dark');

    };

    return (
        <span className={`lb-dm-togle ${initialDark ? 'active' : ''} ${className || ''}`} onClick={Toggle} style={style}>
            <span className='no-select'></span>
        </span>
    );
}

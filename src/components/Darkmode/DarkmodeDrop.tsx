import './Darkmode.css';
import { useEffect, useState } from "react";

interface DarkmodeDropProps {
    storage: string;
    className?: string;
    style?: React.CSSProperties;
}

export default function DarkmodeDrop({ storage, className = '', style = {} }: DarkmodeDropProps) {
    const [theme, setThemeState] = useState(localStorage.getItem(storage) || 'system');

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTheme = e.target.value;
        const TOGGLES = document.querySelectorAll('.lb-dm-togle');
        const DROPS = document.querySelectorAll('.lb-dm-drop');

        setThemeState(newTheme);
        localStorage.setItem(storage, newTheme);

        DROPS.forEach((d: any) => {
            d.value = newTheme;
        });

        if (newTheme === 'system') {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
            document.documentElement.classList[isDark ? 'add' : 'remove']('dark');

            TOGGLES.forEach((t) => {
                t.classList[isDark ? 'add' : 'remove']('active');
            });

            return
        }

        document.documentElement.classList[newTheme === 'dark' ? 'add' : 'remove']('dark');
        document.documentElement.style.colorScheme = newTheme === 'dark' ? 'dark' : 'light';

        TOGGLES.forEach((t) => {
            t.classList[newTheme === 'dark' ? 'add' : 'remove']('active');
        });


    }



    return (
        <select className={`lb-dm-drop ${className}`} value={theme} onChange={handleChange} style={style} data-theme={theme}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system" >System</option>
        </select>
    );
}

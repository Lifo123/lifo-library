import React, { useEffect, useState } from 'react';


interface DarkmodeDropProps {
    storage: string;
    className?: string;
    style?: React.CSSProperties;
}

export default function DarkModeToggle({ storage = 'dm-theme', className, style }: DarkmodeDropProps) {
    if (typeof window === 'undefined') return null;

    const [initialDark, setInitialDark] = useState(() => {
        const savedTheme = localStorage.getItem(storage) || 'system';
        if (savedTheme === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return savedTheme === 'dark';
    });

    const Toggle = () => {
        const theme = localStorage.getItem(storage) || 'system';
        const isDarkMode = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        const newTheme = isDarkMode ? 'light' : 'dark';

        document.documentElement.style.colorScheme = newTheme;
        document.documentElement.classList.toggle('dark', newTheme === 'dark');

        localStorage.setItem(storage, newTheme);
        setInitialDark(newTheme === 'dark');
    };

    useEffect(() => {
        const syncTheme = () => {
            const storedTheme = localStorage.getItem(storage) || 'system';
            const isDark = storedTheme === 'dark' || (storedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
            setInitialDark(isDark);
        };

        window.addEventListener('storage', syncTheme);

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', syncTheme);

        return () => {
            window.removeEventListener('storage', syncTheme);
            mediaQuery.removeEventListener('change', syncTheme);
        };
    }, [storage]);

    return (
        <span className={`lb-dm-togle ${initialDark ? 'active' : ''} ${className || ''}`} onClick={Toggle} style={style}>
            <span className='no-select'></span>
        </span>
    );
}
